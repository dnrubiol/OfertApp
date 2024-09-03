import { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class Info extends Component {
    render() {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip id="tooltip">
                        { this.props.text }
                    </Tooltip>
                }
            >
                <span>
                    <i 
                        className="fas fa-info-circle general-text"
                    ></i>
                </span>
            </OverlayTrigger>
        );
    }
}

export default Info;