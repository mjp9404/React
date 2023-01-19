import React, { Component } from 'react';
import axios from 'axios';


export default class EditCategory extends Component {
    constructor(props) {
        super(props)
      
        this.onUpdateCategory = this.onUpdateCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            category_name: ""
        }
      }
    
      componentDidMount() {
        axios.get("http://localhost:5000/api/categorys/"+this.props.match.params._id)
        .then(res => {
            this.setState({
                category_name: res.data.category_name
            })
        }).catch(err => {
            console.log(err)
          })
      }

      onUpdateCategory(e) {
        this.setState({
            category_name: e.target.value
        });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const category = {
          category_name: this.state.category_name
        }
        console.log(category);
    
        axios.post("http://localhost:5000/api/categorys/update/"+this.props.match.params._id, category)
        .then(res => console.log(res.data))
        .catch(err => {
          console.log(err)
        })
        window.location = '/';
      }
    
      render() {
        return (
          <div>
            <h3>Update Category Name:</h3>
            <form onSubmit = {this.onSubmit}>
              <div className='form-group'>
                <input type="text"
                      required
                      value={this.state.category_name}
                      onChange={this.onUpdateCategory}
                      />
              </div>
              <div className='form-group'>
                  <input type="submit" value="Create Category" className='btn btn-primary'/>
              </div>
            </form>
          </div>
        )
      }
    }