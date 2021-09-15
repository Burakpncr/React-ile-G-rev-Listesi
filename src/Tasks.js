import React from 'react';
import TaskConsumer from './context';
import OperationButton from './OperationButton';
import CheckBox from './CheckBox'
import axios from 'axios';
import { Checkbox } from '@material-ui/core';
class Tasks extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      gorev: "",
      /// isoChecked: "",
      yazi: "",
      newChecked: this.props.selection

    }

  //  console.log("ol artık", this.state);
  }


  onDeleteTask = async (dispatch, e) => {
    console.log("tıkla")
    const { id } = this.props;
    console.log(id)

    // consumer dan kullanacağımız dispatch gelecek 

    await axios.delete(`http://localhost:3004/Gorevler/${id}`)

    dispatch({
      type: "DELETE_TASK", payload: id

    })
  }
  componentWillReceiveProps(nextProps) {
    this.state.newChecked = nextProps.selection;
  }

  ConfirmationMesage = (e) => {
    console.log("anlammadım", this.state.newChecked);
    this.setState({
      newChecked: !this.state.newChecked
    })

    if (this.state.newChecked === false) alert(this.state.gorev + " seçildi")
    else alert(this.state.gorev + " seçimden kaldırıldı")
  }
  render() {
    const { gorev, onClick, checked, selection } = this.props;

   // console.log("burakcımmmmmmmm", this.state.newChecked);
   // console.log("burağın yaptığı orjinallik", secim + this.state.newChecked)
    return (
      <TaskConsumer>
        {

          value => {
            const { dispatch} = value;
            this.state.gorev = gorev
            this.state.checked = checked
            return (
              <div>
                <div className="col-md-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">

                      <div>
                        <CheckBox
                          type="checkbox"
                          name="example"
                          label=""
                          onClick={this.ConfirmationMesage}
                          checked={this.state.newChecked }
                        //   onClick = {yap}
                        />
                      </div>
                      <h3 className="d-inline" style={{ textAlign: "center" }} onClick={onClick}  >{gorev} </h3>
                      <OperationButton
                        className="ui button"
                        type="submit"
                        name="SİL"
                        onClick={this.onDeleteTask.bind(this, dispatch)}
                      >
                      </OperationButton>

                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </TaskConsumer>
    )
  }
}
export default Tasks;