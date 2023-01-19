import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateCategory from "./create-catagory.component";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Category = props => (
    <tr>
      <td>{props.category._id}</td>
      <td>{props.category.category_name}</td>
      <td>
        <Button size="sm">Edit<Link to={"/edit/"+props.category._id}></Link></Button>
      </td>
    </tr>
  )

export default class CategoryList extends Component {
constructor(props) {
  super(props)

  this.state = {
    categories: []
  };
}

componentDidMount() {
    axios.get('http://localhost:5000/api/categorys/')
    .then(res => {
        this.setState({categories: res.data})
    })
    .catch((err) => {
        console.log(err);
    })
}

categoryList() {
    return this.state.categories.map(currentCategory => {
        return <Category category={currentCategory} key={currentCategory._id}/>
    })
}

render() {
    return (
      <div>
        <h3>Logged Catagories</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Edit Category Name</th>
            </tr>
          </thead>
          <tbody>
            {this.categoryList()}
          </tbody>
        </table>
        <br/>
        <br/>
        <CreateCategory/>
      </div>
    )
  }
}