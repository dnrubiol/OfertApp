import { Component } from "react";
import { witdrawMoney } from "../../services/paymentService";
import { toast } from "react-toastify";
import CustomButton from "./../common/Button/button";
import WithRouter from "../../services/withRouter";
import Input from "./../common/input";
import DisplayErrors from "../common/Errors/displayErrors";

const minAmount = 3000;
class WithdrawAccountView extends Component {

    state = {
        amount: 0,
        errors : {},
    }

    updateAmount( amount ) {    
        amount = parseInt( amount );
        // Render only if not in process
        this.setState({
            amount : amount
        })
    }

    async performWithdraw() {
        const response = await witdrawMoney( this.state.amount );
        const { status, error } = response.data;
        if( status === "success" ) {
            toast.success( "Retiro realizado con éxito!" );
            this.props.navigate( "/transaction-history" );
        } else {
            this.setState({
                errors : error
            })
        }
    }

    render() {
        return (
            <div className = "row text-center">
                <h1 className="col-12 ofertapp-page-subtitle">
                    Retira dinero de tu cuenta!
                </h1>
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-6 offset-3 mb-5">
                    <Input 
                        label="¿Cuánto deseas retirar? (COP $)" 
                        name="amount" 
                        type="number" 
                        onChange={ (e) => this.updateAmount( e.target.value ) }
                        info = { `El monto mínimo para retirar es de COP $${minAmount}` }
                    />
                </div>
                {
                    this.state.amount >= minAmount && 
                        <CustomButton
                            caption = "Listo!"
                            type = "primary"
                            onClick = { () => this.performWithdraw() }
                            disabled = { this.state.inProcess }
                        />
                }
                {
                    <DisplayErrors errors = { this.state.errors } />
                }
            </div>
        )
    }
}

export default WithRouter(WithdrawAccountView);