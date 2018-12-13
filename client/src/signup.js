import React, {Component} from 'react';
import './css/form.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validateEmail from './helper/helper.js';
import moment from 'moment-timezone';

class SignUp extends Component{
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
    let username = this.usernameText.value;
    let timezone = moment.tz.guess();

    if(email === '' || pass === '' || username === ''){
      alert("Missing Required Fields");
      return false;
    }

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

    axios.post('http://localhost:1337/api/signup', {
      email: email,
      password: pass,
      name: username,
      timezone: timezone
    })
    .then((response) => {
      if(response.data){
        localStorage.setItem('login', username);
        this.props.history.push(`/updateprofile/${response.data.id}`,{name: username} );
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
      <div className="form-wrapper signup">
        <h1>Sign up</h1>
        <h3>Create an account to use Planguru without limits. For free.</h3>
        <form className="form-area">
          <div className="form-group">
            <span className="required">*</span>
            <input type="text" className="form-control" name="full-name" placeholder="Full Name" autoComplete="off" ref={input => this.usernameText = input}></input>
          </div>
          <div className="form-group">
            <span className="required">*</span>
            <input type="text" className="form-control " name="email" placeholder="Email address" autoComplete="off" ref={input => this.emailText = input}></input>
            {this.state.invalidEmail ? <span className="required-message">{this.state.invalidEmailMessage}</span> : ''}
          </div>
          <div className="form-group">
            <span className="required">*</span>
            <input type="password" className="form-control" name="password" placeholder="Password" autoComplete="off" ref={input => this.passwordText = input}></input>
          </div>
          <div className="buttons">
            <button className="submit" onClick={this.handleSubmit}>Sign Up</button>
          </div>
        </form>
        <p className="account-create">I already have an account. <Link to="/login">Login</Link></p>
      </div>
    )
  }
}


export default SignUp;
