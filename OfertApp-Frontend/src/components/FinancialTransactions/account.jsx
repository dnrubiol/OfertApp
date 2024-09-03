import { Component } from "react";
import RechargeAccountView from "./recharge";
import WithdrawAccountView from "./withdraw";
import withRouter from "../../services/withRouter";
import { getConfig } from "./../../services/configService";

import "./financialTransactions.css"

class FinancialTransactionsView extends Component {
    
    state = {
        PPClientID: 0,
        currentTab: this.props.tab || "recharge"
    }

    async componentDidMount() {
        const response = await getConfig();
        const { status, data } = response.data;
        if( status === "success" ) {
            this.setState({ PPClientID: data.PPClientID });

        } else {
            this.props.navigate("/login");
        }
    }

    render() {
        return (
            <div>
                <h1 className="ofertapp-page-title">Transacciones financieras</h1>
                <div className="row">
                    <div 
                        className = {"col-12 col-sm-6 ofertapp-tab-choice" + (this.state.currentTab === "recharge" ? " active" : "")}
                        onClick={() => {
                            if( this.state.currentTab !== "recharge")
                                this.setState({ currentTab: "recharge" })
                        }}>
                            Recargar tu cuenta
                    </div>
                    <div 
                        className = {"col-12 col-sm-6 ofertapp-tab-choice" + (this.state.currentTab === "withdraw" ? " active" : "")}
                        onClick={() => {
                            if( this.state.currentTab !== "withdraw")
                                this.setState({ currentTab: "withdraw" })
                        }}>
                            Retirar de tu cuenta
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.currentTab === "recharge" ? 
                            <RechargeAccountView userData = {this.props.userData} /> : 
                            <WithdrawAccountView clientId = {this.state.PPClientID} />
                        }
                    </div>    
                </div>    
                
            </div>
        )
    }

};

export default withRouter(FinancialTransactionsView);
