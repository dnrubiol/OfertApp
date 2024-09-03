import { Component } from 'react';
import "./displayErrors.css";

class DisplayErrors extends Component {

    render() {
        const errors = this.props.errors;

        return (
            // First check there is any error to display
            errors &&
            <div className='ofertapp-errors mt-3'>
                {
                    // Check if this error is a single String
                    typeof errors === 'string' ?
                    // This error is just a String
                    <div className='ofertapp-error'>
                        {errors}
                    </div>
                    : // Then errors is an object
                    Object.keys(errors).map( (key, _) => {
                        return (
                            <div key={key} className='ofertapp-error'>
                                {"-" + errors[key]}
                            </div>
                        )
                    })
                }
            </div>

        );
    }
}

export default DisplayErrors;