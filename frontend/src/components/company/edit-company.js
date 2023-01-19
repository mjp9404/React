import React, { Component } from 'react';
import axios from 'axios';

export default class EditCompany extends Component {
    constructor(props) {
        super(props)
      
        this.onUpdateCompany = this.onUpdateCompany.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            companyName: ""
        }
      }
    
      componentDidMount() {
        axios.get("http://localhost:5000/api/companies"+ this.props.id)
        .then(res => {
            this.setState({
                companyName: res.data.companyName
            })
        }).catch(err => {
            console.log(err)
          })
      }

      onUpdateCompany(e) {
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
  
        axios.post("http://localhost:5000/api/companies/update"+this.props.id, category,config)
        .then(res => {console.log(res.data); window.location = '/'; })
        .catch(err => {
          console.log(err)
        })
        
      }
    
      render() {
        return (
          <div>
            <h3>Update Company</h3>
            <form onSubmit = {this.onSubmit}>
              <div className='form-group'>
                <input type="text"
                      required
                      value={this.state.companyName}
                      onChange={this.onUpdateCompany}
                      />
              </div>
              <div className='form-group'>
                  <input type="submit" value="Update Company" className='btn btn-primary'/>
              </div>
            </form>
          </div>
        )
      }
    }