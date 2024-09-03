import { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import "./ofertapp-team.css"

class MemberDescription extends Component {
    state = {};

    renderUserInfo( props ){
        const { memberName, MemberDescription, memberImage, memberGithub } = this.props;
        return (
            <Tooltip
                id = "button-tooltip"
                className='ofertapp-member-tooltip text-center'
                {...props}
            >
                <div className='row ofertapp-member-card text-center'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-12 col-sm-9 text-center'>
                                        <img src = {memberImage} alt = "OfertApp" className = "ofertapp-member-img" />
                                    </div>
                                    <div className='col-12 col-sm-3 text-center'>
                                        <a href = {memberGithub} target="_blank" rel="noreferrer" >
                                            <img
                                                className = "ofertapp-img align-middle"
                                                src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                                alt = "OfertApp"
                                                style = {{
                                                    width: "30px", height: "30px", borderRadius: "50%",
                                                    margin: "auto"
                                                }}
                                            />
                                        </a>
                                    </div>  
                                </div>
                            </div>
                            <div className = "col-12">
                                <div className = "row ofertapp-member-background">
                                    <div className='col-12 mb-2'
                                        style={{
                                            "fontSize": "12px",
                                            "fontWeight": "bold",
                                        }}
                                    >
                                        { memberName }
                                    </div>
                                    <div className = "col-12">
                                        { MemberDescription }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tooltip>
            );
    }

    render () {
        const { memberName } = this.props;
        return (
            <OverlayTrigger
                key = {memberName}
                placement='auto'
                delay={{ show: 200, hide: 4000 }}
                overlay={(props) => this.renderUserInfo(
                    props
                )}
            >
                <p className='ofertapp-item'>
                    { memberName }
                </p>
                
            </OverlayTrigger>
        );
    }
}

export default MemberDescription;