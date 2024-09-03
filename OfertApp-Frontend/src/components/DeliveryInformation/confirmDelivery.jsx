import { Component } from 'react';
import { confirmDelivery } from '../../services/publicationService';
import withRouter from '../../services/withRouter';
import { toast } from 'react-toastify';
import CustomButton from '../common/Button/button';

// User wants to confirm he got the product
class ConfirmProductDelivery extends Component {

    state = {  }

    async handleSubmit() {
        try{
            const { id } = this.props.params;
            const { data } = await confirmDelivery( id );
            const { status, error } = data;
            if( status === "success" ){
                // Redirect on successfull verification
                toast.success("Has confirmado la entrega del producto con éxito");
                this.props.navigate("/publication/" + id);
                return;
            } else {
                toast.error("Error al confirmar " + error);
            }

        } catch (error) {
            console.log( error );
            toast.error("Error al confirmar");
        }
    }

    render() { 
        return ( 
            <div className = "text-center general-text">
                <h1>¡Nos alegramos de que tu transacción haya sido exitosa!</h1>
                <p>Por favor confirma en el botón a continuación si has recibido tu producto correctamente</p>
                <p>
                    Recuerda que puedes usar el botón de reporte en la publicación inicial en caso de que algo
                    haya salido mal 
                </p>
                <div className = "col-12 offset-md-3 col-md-6">
                    <br/>
                    <CustomButton
                        caption = "👍Confirmar👍" type = "primary"
                        onClick = { () => this.handleSubmit() }
                    />
                </div>
            </div>
         );
    }
}

export default withRouter(ConfirmProductDelivery);