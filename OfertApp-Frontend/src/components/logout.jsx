import { Component } from "react";
import { logout } from "../services/userService";
import withRouter from "./../services/withRouter";
import { toast } from "react-toastify";

class Logout extends Component {

    async componentDidMount() {
        try {
            const token = localStorage.getItem("token");
            const { data: responseData } = await logout(token);
            const { status } = responseData;
            if (status === "success") {
                localStorage.removeItem("token");
                
                await this.props.OnUpdateUserData();
                this.props.navigate("/homepage");
                return;
            } else {
                toast.error("Error al cerrar sesión");
            }
        } catch (e) {
            console.log("Error: ", e);
            toast.error("Error al cerrar sesión");
        }
    }

    render() {
        return (
            <div className = "general-text">
                <h1>Cerrando sesión...</h1>
            </div>
        );
    }
}

export default withRouter(Logout);