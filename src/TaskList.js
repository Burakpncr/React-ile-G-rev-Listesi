import React, { Component } from 'react'
import TextInput from "./TextInput";
import OperationButton from "./OperationButton";
import TaskConsumer from "./context";
import Tasks from './Tasks';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import CheckBox from './CheckBox'
import { Checkbox } from '@material-ui/core';


class TaskList extends Component {
  constructor(props) {
    super(props);
     this.state = {
    search: "",
    gorev: "",
    gorevler: [],
    checked:false,
    allChecked:false
  }
  }
 

  TaskSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  TaskInput = (e) => {
    this.setState({
      gorev: e.target.value
    })

  }

  TaskRemove = (e) => {
    e.preventDefault();
    this.setState({
      gorev: ""
    })
  }

  AddTask = async (dispatch, e) => {
    e.preventDefault();
    const { gorev } = this.state;

    var found = this.state.gorevler.find(function (item) {
      return item.gorev.toLowerCase() === gorev.toLowerCase();
    });
   
    if (!gorev) alert("Lütfen Görev eklemek için Alanı doldurun")

    if (!found) {
      if (this.state.gorevler.length < 5) {
        const newTask = {
          gorev,
        }
        const response = await axios.post("http://localhost:3004/Gorevler", newTask)
        console.log("response burada : ",response)
        dispatch({ type: "ADD_TASK", payload: response.data })
        
      }
      else { alert("5 ten fazla görev ekleyemezsiniz") }
    }
    else {
      alert("Aynı Görevi Ekleyemezsin")
    }

    this.setState({
      gorev: ""
    })
  }

  UpdateTask = async (dispatch, e) => {
    e.preventDefault();
    const { gorev, id } = this.state;
    if (!gorev) alert("Güncelleme Yapmak İçin Bir Görev Seçiniz")
    else {
      const UpdateTask = {
        gorev,

      };
      const response = await axios.put(`http://localhost:3004/Gorevler/${id}`, UpdateTask)
      dispatch({ type: "UPDATE_TASK", payload: response.data })

    }
    this.setState({
      gorev: ""
    })
  }

  ConfirmationMesage = (e) => {
  

    this.setState({
      allChecked:!this.state.allChecked
    })
 
    }
   message = (e) => {
     this.setState({
       checked:!this.state.checked
     })
   }

  
  
   render() {
    const { search } = this.state
   return (
      <TaskConsumer>
        {
          value => {
            const { dispatch, Gorevler } = value;
            this.state.gorevler = Gorevler;
        
            return (
              <div>
                <div className="col-md-8 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h1 style={{ textAlign: "center" }}>YAPILACAKLAR LİSTESİ</h1>
                    </div>
                    <form >
                      <label> Yeni Görev :  </label>
                      <TextInput
                        type="text"
                        name="yenigörev"
                        placeHolder="Yeni Görev Belirleyiniz"
                        className="form-control"
                        value={this.state.gorev}
                        onChange={this.TaskInput}
                      >
                      </TextInput>
                      <div className="form-group">  </div>
                      <OperationButton
                        className="btn btn-danger btn-block"
                        type="submit"
                        name="Görev Ekle"
                        iconType={<AddCircleOutlineIcon />}
                        onClick={this.AddTask.bind(this, dispatch)}
                      >
                      </OperationButton>
                      <OperationButton
                        className="btn btn-danger btn-block"
                        type="submit"
                        name="Görev Güncelle"
                        iconType={<UpdateIcon />}
                        onClick={this.UpdateTask.bind(this, dispatch)}
                      >
                      </OperationButton>
                      <OperationButton
                        className="btn btn-danger btn-block"
                        type="submit"
                        name="Temizle"
                        iconType={<DeleteIcon />}
                        onClick={this.TaskRemove}
                      >
                      </OperationButton>
                    </form>
                  </div>
                </div>
               
                <CheckBox 
                   type="checkbox" 
                   name="example"
                   label="Tümünü Seç"
                   onClick ={this.ConfirmationMesage}
                  />
                <div>
              
                  
                  <TextField
                    id="standard-basic"
                    label="Görev Ara"
                    style={{ marginLeft: "350px", marginTop: "-0px", marginBottom: "20px" }}
                    value={this.state.search}
                    onChange={this.TaskSearch}
                  />
                </div>
                <div>
                  {
                    Gorevler.map(item => {
                      return (
                        <>
                          {
                            ((!search || ((item.gorev).toLowerCase().indexOf(search.toLowerCase()) > -1))) &&
                            <div>
                              <Tasks
                                gorev={item.gorev}
                                selection = {this.state.allChecked}
                                id={item.id}
                                //b={checked => { this.setState({ checked: !item.checked  }) }}
                                onClick={gorev => { this.setState({ gorev: item.gorev, id: item.id }) }}
                              > 
                              </Tasks>
                              
                            </div>
                          }
                      
                        </>
                      )
                    })
                  }
                
                </div>
              </div>)
          }}
      </TaskConsumer>

    )
  }
}
export default TaskList;