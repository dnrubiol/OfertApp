import { Component } from "react";
import "./button.css";

class CustomButton extends Component {
    render() {
        const { type, onClick, caption, disabled, width, ...rest } = this.props;
        return (
            <button
                {...rest}
                className= {"btn ofertapp-button-" + type}
                disabled={disabled || false}
                onClick={
                    ( e ) => {
                        e.preventDefault();
                        onClick && onClick();
                    }
                }
                style={{
                    "--width": (width || 50) + "%",
                }}
            >
                {caption}
            </button>
        );
    }
}

export default CustomButton