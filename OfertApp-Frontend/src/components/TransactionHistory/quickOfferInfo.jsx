import { Component } from 'react';
import "./transactionHistory.css";

class QuickOfferInfo extends Component {
    state = {  }
    render() { 
        const offer = this.props.offer;
        return (
            offer && 
            <div className='row'>
                <div className='ofertapp-small-table-item'>
                    Hiciste una oferta en la subasta de {offer.user.username}
                </div>
                <div className='ofertapp-small-table-item-alternative'>
                    Haz click sobre la transacción para ir a la subasta 
                </div>
            </div>
         );
    }
}

export default QuickOfferInfo;