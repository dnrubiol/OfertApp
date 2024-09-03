import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import logo from "../../images/OfertappGrande.png";
import logoDM from "../../images/OfertappGrandeDM.png";
import { sendResetPasswordEmail } from "../../services/resetPasswordService";
import { toast } from "react-toastify";
import "../../App.css";

class askResetPasswordForm extends Form {
  state = {
    data: {
      user: "",
    },
    errors: {},
  };

  schema = {
    user: Joi.string().email().required().label("Correo"),
  };

  doSubmit = async () => {
    try{
      const { user } = this.state.data;
      const { data: response } = await sendResetPasswordEmail(user);
      const { status, error } = response;
      if(status === "success"){
        toast.success("Correo enviado con éxito, revisa tu bandeja de entrada");

        this.props.navigate("/login");
      } else {
        this.setState({ serverErrors: error });
        toast.error("No se pudo enviar el correo");
      }
    }
    catch(ex){
      console.log(ex);
      toast.error("No se pudo enviar el correo");
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
                {this.renderInput("user", "Tu correo:", "email", false, "", "", 
                  "OBLIGATORIO: Asegúrate de haberte registrado con éste correo electrónico"
                )}
                <br />
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

export default withRouter(askResetPasswordForm);
