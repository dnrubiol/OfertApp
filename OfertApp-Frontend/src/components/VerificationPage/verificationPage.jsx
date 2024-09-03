import { Component } from 'react';
import CustomButton from '../common/Button/button';
import { verify } from './../../services/verificationService';
import withRouter from '../../services/withRouter';
import { toast } from 'react-toastify';

class VerificationPage extends Component {
    state = {  }

    async verifyAccount() {
        try{
            const { token, userid } = this.props.params;
            const { data } = await verify(token, userid);

            if( data.status === "success" ){
                // Redirect on successfull verification
                toast.success("Cuenta verificada con éxito");
                this.props.navigate("/homepage");
                return;
            }
            
            toast.error("Error al verificar la cuenta");

        } catch (error) {
            console.log( error );
            toast.error("Error al verificar la cuenta");
        }
        
        
    }

    render() { 
        return ( 
            <div className = "text-center general-text">
                <h1>¡Gracias por registrarte en OfertApp!</h1>
                <p>Por favor presiona el siguiente botón para verificar tu cuenta</p>
                <CustomButton 
                    caption = "Verificar" type = "primary" 
                    onClick = {
                        () => this.verifyAccount()
                    }/>
            </div>
         );
    }
}

export default withRouter(VerificationPage);