import React, { Component } from 'react'
import PropTypes from 'prop-types';



class CheckBox extends Component {



    render() {
        const { type, name, onChange, checked,label,onClick,style} = this.props
        return (
            <div>
                <div class="ui checkbox">
                    <input type={type} name={name} onChange={onChange} checked={checked} onClick = {onClick} style = {style}  />
                    <label> {label} </label>
                </div>
            </div>

        )
    }
}
CheckBox.propTypes = {
    type: PropTypes.string,
    checked:PropTypes.bool

};
CheckBox.defaultProps = {
    type: "text"
};
export default CheckBox;