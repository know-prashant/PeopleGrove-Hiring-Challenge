import React, {Component} from 'react';
import './css/bookreservation.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {toShortFormat} from './helper/helper.js';

class BookReservation extends Component{
  constructor(props){
    super(props);
    //console.log(this.props);
    this.state = {
      startDate: new Date(),
      bookedTime: ['1:00 HR', '2:00 HR', '3:00 HR'],
      selectedTime: '',
      active: null,
      data: []
    }

     this.handleChange = this.handleChange.bind(this);
     this.timeChange = this.timeChange.bind(this);
     this.handleBooking = this.handleBooking.bind(this);
  }

  timeChange(time, index){
    this.setState({
      selectedTime: time,
      active: index
    });
  }

  handleBooking(){
    if(!this.state.selectedTime){
      alert("Please Select a time to Book");
      return  false;
    }

    let time = this.state.selectedTime;
    let date = this.state.startDate;
    let bookedBy = localStorage.getItem('login') ? localStorage.getItem('login') : 'Anonymous User';
    let bookedTo = this.props.match.params.username;

    axios.post('http://localhost:1337/api/appointment/create', {
      time: time,
      date: toShortFormat(date),
      bookedBy: bookedBy,
      bookedTo: bookedTo
    })
    .then((response) => {
      if(response.data){
        //Filter booked time
        let a = this.state.data;
        a.push(response.data);
        let data = a.filter((e) => e.date === toShortFormat(this.state.startDate));
        let times = [];
        data.forEach((e) => {
          times.push(e.time);
        });

        this.setState({
          data: [...this.state.data, response.data],
          bookedTime: times
        })
      }
    })
    .catch((error) => {
      if(error.response){
        alert(error.response.data.error);
      }
      return false;
    });

  }

  handleChange(date) {
    let data = this.state.data.filter((e) => e.date === toShortFormat(date));
    let times = [];
    data.forEach((e) => {
      times.push(e.time);
    });

    this.setState({
      startDate: date,
      bookedTime: times
    });
  }

  componentWillMount(){
    axios.get(`http://localhost:1337/api/appointments/${this.props.match.params.username}`)
      .then((response) => {
        //filter booked time for particular date
        let data = response.data.filter((e) => e.date === toShortFormat(this.state.startDate));
        let times = [];
        data.forEach((e) => {
          times.push(e.time);
        });

        this.setState({
          data: response.data,
          bookedTime: times
        });

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render(){
    
    let times = [];
    for(let i = 0; i < 24; i++){
     times.push(`${i < 10 ? "0" + i : i}:00`);
    }

    return(
      <div>
        <div className="user-info">
          <span className="intro">Making reservations with</span>
          <span className="user-name">{this.props.location.state ? this.props.location.state.name : 'Anonymous'}</span>
          <span className="user-time-zone">{this.props.location.state ? this.props.location.state.timezone: 'Asia/Kolkata'}</span>
        </div>
        <div className="date-view">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange} //only when value has changed
          dateFormat="MMMM d, yyyy"
          />
        </div>
        <div className="time-view">
          {times.map((e, i) => {
            let cls = this.state.bookedTime.includes(e) ? 'time-slot disabled': 'time-slot';
            cls += this.state.active === i ? ' active': '';
            return(
              <a className={cls} key={i} onClick={() => !this.state.bookedTime.includes(e) ? this.timeChange(e, i): ''} >{e + ' HR'}</a>
            )
          })}
        </div>
        <a className="handle-booking" onClick={this.handleBooking}>Reserve Selected Slot</a>
      </div>
    )
  }
}

export default BookReservation;
