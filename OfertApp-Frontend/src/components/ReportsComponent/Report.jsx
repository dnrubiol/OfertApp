import { Component } from 'react';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { getDatetimeFormatted } from "../../utils/getTime";
import CustomButton from "./../common/Button/button";
import UserLink from "../common/UserLink/userLink";

class Report extends Component {
    
    getDateInfo = (report, props) => {
        return (
            <Tooltip
            id={"report-info-tooltip"} {...props}
            >
            <div>{
                getDatetimeFormatted(report.createdAt)
            }</div>
            </Tooltip>
        )
    }

    translateNotation( shorthand ) {
        const options = [
          ['DF', 'Fraude de entrega'],
          ['SF', 'Sospecha de fraude'],
          ['DL', 'No satisfecho'],
          ['MA', 'Publicidad engañosa'],
          ['QF', 'Fraude de calidad']
        ];
        
        const option = options.find((item) => item[0] === shorthand);
        
        if (option) {
          return option[1];
        } else {
          return null;
        }
      }

    render() {
        const { report } = this.props;
        return (
            <OverlayTrigger
                key={report.id} placement="auto" delay={{ show: 250, hide: 400 }}
                overlay={
                (props) =>
                    this.getDateInfo(report, props)
                }
            >
                <tr 
                key={report.id}
                className="ofertapp-table-row"
                >
                <td className="text-center">
                    {report.id}
                </td>
                <td className="text-center">
                    {
                    <UserLink
                        fontSize="16"
                        fontColor="#fff"
                        user={report.user}
                    />
                    }
                </td>
                <td className="text-center">{this.translateNotation(report.type)}</td>
                <td className="text-center">{report.body}</td>
                <td className="text-center">
                    <CustomButton
                    caption = "Ver Soportes"
                    onClick={() => this.props.navigate(`/report/${report.id}`)}
                    type="primary"
                    width={80}
                    />
                </td>
                <td className="text-center" style={{fontSize : "24px"}}>
                    {report.open ? "🚪": "🔒"}
                </td>  
                </tr>
            </OverlayTrigger>
        )
    }
}

export default Report;