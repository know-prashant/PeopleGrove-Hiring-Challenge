import React, {Component} from 'react';
import './css/form.css';
import axios from 'axios';
import moment from 'moment-timezone';

class UpdateProfile extends Component{
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
    let username = this.usernameText.value;
    let timezone = this.timezone.value;

    if(username === '' || timezone === ''){
      alert("Missing Required Fields");
      return false;
    }

    let id = this.props.match.params.id;
    if(!id){
      alert("Missing Id");
      return false;
    }

    axios.put(`http://localhost:1337/api/update/${id}`, {
      username: username,
      timezone: timezone
    })
    .then((response) => {
      if(response.data){
        localStorage.setItem('login', response.data[0].userName);
        this.props.history.push(`/`);
      }
    })
    .catch((error) => {
      if(error.response){
        console.log(error.response);
        alert(error.response.data.error);
      }
      return false;
    });

  }

  componentWillMount(){
    if(!localStorage.getItem('login')){
      this.props.history.push('/');
    }
  }

  render() {
    const timeZonesList = moment.tz.names();
    const current = this.props.location.state ? this.props.location.state.timezone ? this.props.location.state.timezone : moment.tz.guess()  : moment.tz.guess();
    return (
      <div className="form-wrapper signup">
        <h1>Update your account details</h1>
        <form className="form-area">
          <div className="form-group">
            <span className="required">*</span>
            <input type="text" className="form-control" name="full-name" placeholder="User Name" autoComplete="off" ref={input => this.usernameText = input} defaultValue={this.props.location.state.name ? this.props.location.state.name : '' }></input>
          </div>
          <div className="form-group">
            <span className="required">*</span>
            <select className="form-control" name="time-zone" ref={input => this.timezone = input} defaultValue={current}>
              {timeZonesList.map((e, i) => <option value={e} key={i} >{e}</option> )}
            </select>
          </div>
          <div className="buttons">
            <button className="submit" onClick={this.handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    )
  }
}


export default UpdateProfile;
