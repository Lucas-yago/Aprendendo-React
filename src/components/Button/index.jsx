import { Component } from 'react';
import './style.css';

export class Button extends Component {

    render() {
        const {text ,onClick , disabled} = this.props;

        return (
            <div className='button-container' >
                <button 
                className='button' 
                onClick={onClick} 
                disabled={disabled}
                >{text}</button>
            </div>
        );
    }
};

