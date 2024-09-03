import Form from '../common/form';
import Joi from 'joi-browser';
import ComboBox from '../common/comboBox';
import { setDeliveryInformation } from '../../services/publicationService';
import withRouter from '../../services/withRouter';
import { toast } from 'react-toastify';
import CustomButton from '../common/Button/button';

class DeliveryInfo extends Form {
    state = {
        data: {
            deliveryId: "",
            deliveryType: "SV"
        },
        errors:{}
    }

    schema = {
        deliveryId: Joi.string().required().label("Delivery ID"),
        deliveryType: Joi.string().required().label("Delivery Type")
    }

    handleDeliveryTypeChange = type => {
        this.setState({ data: { ...this.state.data, deliveryType : type } });
    }

    async handleSubmit() {
        try{
            const { id } = this.props.params;   
            const { data } = await setDeliveryInformation(id, this.state.data );
            const { status, error } = data;
            if( status === "success" ){
                // Redirect on successfull verification
                toast.success("Información de envío registrada con éxtio!");
                this.props.navigate("/publication/" + id);
                return;
            } else {
                this.setState(
                    { serverErrors: error  }
                )
                toast.error("Error al editar información de envío" );
            }

        } catch (error) {
            console.log( error );
            toast.error("Error al editar información");
        }
    }

    render() { 
        return ( 
            <div className = "text-center general-text">
                <h1>¡Felicidades por tu venta!</h1>
                <p>Por favor escribe a continuación la información de envío del producto</p>
                <div className = "col-12 offset-md-3 col-md-6">
                    <ComboBox
                        name = "deliveryType"
                        label = "Tipo de envío"
                        onChange = { this.handleDeliveryTypeChange }
                        currentValue = { this.state.data.deliveryType }
                        options = {[
                            { name: "SV", label: "Servientrega" },
                            { name: "PS", label: "ProSegur" },
                        ]}
                        info = { "Selecciona el tipo de envío, recuerda que Servientrega permite transaccciones " +
                            "de hasta $10.000.000"}
                    />

                    {this.renderInput("deliveryId", "ID de envío")}
                    <br/><br/>
                    <CustomButton
                        caption = "Guardar" type = "primary"
                        onClick = { () => this.handleSubmit() }
                    />
                </div>
            </div>
         );
    }
}

export default withRouter(DeliveryInfo);