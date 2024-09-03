import { Component } from 'react';
import './publicationView.css';

class PublicationViewDescription extends Component {
    render() {
        const { publication } = this.props;
        return (
            <div className = "row ofertapp-bottomline text-center general-text">
                <h3 className = "ofertapp-label text-center">Descripción</h3>
                <p 
                  className = "ofertapp-publication-description"
                >
                    {publication.description}
                </p>
            </div>
        )
    }
}

export default PublicationViewDescription;