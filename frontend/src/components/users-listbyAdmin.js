import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const User = props => (
    <tr>
        {/* <td>{props.user._id}</td>  */}
        <td>{props.user.firstName}, {props.user.lastName}</td>    
        {/* <td>{props.User.lastName}</td> */}
        <td>{props.user.email}</td>
        <td>{props.user.phoneNumber}</td>
        <td>{props.user.role}</td>
        <td>
            <button><Link to = {"/edit/"+props.user._id}>Edit</Link></button>
        </td>
        <td>
            <button><a href="#" onClick={()=> {props.deleteUser(props.user._id)}}>Delete</a></button>
        </td>
    </tr>
)

export default class UserList extends Component{
    constructor(props) {
      super(props);
    
      this.deleteUser = this.deleteUser.bind(this)

      // this.userList = this.userList.bind(this)
      this.state = {
         users:[]
      };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/auth/getUser')
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteUser(id) {
        axios.delete('http://localhost:5000/api/admins/delete/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
            users: this.state.users.filter(ul => ul._id !== id)

        //   users: this.state.users.filter(ul => ul._id !== id)
        })
      }
    
      userList() {
        return this.state.users.map(currentUsers => {
          return <User user={currentUsers} deleteUser={this.deleteUser} key={currentUsers._id}/>;
        })
      }

      render() {
        return (
          <div>
            <h3>User List</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>PhoneNumber</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {this.userList()}
              </tbody>
            </table>
            <br/>
            <br/>
          </div>
        )
      }
}


