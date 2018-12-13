import React, {Component} from 'react';
import './css/form.css';
import { Link } from 'react-router-dom';
import validateEmail from './helper/helper.js';
import axios from 'axios';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      invalidEmail: false,
      invalidEmailMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    if(localStorage.getItem('login')){
      this.props.history.push('/');
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let email = this.emailText.value;
    let pass = this.passwordText.value;

    if(email === '' || pass === ''){
      alert("Missing Required Fields");
      return false;
    }

    //Validate email address
    if(!validateEmail(email)){
      this.setState({
        invalidEmail: true,
        invalidEmailMessage: 'Invalid Email Address'
      });
      return false;
    }else{
      this.setState({
        invalidEmail: false,
        invalidEmailMessage: ''
      });
    }

    axios.post('http://localhost:1337/api/login', {
      email: email,
      password: pass,
    })
    .then((response) => {
      if(response.data){
        localStorage.removeItem('login');
        localStorage.setItem('login', response.data.userName);
        this.props.history.push('/profile');
      }
    })
    .catch((error) => {
      if(error.response){
        alert(error.response.data.error);
      }
      return false;
    });

  }


  render() {
    return (
      <div className="form-wrapper">
        <h1>Hello!</h1>
        <h3>Login to your account</h3>
        <form className="form-area">
          <div className="form-group">
            <input type="text" className="form-control" name="email" placeholder="Email address" autoComplete="off" ref={input => this.emailText = input}></input>
            {this.state.invalidEmail ? <span className="required-message">{this.state.invalidEmailMessage}</span> : ''}
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" autoComplete="off" ref={input => this.passwordText = input}></input>
          </div>
          <div className="buttons">
            <button className="submit" onClick={this.handleSubmit}>Login</button>
            <Link to="/reset">forgot password?</Link>
          </div>
        </form>
        <p className="account-create">still without account? <Link to="/signup">create one</Link></p>
      </div>
    )
  }
}


export default Login;
