import { Component } from 'react';
import { Document, Page } from 'react-pdf';
import "./showFile.css";

class ShowFile extends Component {
    renderFile( ) {
        let { contentType } = this.props;
        const { data, caption, fileName, width, height } = this.props;
        const style = {
            width: width || "35vw",
            height: height || "80%",
            margin: "auto",
            objectFit: "contain"
        }

        if( contentType === "AUTO") {
            const extension = fileName.split('.').pop();

            const imageTypes = ["jpg", "gif", "png", "jpeg", "bmp", "svg", "webp"];
            const videoTypes = ["mp4", "webm"];
            const documentTypes = ["pdf"];
            
            if( imageTypes.includes( extension ) ) {
                contentType = "IMAGE";
            } else if( videoTypes.includes( extension ) ) {
                contentType = "VIDEO";
            } else if( documentTypes.includes( extension ) ) {
                contentType = "DOCUMENT";
            } else {
                contentType = "IMAGE";
            }
        } 
        
        if (contentType === "IMAGE") {
            return (
                <img className='ofertapp-item-media'
                    src = {data}
                    alt={caption}
                    style={style}
                />
            )
        } else if( contentType === "VIDEO" ) {
            return (
                <video className='ofertapp-item-media'
                    controls
                    src = {data}
                    style={style}
                />
            )
        } else if( contentType === "DOCUMENT" ){
            return (
                <Document file = {data} style={style}>
                    <Page pageNumber = {1} />
                </Document>
            )
        }
    }

    render() {
        return (
            <div 
                className = "row text-center ofertapp-media"
            >
                { this.renderFile() }
            </div>
        )
    }
}

export default ShowFile;