import { Component } from "react";
import FileUpload from "../common/FileUpload/fileUpload";
import CustomButton from "./../common/Button/button";
import Info from "../common/info";

class AddSupportDialog extends Component {

    state = { 
        data: "", 
        body: "" 
    };

    handleDataSelection = async (image) => {
        this.setState({ data: image });
      };
    
    handleTextChange = (event) => {
        this.setState({ body: event.target.value });
    };

    render () {
        return (
            <div
                className="modal fade"
                id="modalAddSupport"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalOfertaLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Agrega un soporte
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
                    <div className="modal-body">
                        <div className = "row">
                        <div className="col-12">
                            <FileUpload
                            label="Imagen de soporte"
                            type="image"
                            onChange={this.handleDataSelection}
                            info = {
                                "OBLIGATORIO: Por favor sube una imagen que sea significativa para tu soporte, " +
                                "por ejemplo, recibos de envío, facturas, etc."
                            }
                            />
                        </div>
                        <br/>
                        <div className="col-12">
                            <Info
                                info="OPCIONAL: Por favor describe tu soporte"
                            />
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="10"
                                onChange={this.handleTextChange}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <CustomButton
                            caption="Publicar"
                            type="primary"
                            onClick={() => this.props.onSubmit(
                                this.state.data, this.state.body
                            )}
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

export default AddSupportDialog;