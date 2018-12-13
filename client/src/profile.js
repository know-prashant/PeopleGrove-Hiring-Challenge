import React, {Component} from 'react';
import './css/profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {groupBy} from './helper/helper.js';

class Profile extends Component{
  constructor(props){
    super(props);
    //console.log(props);
    this.state = {
      userData: [],
      bookings: []
    }

    this.deleteBooking = this.deleteBooking.bind(this);
  }

  deleteBooking(parent, child, id){
    let b = this.state.bookings;
    let a = this.state.bookings[parent].times.filter((e, i) => {return i !== child});
    b[parent].times = a;
    this.setState({
      bookings: b
    });

    //Delete a record
    axios.delete(`http://localhost:1337/api/appointments/remove/${id}`)
      .then((response) => {
          //No need do any thing
      })
      .catch(function (error) {
        if(error.response){
          console.log(error.response);
        }
      });
  }

  componentWillMount(){
    if(this.props.match.params.username !== localStorage.getItem('login')){
      this.props.history.push('/login');
      return false;
    }
   // console.log(this.props.match.params.username);
    //Fetch user details
    axios.get(`http://localhost:1337/api/user/${this.props.match.params.username}`)
      .then((response) => {
        this.setState({
          userData: response.data[0]
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      //fetch appointment details
      axios.get(`http://localhost:1337/api/appointments/${this.props.match.params.username}`)
        .then((response) => {
          //group similar date
          let data = groupBy(response.data, function(item){
            return [item.date];
          });

          //filter time as per schema
          let data2 = [];
          data.forEach((e) => {
            e.sort((a,b) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            });

            let temp =  {
              date: e[0].date,
              times: e
            };
            data2.push(temp);
          });

          this.setState({
            bookings: data2,
          });

        })
        .catch(function (error) {
          console.log(error);
        });
   }

  render() {
    return(
      <div className="wrapper">
        <div className="user-info profile">
          <span className="user-name">{this.state.userData.userName}</span>
          <span className="user-time-zone">{this.state.userData.timezone}</span>
          <Link to={{pathname: `/updateprofile/${this.state.userData.id}`,state:{name: this.state.userData.userName, timezone: this.state.userData.timezone}}} className="update">update</Link>
        </div>
        <div className="reservation-view">
         <h3>Reservations</h3>
         {this.state.bookings.length > 0 ?
           this.state.bookings.map((e, i) => {
              return(
                <ul key={i}>
                  <span className="date">{e.date.toString()}</span>
                  {e.times.length ? e.times.map((el, ind) => {
                    return (
                      <li key={el.id}><span className="time">{el.time + " HR"}</span><span className="bookedBy">Booked By {el.name}</span> <span className="delete" onClick={() => this.deleteBooking(i, ind, el.id)}>delete</span></li>
                    )
                  }) : "No Reservations"}
                </ul>
              )
           })
           : <span>No Reservations</span>
         }
        </div>
      </div>
    )
  }

}

export default Profile;
