import { Component } from "react";
import CheckBox from "./../common/checkBox";
import ComboBox from "../common/comboBox";
import CustomButton from "../common/Button/button";
import Input from "../common/input";
import { editReport } from "../../services/adminService";
import "./adminsControls.css";

class UpdateReportStatusForm extends Component {
    state = {
        // Whether this report must be opened or not
        open: true,

        // Whether this report must be visible to users or not
        visible : false,

        // There are 3 options: 1) Nobody is blocked 2) Reporter is blocked 3) Reported is blocked
        blockState: 1,

        // There are 3 options: 1) No transactions 2) Transaction to receiver 3) Transaction to seller
        transactionState: 1,

        // Amount to be transferred to the receiver
        amount: 0,
    };

    async componentDidMount() {
        const { report } = this.props;
        this.setState({
            open: report.open,
            visible: report.visible,
            blockState: 1,
            transactionState: 1,
            amount: 0
        });
    }

    handleOpenChange = open => {
        this.setState({ open });
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
    }

    handleBlockStateChange = blockState => {
        this.setState({ blockState });
    }

    handleTransactionStateChange = transactionState => {
        this.setState({ transactionState });
    }

    handleAmountChange = amount => {
        this.setState({ amount });
    }

    handleSubmit = async () => {
        const { report, onSuccess, onError } = this.props;
        const { data: response } = await editReport( report.id, this.state );
        const { status, data, error } = response;
        if( status === "success" ){
            onSuccess( data );
        } else {
            onError( error );
        }
    }

    render() {
        const { open, visible, blockState, transactionState, amount  } = this.state;
        return (
            <div
                className="modal fade"
                id="modalUpdateReport"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalUpdateReport"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                            Actualizar estado de reporte
                            </h5>
                            <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className = "row">
                                <div className = "col-12 col-md-6">
                                    <CheckBox
                                        label = "Reporte resuelto (abierto)"
                                        name = "resolved"
                                        value = { open }
                                        onChange={ this.handleOpenChange }
                                    />
                                </div>
                                <div className = "col-12 col-md-6">
                                    <CheckBox
                                        label = "Reporte visible para vendedor"
                                        name = "visible"
                                        value = { visible }
                                        onChange={ this.handleVisibleChange }
                                    />
                                </div>
                                <div className = "col-12">
                                    <ComboBox
                                        label = "Bloquear usuario del sistema"
                                        name = "blockState"
                                        options = {[
                                            { name: 1, label: "Nadie bloqueado" },
                                            { name: 2, label: "Reportador bloqueado" },
                                            { name: 3, label: "Reportado bloqueado" },
                                        ]}
                                        value = { blockState }
                                        onChange={ this.handleBlockStateChange }
                                    />
                                </div>
                                <div className = "col-12">
                                    <ComboBox
                                        label = "Realizar transacción monetaria"
                                        name = "blockState"
                                        options = {[
                                            { name: 1, label: "N/A" },
                                            { name: 2, label: "Transacción a usuario" },
                                            { name: 3, label: "Transacción a ofertante" },
                                        ]}
                                        value = { transactionState }
                                        onChange={ this.handleTransactionStateChange }
                                    />
                                </div>
                                <div className = "col-12 mb-3">
                                    <Input
                                        label = "Monto a transferir"
                                        name = "amount"
                                        type = "number"
                                        value = { amount }
                                        onChange={ (e) => this.handleAmountChange(e.currentTarget.value) }
                                    />
                                </div>
                                <div className = "col-12">
                                    <CustomButton
                                        caption = "Actualizar reporte"
                                        type = "primary"
                                        onClick = { this.handleSubmit }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

export default UpdateReportStatusForm;