import React, {Component} from 'react';
import './header.css';
import { Link, Redirect } from 'react-router-dom';

class Header extends Component{
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.state = {
      name: '',
      time: 0,
      redirect: false
    }
  }

  handleLogout = () => {
    localStorage.removeItem("login");
    this.setState({
      name: '',
      redirect: true
    });
  }

  //Redirect to homepage after logout
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  componentWillMount(){
    this.setState({
      name: localStorage.getItem("login"),
    })
  }

  componentWillUpdate(prevProps, prevState, snapshot){
      if(prevState.redirect){
        this.setState({
          redirect: false
        });
      }
  }

  componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date.now(), name: localStorage.getItem("login") }), 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return(
      <header className="header">
        {this.renderRedirect()}
        <input type="hidden" value={this.state.time} />
        <span><Link to="/">Planguru</Link></span>
        {this.state.name ?
        <div className="signup-login">
            <span>
              Welcome <Link to={`/${this.state.name}`}>{this.state.name}</Link>
            </span>
            &nbsp;&nbsp;
            /
            &nbsp;
            <span>
              <a onClick={this.handleLogout}>Logout</a>
            </span>
        </div>
        :
          <div className="signup-login">
              <span>
                <Link to="/login">Login</Link>
              </span>
              /
              <span>
                <Link to="/signup">SignUp</Link>
              </span>
          </div>
        }
      </header>
    )
  }
}

export default Header;
