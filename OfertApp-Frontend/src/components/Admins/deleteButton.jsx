import { Component } from "react";
import { 
    deletePublication, deleteComment, deleteUser
} from "../../services/adminService";

class AdminDeleteButton extends Component {
    handleClick = async () => {
        // Data may not exist if its a deletion case
        const { type, id, onSuccess, onError } = this.props;
        let response = null;

        switch( type ){
            case "publicationDelete":
                response = await deletePublication( id );
                break;
            case "commentDelete":
                response = await deleteComment( id );
                break;
            case "userDelete":
                response = await deleteUser( id );
                break;
            default:
                onError( "Error al realizar la operación" );
        }

        if( response ){
            const { status, data, error } = response.data;
            if( status === "success" ){
                onSuccess( data );
            }
            else{
                onError( error );
            }
        } else {
            onError( "Error al realizar la operación" );
        }
    }
    render() {
        const { caption } = this.props;
        return (
            <button onClick={this.handleClick} className="btn btn-danger"
                style={{ borderRadius: "10px"}}
            >
                {caption}
            </button>
        );
    }
}

export default AdminDeleteButton;