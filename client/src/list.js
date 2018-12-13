import React, {Component} from 'react';
import './css/list.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component{
  constructor(){
    super();
      this.state = {
        data: []
    }
  }

  componentWillMount(){
    axios.get('http://localhost:1337/api/users')
      .then((response) => {
        this.setState({
          data: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    let a = this.state.data.filter((e) => {
      return e.userName !== (localStorage.getItem('login') ? localStorage.getItem('login') : ''); 
    });
    
    return (
      <div className="card-wrapper">
        {a.length === 0 ?
          <div className="list text-center">
            <h2>No Users</h2>
          </div>
           :
           a.map((e) => {
          return(
            <div className="list" key={e.id}>
              <h2>{e.userName}</h2>
              <span>{e.timezone}</span>
              <Link to={{pathname: `/bookreservation/${e.userName}`,state:{name: e.userName, timezone: e.timezone}}} className="book-reservation">Book Reservation</Link>
            </div>
          )
        })}
      </div>
    )
  }
}


export default List;
