import { Component } from 'react';

class FrequentlyAskedQuestions extends Component {
    render() {
        return (
            <div className = "row general-text">
                <div className = "col-12">
                    <h1 className = "ofertapp-page-title">¿Cómo crear ofertas en OfertApp?</h1>
                    <p>Para crear una oferta en OfertApp, debes seguir los siguientes pasos:</p>
                    <ol>
                        <li>Dirígete a la página de inicio de OfertApp.</li>
                        <li>En la barra de navegación, haz clic en el botón "Iniciar sesión".</li>
                        <li>Ingresa tu correo electrónico y contraseña.</li>
                        <li>Desde la página principal, dirígete a una publicación </li>
                        <li>En la parte inferior de la publicación, haz clic en el botón "Crear Oferta".</li>
                    </ol>
                </div>
                <div className = "col-12">
                    <h1 className = "ofertapp-page-title">¿Cómo crear publicaciones en OfertApp?</h1>
                    <p>Para crear una publicación en OfertApp, debes seguir los siguientes pasos:</p>
                    <ol>
                        <li>Dirígete a la página de inicio de OfertApp.</li>
                        <li>En la barra de navegación, haz clic en el botón "Iniciar sesión".</li>
                        <li>Ingresa tu correo electrónico y contraseña.</li>
                        <li>Desde la página principal, haz clic en el botón "Crear Publicación".</li>
                        <li>Ingresa los datos de la publicación.</li>
                        <li>En la parte inferior de la publicación, haz clic en el botón "Crear Publicación".</li>
                    </ol>
                </div>
                <div className = "col-12">
                    <h1 className = "ofertapp-page-title">¿Cómo crear una cuenta en OfertApp?</h1>
                    <p>Para crear una cuenta en OfertApp, debes seguir los siguientes pasos:</p>
                    <ol>
                        <li>Dirígete a la página de inicio de OfertApp.</li>
                        <li>En la barra de navegación, haz clic en el botón "Iniciar sesión".</li>
                        <li>En la parte inferior del formulario, haz clic en el enlace que indica la creación de una cuenta.</li>
                        <li>Ingresa los datos solicitados.</li>
                        <li>En la parte inferior del formulario, haz clic en el botón "Registrarse".</li>
                    </ol>
                </div>
    
            </div>
        )
    }
}
export default FrequentlyAskedQuestions;