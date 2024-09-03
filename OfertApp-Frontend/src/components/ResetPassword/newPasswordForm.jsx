import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import logo from "../../images/OfertappGrande.png";
import logoDM from "../../images/OfertappGrandeDM.png";
import { resetPassword } from "../../services/resetPasswordService";
import { toast } from "react-toastify";
import "../../App.css";

class newPasswordForm extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ 
    ).required().label("Contraseña").options({
      language: {
        string: {
          regex: {
            base: "La contraseña debe tener al menos 8 caracteres, una mayúscula, " + 
              "una minúscula y un número"
          }
        }
      }
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
      .label("Confirmar Contraseña"),
  };

  doSubmit = async () => {
    const { token, user } = this.props.params;
    const { password, confirmPassword } = this.state.data;

    try{
      const { data : response } = await resetPassword(token, user, password);

      // Dirty check around here, joi is a little bit more tricky than expected..
      if(password !== confirmPassword){
        toast.error("Las contraseñas no coinciden");
        return;
      }
      const { status, error } = response;
      if(status === "success"){
        toast.success("Contraseña cambiada con éxito");

        this.props.navigate("/login");
      } else {
        this.setState({ serverErrors: error });
        toast.error("No se pudo cambiar la contraseña");
      }
      
    }
    catch(ex){
      console.log(ex);
      toast.error("No se pudo cambiar la contraseña");
    }
    
    
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-div">
            <div className="row align-middle">
              <img className="login-logo pb-2" 
                src={this.props.theme === "light" ? logo : logoDM } alt="Nope" 
                />
              <div className="offset-1 col-10">
                <h5 className="login-title ps-2">Recuperación de</h5>
                <h5 className="login-title ps-2 pb-3">contraseña</h5>
                {this.renderInput(
                  "password", 
                  "Contraseña", 
                  "password", false, "", "",
                  "OBLIGATORIO: La contraseña debe tener al menos 8 caracteres, una mayúscula, " +
                  "una minúscula y un número"
                )}
                {this.renderInput(
                  "confirmPassword",
                  "Confirmar Contraseña",
                  "password", false, "", "",
                  "OBLIGATORIO: Las contraseñas proveídas deben coincidir"
                )}
                <div className="row justify-content-center">
                  {this.renderButton("Enviar")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(newPasswordForm);
