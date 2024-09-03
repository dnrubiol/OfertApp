import { Component } from 'react';
import Info from '../common/info';
import "./statistics.css";

class StatisticsAccountView extends Component {
    
    render() { 
        const { balance, frozenBalance } = this.props;    
        return ( 
            <div className='row ofertapp-bottomline text-center'>
                <h3 className='col-12 ofertapp-label mb-3'>
                    Tu balance actual es: 
                    <Info text='El balance es el dinero que tienes disponible para realizar ofertas.' />
                </h3>
                <h3 className='col-12 ofertapp-stats-value mb-3'>
                    COP $ {balance.toLocaleString()}
                </h3>
                <h3 className='col-12 ofertapp-label mb-3'>
                    Tu saldo congelado actual es:
                    <Info 
                        text={'El saldo congelado es el dinero que hemos congelado para garantizar que ' +
                        'puedas cumplir con tus ofertas. Este dinero se te devolverá una vez que ' +
                        'tus ofertas se hayan cumplido o alguien haya hecho mejores pujas.'}
                    />
                </h3>
                <h3 className='col-12 ofertapp-stats-value mb-3'>
                    COP $ {frozenBalance.toLocaleString()}
                </h3>
            </div>
         );
    }
}

export default StatisticsAccountView;