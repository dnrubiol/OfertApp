import { Component } from 'react';
import CustomButton from '../common/Button/button';
import { buyMembership } from '../../services/userService';
import { toast } from 'react-toastify';
import "./../../App.css";

class BuyMembership extends Component {
    state = { }

    async handleSubmit() {
        try {
            const { data : response } = await buyMembership();
            const { status, error } = response;
            if( status === "success" ){
                // Redirect on successfull verification
                toast.success("Membresía comprada con éxito");
            } else {
                toast.error("Error al verificar la cuenta " + error );
            }
        } catch (error) {
            console.log( error );
            toast.error("Error al verificar la cuenta");
        }
    }

    render() { 
        return (
            <div
                className="modal fade"
                id="modalBuyMembership"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalUpdateReport"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header general-div general-text">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Compra tu membresía!
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
                        <div className="modal-body general-div general-text">
                            <div className = "row">
                                <div className = "col-12 mb-3">
                                    <p>
                                        Beneficios de la membresía:
                                    </p>
                                    <ul>
                                        <li>Puedes hacer que tus publicaciones tengan más relevancia</li>
                                        <li>Puedes asignar cualquier tiempo de subasta para tus publicaciones</li>
                                        <li>Tu membresía durará un mes y podrás aumentar la relevancia de hasta 5 publicaciones</li>
                                        <li>Podrás renovar tu membresía siempre que lo desees</li>
                                        <li>COSTO: COP $ 10.000</li>
                                    </ul>
                                </div>
                                <div className = "col-12">
                                    <CustomButton
                                        data-dismiss="modal"
                                        caption = "Comprar membresía"
                                        type = "primary"
                                        onClick = { this.handleSubmit }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyMembership;