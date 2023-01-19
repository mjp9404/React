import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props)
  
    this.onNewCategory = this.onNewCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        category_name: ""
    }
  }

  onNewCategory(e) {
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

    axios.post("http://localhost:5000/api/categorys/add", category)
    .then(res => console.log(res.data))
    .catch(err => {
      console.log(err)
    })
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Category</h3>
        <form onSubmit = {this.onSubmit}>
          <div className='form-group'>
            <label>Category Name: </label>
            <input type="text"
                  required
                  className='form-control'
                  value={this.state.category_name}
                  onChange={this.onNewCategory}
                  />
          </div>
          <br/>
          <div className='form-group'>
              <Button type="submit" variant='primary'>Create Category</Button>
          </div>
        </form>
      </div>
    )
  }
}