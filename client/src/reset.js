import React, {Component} from 'react';
import './css/form.css';
import validateEmail from './helper/helper.js';
import axios from 'axios';

class Reset extends Component{
  constructor(props){
    super(props);
    this.state = {
      invalidEmail: false,
      invalidEmailMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let email = this.emailText.value;
    let pass = this.passwordText.value;

    if(email === '' || pass === ''){
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

    axios.put('http://localhost:1337/api/reset', {
      email: email,
      password: pass,
    })
    .then((response) => {
      if(response.data){
        alert('Password Updated Successfully');
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
        <h1>Reset Your Password</h1>
        <form className="form-area">
          <div className="form-group">
            <input type="text" className="form-control" name="email" placeholder="Email address" autoComplete="off" ref={input => this.emailText = input}></input>
              {this.state.invalidEmail ? <span className="required-message">{this.state.invalidEmailMessage}</span> : ''}
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" autoComplete="off" ref={input => this.passwordText = input}></input>
          </div>
          <div className="buttons">
            <button className="submit" onClick={this.handleSubmit}>Reset</button>
          </div>
        </form>
      </div>
    )
  }
}


export default Reset;
