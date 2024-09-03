import React, { Component } from 'react';
import FileUpload from '../../common/FileUpload/fileUpload';
import CustomButton from "./../../common/Button/button";
import Input from '../../common/input';

class SupportData extends Component {
    state = {}
    
    render() {
        const { onDelete, onDescriptionChange, onEvidenceFileChange, id } = this.props;
        return (
            <React.Fragment>
                <FileUpload
                    label = {
                        "Puedes adjuntar imágenes y videos, no olvides que tus usuarios querrán estar seguros de la calidad de tu producto ofertado," +
                        " ¡Dales todo el soporte que consideres necesario!"}
                    type="image"
                    onChange = {
                        (file) => onEvidenceFileChange(
                            id, file
                        )
                    }
                />
                <Input 
                    label = "Describe tu evidencia para hacerlo aún más claro"
                    name = "evidenceDescription"
                    onChange = {
                        (e) => {
                            onDescriptionChange(
                                id, e.currentTarget.value
                            )
                        }
                    }
                />
                <br/>
                <CustomButton
                    caption = {"Remover soporte"}
                    type = {"report"}
                    onClick = {() => { onDelete( id ) }}
                    width = {50}
                />
            </React.Fragment>
        )
    }
}

export default SupportData;