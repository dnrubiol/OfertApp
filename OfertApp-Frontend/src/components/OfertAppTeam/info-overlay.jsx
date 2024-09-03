import { Component } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class InfoOverlay extends Component {

    render() {
        return (
            <OverlayTrigger
                placement = "auto"
                delay={{ show: 250, hide: 400 }}
                overlay = {
                    <Tooltip
                        id = {"info-overlay-tooltip"}
                    >
                        {this.props.target}
                    </Tooltip>
                }
            >
                <p>{this.props.source}</p>
                
            </OverlayTrigger>
        )
    }       
}

export default InfoOverlay;