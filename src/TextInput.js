import React, { Component } from 'react'

 class TextInput extends Component {
    render() {
        const { type, style, id, onChange, placeHolder, className, name,value } = this.props;
       
        return (
            <div>
                <input  
                              type={type}
                              name={name}
                              id={id}
                              placeholder={placeHolder}
                              className={className}
                              value = {value}
                              onChange = {onChange}
                              style = {style}
                              >
                      </input>
            </div>
        )
    }
}
export default TextInput;