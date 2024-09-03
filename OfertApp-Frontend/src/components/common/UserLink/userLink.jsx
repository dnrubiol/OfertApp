import { Component } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./userLink.css";

// user: object
// base: boolean

class UserLink extends Component {

  // Renders a tooltip with user's info
  renderUserInfo(user, props) {
    return (
      <Tooltip 
        id = {"user-info-tooltip"} {...props} 
        className="ofertapp-user-info-tooltip"
      >
        <div className = "row">
          <div className = "col-12">
            <div className = "row ofertapp-user-info-profile">
              <div className = "col-12 text-center">
                <img className = "ofertapp-user-info-profile-image"
                  src = {user.profilePicture } alt = "Avatar"
                />
              </div>
              <div className = "col-12">
                <p className = "ofertapp-user-info-profile-text">
                  {user.username + (user.vipState ? "👑" : "")}
                </p>
              </div>
            </div>
          </div>
          
          <div className = "col-12">
            <p className = "ofertapp-user-info-text">
              {user.commentsCount} comentarios
            </p>
          </div>
          <div className = "col-12">
            <p className = "ofertapp-user-info-text">
              {user.publicationsCount} subastas
            </p>
          </div>
        </div>
      </Tooltip>
    )
  };

  // Creates a link to user's profile
  render() {
    const user = this.props.user;
    const base = this.props.base;
    const fontSize = this.props.fontSize ? parseInt(this.props.fontSize) : null;
    const fontColor = this.props.fontColor ? 
      this.props.fontColor : "var(--ofertapp-general-text-color)";

    return (
      // Conditional class name
        user && 
        <OverlayTrigger
          placement="auto" delay={{ show: 250, hide: 400 }}
          overlay = {(props) => this.renderUserInfo(user, props)}
        >
          <p className ={"ofertapp-link-" + ( base ? "base" : "common")}
            style = {
              {"--fontSize": fontSize ? fontSize + "px" : "32px",
              "--fontColor": fontColor}
            }
          >
            {user.username} &nbsp;&nbsp;
            <span className = "badge ofertapp-reputation" style = {
              // RED = (255,0,0), YELLOW = (255,255,0), GREEN = (0,255,0)
              // From 0% to 50%, R component remains the same (255) and G increase
              // From 50% to 100%, G component remains the same (255) and R decreases
              {
                "--reputationR": 255 *(user.reputation <= 0.5 ? 1 : 1 - user.reputation ),
                "--reputationG": 255 *(user.reputation > 0.5 ? 1 : user.reputation ),
                "--fontSize": fontSize ? (fontSize * 0.75) + "px" : "24px"
              }
            }>
              { (user.reputation * 100).toFixed(2) + "%"}
            </span>
          </p>
        </OverlayTrigger>
    );
  }
}

export default UserLink;
