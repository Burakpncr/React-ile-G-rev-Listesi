import React, { Component } from 'react';

class OperationButton extends Component {
    render() {
       const {className,type,name,onClick,  onSubmit,style,iconType} = this.props
        return (
            <div>
                 <button 
                 className={className}
                 type={type}
                 onClick = {onClick}
                 onSubmit = {onSubmit}
                 style = {style}> 
             
              {iconType} 
              {name} 
                 </button>
            </div>
        )
    }
}
export default OperationButton;