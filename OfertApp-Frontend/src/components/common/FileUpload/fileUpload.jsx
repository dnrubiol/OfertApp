import { Component } from 'react';
import ShowFile from "../ShowFile/showFile";
import Info from "../info";
import "./fileUpload.css";

const acceptedTypes = [
    ".jpg", ".gif", ".png", ".jpeg", ".bmp", 
    ".svg", ".webp", ".mp4", ".webm", ".pdf"
]

class FileUpload extends Component {
    state = {
        fileName : ".jpg",
        value : "https://cdn.filestackcontent.com/pLDF5BZTP6ASwiobbC8W"
    }

    render() {
        const { label, onChange, info } = this.props;
        const { value, fileName } = this.state;
        return (
            <div className = "row text-center">
                <h5 className='label-style general-text'>
                    {label} { info ? <Info text={info} /> : "" }
                </h5>
                <div className = "file-upload-wrapper mb-3 text-center">
                    <input 
                        type = "file"  
                        className = "text-center ofertapp-file-upload general-text"
                        accept = {acceptedTypes}
                        onChange={e => {
                            const fileValue = e.target.files[0];

                            // Check if this is a valid file
                            if( ! fileValue ) {
                                this.setState({
                                    fileName : "Invalid file",
                                    value : "https://cdn.filestackcontent.com/pLDF5BZTP6ASwiobbC8W"
                                });

                                // Notify an invalid file
                                onChange(null);
                                return;
                            };

                            const value = URL.createObjectURL(fileValue);
                            const fileName = e.target.value;
                            this.setState({ 
                                fileName : fileName,
                                value : value
                            });

                            // We should only notify listenners with an actual file..
                            onChange(fileValue)
                        }}
                    />
                </div>
                <div className='ofertapp-upload-div'>
                    <ShowFile
                        caption={"Uploaded file"}
                        contentType={"AUTO"}
                        data={value}
                        fileName={fileName}
                        height={"180px"}
                    />
                </div>
                
            </div>
        );
    }
}

export default FileUpload;