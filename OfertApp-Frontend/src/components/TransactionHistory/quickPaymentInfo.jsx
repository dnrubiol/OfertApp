import { Component } from 'react';
import "./transactionHistory.css";

class QuickPaymentInfo extends Component {
    state = {  }
    render() { 
        const payment = this.props.payment;
        return ( 
            payment && 
            <div className='row'>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 ofertapp-small-table-item">
                            Hiciste una transacción con dinero real
                        </div>
                        <div className="col-12 col-sm-6 ofertapp-small-table-item">
                            Monto:
                        </div>
                        <div className="col-12 col-sm-6 ofertapp-small-table-item">
                            COP $ {parseFloat(payment.amount).toLocaleString()}                            
                        </div>
                    </div>
                </div>
                <div className='col-12 ofertapp-small-table-item-alternative'>
                    Haz click sobre la transacción para ir al pago
                </div>
            </div>
         );
    }
}

export default QuickPaymentInfo;