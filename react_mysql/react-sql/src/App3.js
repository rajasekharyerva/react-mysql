import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import CourseList from './components/CoursesList';
import axios from 'axios';

class App extends Component {

  getStudents() {
    axios.get('http://localhost:4000/products')
    .then((response) => {console.log(response.data)});
  }
  render() {
    return (
      <div>
        {/*<NavBar/>
        <CourseList />*/}
        {this.getStudents()}
      </div>
    )
  }
}


export default App;
