import { Component } from 'react';
import UserLink from './../common/UserLink/userLink';
import { getAnyTimePassed } from './../../utils/getTime';
import './publicationView.css';

class PublicationViewHeader extends Component {

  render() {
    const { publication } = this.props;
    return (
        <div className = "row ofertapp-bottomline align-middle text-center">
            <div className = "col-12 col-md-6 align-middle">
                <div className = "row text-center">
                    <h3 className="col-12 col-md-6 ofertapp-label">Ofrecido por:  </h3>
                    <div className = "col-12 col-md-6">
                        <UserLink className="col-12 col-md-6" user = {publication.user} base = {true}/>
                    </div>
                </div>
            </div>
            <div className = "col-12 col-md-6">
                <div className = "row align-middle">
                    <div className = "col-12 col-md-6 ofertapp-label">
                        <span className = "badge ofertapp-status-badge" style = {
                            {"--color" : publication.available ? "#017C41" : "#dc3545"}
                        }>
                            {publication.available ? "Abierta" : "Cerrada"}
                        </span>
                    </div>
                    
                    <h3 className = "col-12 col-md-6 ofertapp-base-subtitle" 
                        style = {{
                            "fontSize": "1.5em",
                        }}>
                        {getAnyTimePassed( publication.endDate )}
                    </h3>
                </div>
            </div>
        </div>
    );
  }
}

export default PublicationViewHeader;