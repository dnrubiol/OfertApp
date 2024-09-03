import { Component } from 'react';
import Offer from '../common/Offer/offer';
import '../common/Offer/offerForm';
import './publicationView.css';
import OfferForm from '../common/Offer/offerForm';

class PublicationViewOffers extends Component {

    state = {
        offers : [],
    }

    async componentDidMount(){
        const { publication } = this.props;
        this.setState({offers: publication.offers});
    }

    handleOfferAdd = async (offerData) => {

        // Get user data
        const { userData } = this.props;
        
        const newOffer = {
            ...offerData,
            user : userData,
            createdAt: new Date().toISOString()
        }

        // Add offer to visualization list
        this.setState({
            offers: [
                newOffer,
                ...this.state.offers
            ]
        })
    }
    
    render(){

        // Useful vars
        let mainOfferAssigned = false;
        const { publication, userLoggedIn : loggedIn, userData } = this.props;

        return (
            <div className = "row align-middle text-center">
                <h3 className = "ofertapp-label">Ofertas</h3>
                {
                    this.state.offers.length > 0 ? <div 
                        className = "col-12 ofertapp-overflow"
                        style = {{"--height": "480px"}}
                    >
                    {
                        this.state.offers.map( offer => (
                        <Offer offer={offer} key = {offer.id} main={(
                            () => {
                            // Assign main class to first item
                            const toReturn = !mainOfferAssigned;
                            mainOfferAssigned = true;
                            return toReturn;
                            }
                        )()} />
                        ))
                    }
                    </div>
                    :
                    <p className = "ofertapp-label">No hay ofertas</p>
                }
                {
                    loggedIn && ! ( userData && userData.isAdmin ) &&
                    <div className='col-12'>
                        <button type="button" className="btn ofertapp-button-primary" data-toggle="modal" data-target="#modalOferta">
                            Crear oferta
                        </button>
                        <div className="modal fade" 
                            id="modalOferta" 
                            tabIndex="-1" 
                            role="dialog" 
                            aria-labelledby="modalOfertaLabel" 
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content general-div">
                                    <div className="modal-header general-text">
                                        <h5 className="modal-title" id="exampleModalLabel">Oferta</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                    
                                        <OfferForm 
                                            publication={publication}
                                            OnOfferAdd = {this.handleOfferAdd}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}

export default PublicationViewOffers;