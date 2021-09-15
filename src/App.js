import React, { Component } from 'react'
import TaskList from "./TaskList";


class App extends Component {
  render() {
    return (
      <div className="Container" style = {{alignContent:"center"}}>
     
       <TaskList />
         <br />
      
      </div>
    )
  }
}
export default App;