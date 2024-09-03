import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import { Link } from "react-router-dom";
import { login } from "../../services/userService";
import logo from "../../images/OfertappGrande.png";
import logoDM from "../../images/OfertappGrandeDM.png";
import { toast } from "react-toastify";
import "./loginForm.css";

class LoginForm extends Form {
  state = {
    data: {
      user: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    user: Joi.string().required().label("Nombre de usuario o correo"),
    password: Joi.string().required().label("Contraseña"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      const { data: response } = await login(data.user, data.password);
      const { status, token , error } = response;
      if ( status === "success") {
        toast.success(
          "Inicio de sesión exitoso. Serás redirigido en un momento"
        );
        // Success logic, save token and redirect
        localStorage.setItem("token", token); // Save JWT in client browser

        // Finally update general user data
        await this.props.OnUpdateUserData();

        this.props.navigate("/homepage");
      } else {
        this.setState({ serverErrors: error });
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (e) {
      toast.error("Usuario o contraseña incorrectos");
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
                <h5 className="login-title ps-2">
                  Inicio de sesión
                </h5>
                {this.renderInput(
                  "user", 
                  "Nombre de usuario", 
                  "text", false, "", "",
                  "OBLIGATORIO: Usa tu nombre de usuario o contraseña!"
                )}
                {this.renderInput(
                  "password", 
                  "Contraseña", 
                  "password", false, "", "",
                  "OBLIGATORIO: Usa la contraseña que elegiste al registrarte!"
                )}
                <br/>
                <div className="row justify-content-center">
                  {this.renderButton("¡Listo!")}
                </div>
                <div className = "text-center">
                  <Link id="reset-password-login" to="/askResetPassword">
                    ¿Olvidaste tu contraseña? Recupérala!
                  </Link>
                  <br/>
                  <Link id="register-user-login" to="/register">
                    Regístrate si no tienes una cuenta
                  </Link>
                </div>
                
              </div>
            </div>
      
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);