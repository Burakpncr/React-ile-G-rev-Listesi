import React, { Component } from 'react'
import axios from 'axios';



const TaskContext = React.createContext();
//Bu bize provider ve consumer vericek
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TASK":
      return {
        ...state,
        Gorevler: state.Gorevler.filter(item => action.payload !== item.id)
      }

    case "ADD_TASK":
      return {
        ...state,
        Gorevler: [...state.Gorevler, action.payload]
      }
    case "UPDATE_TASK":
      console.log("action.payload", action.payload.id)
      return {
        ...state,
        Gorevler: state.Gorevler.map(item => item.id === action.payload.id ? action.payload : item)

      }
    default:
      return state
  }
}

export class TaskProvider extends Component {
  state = {
    Gorevler: [
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  }
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3004/Gorevler")
    this.setState({
      Gorevler: response.data
    })

  }

  render() {

    return (
      <TaskContext.Provider value={this.state}>
        
      </TaskContext.Provider>
    )
  }
}
const TaskConsumer = TaskContext.Consumer;
export default TaskConsumer;