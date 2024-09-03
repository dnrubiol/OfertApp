import React, { Component } from "react";
import { performPayment } from "../../services/paymentService";
import { getConfig } from "../../services/configService";
import { toast } from "react-toastify";
import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";
import WithRouter from "../../services/withRouter";
import Input from "./../common/input";
import CustomButton from "../common/Button/button";
import DisplayErrors from "./../common/Errors/displayErrors";

const minAmount = 3000;

class RechargeAccountView extends Component {

    state = {
        amount: 0,
        isReady: false,
        errors: {}
    }

    async componentDidMount() {
        const response = await getConfig();
        const { status, data } = response.data;
        if( status === "success" ) {

            // Initialize Mercado Pago SDK
            initMercadoPago( data.MP_PUBLIC_KEY, {
                locale: "es-CO"
            } );
        }
    }

    updateAmount( amount ) {

        amount = parseInt( amount );
        // Render only if not in process
        this.setState({
            amount : amount,
            isReady : false
        })
    }

    componentWillUnmount() {
        // Delete old bricks first
        if( window.cardPaymentBrickController)
            window.cardPaymentBrickController.unmount()
    }

    // Create Mercado Pago Wallet Payment
    configureRecharge() {
        // Returns all neeeded configs for controls
        // to be rendered
        return {
            initialization : {
                amount : this.state.amount
            },
            onSubmit : async ( formData ) => {
                return new Promise( async (resolve, reject) => {
                    try{
                        const response = await performPayment( formData );
                        const { status, error  } = response.data;
                        if( status === "success" ) {
                            // Only case where we will accept the payment
                            toast.success( "Pago realizado con éxito!" );
                            resolve( );

                            // Redirect to transactions
                            this.props.navigate( "/transaction-history" );
                        } else {
                            this.setState({
                                errors : error
                            });
                            reject();
                        }
                    } catch( e ) {
                        console.log( e );
                        toast.error( "Error al procesar el pago: " + e.message || "" );
                        reject();
                    }
                });
            },
            onError : async ( e ) => {
                // callback called for each error in block
                toast.error("Error al procesar el pago " + e.message || "");
            },
            onReady : async (_) => {
                // callback called when block is done
                if( this.state.inProcess )
                    this.setState({
                        inProcess : false
                    })
            },
            // Visual details
            customization : {
                paymentMethods: {
                    minInstallments: 1,
                    maxInstallments: 1,
                },
                visual : {
                    texts: {
                        "formTitle": "Recarga tu cuenta con tu tarjeta de crédito / débito!",
                        "emailSectionTitle": "Usa tu correo electrónico, recuerda que debe ser el mismo que usaste para registrarte en Ofertapp!",
                        "installmentsSectionTitle": "Cuotas",
                        "cardholderName": {
                          "label": "Tu nombre, el mismo con el que te registraste en OfertApp",
                          "placeholder": this.props.userData ? 
                                        this.props.userData.firstName + " " + this.props.userData.lastName :
                                        ""
                        },
                        "email": {
                          "label": "Tu email",
                          "placeholder": this.props.userData ?
                                        this.props.userData.email :
                                        ""
                        },
                        "cardholderIdentification": {
                          "label": "Tu identificación va aquí!"
                        },
                        "cardNumber": {
                          "label": "Número de taejeta de crédito / débito",
                        },
                        "expirationDate": {
                          "label": "Expiración de tu tarjeta"
                        },
                        "securityCode": {
                          "label": "Código de seguridad de tu tarjeta"
                        },
                        "formSubmit": "Recargar!"
                      },
                    style : {
                        theme: "dark",
                        customVariables: {
                            baseColor: "#017C41"
                        },
                    }
                }
            }
        }
    }

    render() {
        const { onSubmit, onError, onReady, initialization, customization } = this.configureRecharge();
        const { isReady, amount } = this.state;
        return (
            <div className = "row text-center">
                <h1 className="col-12 ofertapp-page-subtitle">Recarga tu cuenta!</h1>
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-6 offset-3 mb-5">
                    <Input 
                        label="¿Cuánto deseas recargar? (COP $)" 
                        name="amount" 
                        type="number" 
                        onChange={ (e) => this.updateAmount( e.target.value )}
                        disabled = { this.state.inProcess }
                        info = { `El monto mínimo para recargar es de COP $${minAmount}` }
                    />
                    {
                        amount >= minAmount && !isReady &&
                        <React.Fragment>
                            <br/>
                            <CustomButton
                                caption = "Listo!"
                                type = "primary"
                                onClick = { () => {
                                    this.setState({
                                        isReady : true
                                    })
                                } }
                            />
                        </React.Fragment>
                    }
                    
                </div>
                {
                    isReady &&
                        <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-6 offset-3 mb-5">
                            <CardPayment
                                initialization = {initialization}
                                onSubmit = {onSubmit}
                                onError = {onError}
                                onReady = {onReady}
                                customization = {customization}
                            />
                        </div>
                }
                {
                    this.state.errors &&
                    <DisplayErrors errors = { this.state.errors } />
                }
            </div>
        )
    }
}

export default WithRouter( RechargeAccountView );