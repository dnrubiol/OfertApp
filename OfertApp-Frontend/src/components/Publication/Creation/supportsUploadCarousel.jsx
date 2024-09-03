import { Component } from 'react';
import SupportData from './createPublicationSupport';
import CustomButton from "./../../common/Button/button";
import './../publicationView.css';
import "./../../../App.css";

// Up to 5 supports to back up the publication
const supportsLimit = 5;

class SupportsUploadCarousel extends Component {
    state = {
        supports : {},
        supportsCount : 0,
        currentSupportIndex: ""
    }

    async dropSupport( id ) {
        const { supports } = this.state;
        delete supports[id];
        const { onDescriptionChange, onEvidenceFileChange } = this.props;

        // Reset (Delete) description and evidence file in parent form
        onDescriptionChange( id, null );
        onEvidenceFileChange( id, null );

        // Check if there is any other support
        const keys = Object.keys( supports );

        this.setState({
            supports : supports,
            supportsCount : this.state.supportsCount - 1,
            currentSupportIndex : keys.length > 0 ? keys[0] : ""
        })
    }

    addSupport() {
        let id = "id" + Math.random().toString(16).slice(2);
        const { onDescriptionChange, onEvidenceFileChange } = this.props;
        this.setState({
            supports : {
                ...this.state.supports,
                [id] : <SupportData 
                    key = {id}
                    id = {id}
                    onDelete = { () => this.dropSupport(id) }
                    onDescriptionChange = {onDescriptionChange}
                    onEvidenceFileChange = {onEvidenceFileChange}
                />
            },
            supportsCount : this.state.supportsCount + 1,

            // Current support index is the last one added
            currentSupportIndex : id
        })
    }

    render() {

        // Parent form will pass evidencefiles and descriptions edited from this environment
        const { supports, supportsCount, currentSupportIndex } = this.state;

        let indicatorsCounter = 0;

        return (
            <div className = "row text-center ofertapp-support-creation-carousel">
                <div id="pubSupportCarousel" className = "col-12 carousel slide align-middle" data-ride="carousel">
                    <ul className="carousel-indicators ofertapp-carousel-indicators general-div"
                    >
                        {
                            Object.keys( supports ).map( id => (
                                <li
                                    key = {id}
                                    data-target="#pubSupportCarousel"
                                    data-slide-to={indicatorsCounter++}
                                    className = {
                                        id === currentSupportIndex ? "active" : ""
                                    }
                                    onClick = {() => this.setState({ currentSupportIndex : id })}
                                ></li>
                            ))
                        }
                    </ul>
                    <div className = "carousel-inner">
                        {
                            Object.keys( supports ).map( id => (
                                <div 
                                    key = {id}
                                    className = {"carousel-item text-center" + (
                                        id === currentSupportIndex ? " active" : ""
                                    )}>
                                        { supports[id] }
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
                <div className="col-12 mt-5 mb-3">
                    <CustomButton
                        caption = {"Añadir soporte"}
                        type = {"primary"}
                        disabled = { supportsCount >= supportsLimit }
                        onClick = {() => this.addSupport()}
                    />
                </div>
            </div>
        );
    }
}

export default SupportsUploadCarousel;