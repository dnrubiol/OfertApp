import { Component } from "react";
import { getDatetimeFormatted } from "../../utils/getTime";
import UserLink from "../common/UserLink/userLink";
import ShowFile from "../common/ShowFile/showFile";

import "./reportsComponent.css"

class ReportSupport extends Component {
    render() {
        const { support } = this.props;
        return (
            <div className = "col-12 col-sm-6">
                <div className="row ofertapp-reaction-support">
                    <div className="col-12 col-md-8">
                        <div className="row align-middle">
                            <div className="col-12 ofertapp-support-text">
                                <UserLink
                                    fontSize="24"
                                    user={ support.user }
                                />
                            </div>
                            <div className="col-12 ofertapp-support-text">
                                { support.body }
                            </div>
                            <div className="col-12 ofertapp-support-text">
                                { getDatetimeFormatted(support.createdAt) }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <ShowFile
                            caption={"Report Support"}
                            data={ support.data }
                            contentType={ support.type }
                            width="12vw"
                            height="12vw"
                        />
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ReportSupport;