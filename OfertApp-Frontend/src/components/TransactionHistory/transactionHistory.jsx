import { Component } from 'react';
import withRouter from "../../services/withRouter";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';

import { getTransactions } from "../../services/transactionService";
import { getDatetimeFormatted } from '../../utils/getTime';

import QuickPaymentInfo from "./quickPaymentInfo";
import QuickOfferInfo from "./quickOfferInfo";
import QuickAdminInfo from "./quickAdminInfo";

import "./transactionHistory.css";

const pageSize = 10;

class TransactionHistory extends Component {

    state = {
        data : {
            rawTransactions: [],
        },
        transactions: [],
        currentPage: 1,
    }

    // Give transaction type a proper format
    getTransactionType( transaction ){
        switch( transaction.type ){
            case "BP" :
                return "Puja";
            case "BC" :
                return "Cancelación de Puja";
            case "CS":
                return "Costo por venta";
            case "AR":
                return "Recarga de saldo";
            case "AW":
                return "Retiro de saldo";
            case "AA":
                return "Ajuste de administrador";
            default:
                return "Otro";
        }
    }

    // Get transaction flow formatted
    getTransactionFlow( transaction ){

        // Define display colors
        let balanceChange = transaction.postBalance - transaction.prevBalance;
        let frozenChange = transaction.postFrozen - transaction.prevFrozen;

        // Define display text
        return (
            <div>
                <p
                    style = {{
                        color: balanceChange > 0 ? "green" : 
                            balanceChange < 0 ? "red" : "var(--ofertapp-general-text-color)",
                    }}
                >
                    Balance: {" COP $ " + ((balanceChange > 0 ? "+" : "") + balanceChange.toLocaleString())}
                </p>
                <p
                    style = {{
                        color: frozenChange > 0 ? "blue" : 
                            frozenChange < 0 ? "orange" : "--ofertapp-general-text-color",
                    }}
                >
                    Congelado: {" COP $ " + ((frozenChange > 0 ? "+" : "") + frozenChange.toLocaleString())}
                </p>
            </div>
        )
    }

    // Renders a tooltip with transaction's additional information
    renderAdditionalInfo(transaction, props, type) {  
        return (
            <Tooltip
                id = {"transaction-info-tooltip"} {...props}
                className="ofertapp-transaction-info-tooltip"
            >
                {
                    type === "offer" ? 
                    <QuickOfferInfo offer = {transaction.offer} /> :
                    type === "payment" ?
                    <QuickPaymentInfo payment = {transaction.payment} /> :
                    type === "admin" ? 
                    <QuickAdminInfo admin = {transaction.admin} /> : 
                    <h2 className="general-text">
                        No hay datos adicionales
                    </h2>
                }
            </Tooltip>
        )
    }

    // Redirects to transaction's offer
    handleTransactionClick( transaction, type ){
        if( type === "offer" ){
            this.props.navigate("/publication/" + transaction.offer.publication);
        }
    }

    // Get user's transactions
    async componentDidMount() {
        try{
            const token = localStorage.getItem("token");
            if( !token ){
                this.props.navigate("/login");
                return;
            }
            const responseData = await getTransactions( token );
            const { data, status } = responseData.data;
            if( status === "success" ){

                // Paginate data with first page data
                const transactions = paginate( data, this.state.currentPage, pageSize );
                this.setState(
                    {
                        transactions: transactions,
                        data: {
                            rawTransactions: data,
                        }
                    }
                );
                return;
            } else {
                console.log("Error: ", data);
                this.props.navigate("/login");

            }
        } catch( e ){
            console.log("Error: ", e);
            this.props.navigate("/login");
        }
    }
    
    handlePageChange = page => {
        this.setState({ 
            currentPage: page,
            transactions: paginate( this.state.data.rawTransactions, page, pageSize )
        });
    };

    render() {
        const transactions = this.state.transactions;
        return (
            <div className="w-100">
                <h1 className = "ofertapp-page-title">
                    Mis Transacciones
                </h1>
                {
                    transactions && transactions.length > 0 ?
                    <div>
                        <table className="ofertapp-table w-100 text-center">
                            <thead>
                                <tr>
                                    <th className="ofertapp-table-header">Fecha</th>
                                    <th className="ofertapp-table-header">Tipo</th>
                                    <th className="ofertapp-table-header">Descripción</th>
                                    <th className="ofertapp-table-header">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.transactions.map( transaction => {
                                        const type = transaction.offer ?
                                             "offer" : transaction.payment ? 
                                                "payment" : transaction.admin ? 
                                                    "admin" : "none";

                                        return (
                                            <OverlayTrigger
                                                key = {transaction.id}
                                                placement="auto"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={(props) => this.renderAdditionalInfo(
                                                    transaction, props, type
                                                )}
                                            >
                                                <tr key = {transaction.id}
                                                    style={
                                                        (type === "offer" || type === "payment") ?
                                                        {cursor: "pointer"} : {}
                                                    }
                                                    className='ofertapp-table-row'
                                                    onClick={() => this.handleTransactionClick(
                                                        transaction, type
                                                    )}
                                                >
                                                    <td style={{All : "inherit"}}>
                                                        {getDatetimeFormatted(transaction.timestamp)}
                                                    </td>
                                                    <td style={{All : "inherit"}}>
                                                        {this.getTransactionType(transaction)}
                                                    </td>
                                                    <td style={{All : "inherit"}}>
                                                        {transaction.description}
                                                    </td>
                                                    <td style={{All : "inherit"}}>
                                                        {this.getTransactionFlow(transaction)}
                                                    </td>
                                                </tr>
                                            </OverlayTrigger>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={this.state.data.rawTransactions.length}
                            pageSize={pageSize}
                            currentPage={this.state.currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                    :
                    <div>
                        <h2 className="general-text">
                            No hay transacciones
                        </h2>
                    </div>
                }
            </div>
        );
    };
}

export default withRouter(TransactionHistory);