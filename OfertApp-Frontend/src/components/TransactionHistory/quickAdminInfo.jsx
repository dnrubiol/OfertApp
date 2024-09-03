import { Component } from 'react';
import "./transactionHistory.css";

class QuickAdminInfo extends Component {
    state = {  }
    render() { 
        const admin = this.props.admin.user;
        return ( 
            admin && 
            <div className='row'>
                <div className='ofertapp-small-table-item'>
                    Un administrador ha intervenido en esta transacción: 
                </div>
                <div className='ofertapp-small-table-item-alternative'>
                    {admin.username}
                </div>
            </div>
         );
    }
}

export default QuickAdminInfo;