import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCompany extends Component {
  constructor(props) {
    super(props)
  
    this.onNewCompany = this.onNewCompany.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        companyName: ""
    }
  }

  onNewCompany(e) {
    this.setState({
        companyName: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      companyName: this.state.companyName
    }
    console.log(company);

    const config = {
      headers:{
          'x-auth-token': this.props.user.token
      }
      }
     axios.post("http://localhost:5000/api/companies/add", company ,config)
    .then(res => {console.log(res.data);     window.location = '/';  })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
   
    return (
      <div>
        <h3>Create New Company Name</h3>
        <form onSubmit = {this.onSubmit}>
          <div className='form-group'>
            <label>Company Name: </label>
            <input type="text"
                  required
                  className='form-control'
                  value={this.state.companyName}
                  onChange={this.onNewCompany}
                  />
          </div>
          <div className='form-group'>
              <input type="submit" value="Create Company" className='btn btn-primary'/>
          </div>
        </form>
      </div>
    )
  }
}