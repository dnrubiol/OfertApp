import { Component } from 'react';
import InfoOverlay from './info-overlay';
import { Link } from 'react-router-dom';
import Edgar from './../../images/Edgar.jpg';
import MemberDescription from './member-description';
import "./ofertapp-team.css"

class OfertAppTeam extends Component {
    render() {
        return (
            <div className = "row ofertapp-team-div text-center">
                <div className = "col-12">
                    <h1 className = "ofertapp-title">
                        Hecho con ♥ por el equipo OfertApp
                    </h1>
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Nuestro equipo
                    </h1>
                    <div className="row">
                        <div className = "col-12 col-sm-6">
                            <MemberDescription
                                memberName = "Jose Luis Avila Guzmán"
                                MemberDescription = "Me estoy especializando en el desarrollo frontend, específicamente con la tecnología de React.js. También he trabajado con las tecnologías de HTML, CSS y Javascript para el desarrollo de este proyecto."
                                memberImage = "https://avatars.githubusercontent.com/u/60366097?v=4"
                                memberGithub = "https://github.com/josejose12345"
                            />
                        </div>
                        <div className = "col-12 col-sm-6">
                            <MemberDescription
                                memberName = "Diego Nicolás Rubio Lopez"
                                MemberDescription = {"Como estudiante de ingeniería de sistemas con un enfoque en seguridad de la información, he adquirido experiencia en el desarrollo de proyectos y aplicaciones utilizando lenguajes como Python, C# y Django." +
                                "En el ámbito del desarrollo de proyectos, he trabajado en diversas iniciativas donde he aplicado mis conocimientos en Python y C#. He desarrollado soluciones web, utilizando Python y C# para implementar funcionalidades seguras. Durante este proceso, he trabajado con frameworks y bibliotecas relevantes, aprovechando las capacidades de Python y C# para crear soluciones eficientes y escalables." +
                                "Además, he utilizado Django, un framework de desarrollo web en Python, para crear aplicaciones. He desarrollado sistemas que manejan y protegen información sensible, implementando prácticas de seguridad recomendadas, como autenticación de usuarios, control de acceso y cifrado de datos. Asimismo, he trabajado en la integración de API's y bases de datos, garantizando la seguridad y confidencialidad de los datos de los usuarios." +
                                "Mi experiencia en el desarrollo de proyectos y aplicaciones en estos lenguajes me ha permitido adquirir habilidades en el diseño, implementación y mantenimiento de soluciones de software seguras. Estoy motivado por seguir aprendiendo y mejorando mis habilidades en seguridad de la información, con el objetivo de contribuir de manera efectiva a la protección de datos y sistemas en el ámbito de la ingeniería de sistemas."}
                                memberImage = "https://avatars.githubusercontent.com/u/38673923?v=4"
                                memberGithub = "https://github.com/dnrubiol"
                            />
                        </div>
                        <div className = "col-12 col-sm-6">
                            <MemberDescription
                                memberName = "Daniel Echeverri Jimenez"
                                MemberDescription = {"Estudiante de ingenieria de sistemas, busco especializarme en frontend. Tengo experiencia en html, css, bootstrap, javascript y React"}
                                memberImage = "https://avatars.githubusercontent.com/u/72324267?v=4"
                                memberGithub = "https://github.com/decheverriunal"
                            />
                        </div>
                        <div className = "col-12 col-sm-6">
                            <MemberDescription
                                memberName = "Edgar Daniel González Díaz"
                                MemberDescription = {"Me apasiona el desarrollo Backend, así como el diseño e implementación de modelos de inteligencia artificial bajo múltiples contextos. " +
                                    "Me llama la atención además la programación en lenguajes de bajo nivel como C++ dado que considero que ofrecen una visión más amplia sobre el funcionamiento real de operaciones en máquina. "
                                }
                                memberImage = { Edgar }
                                memberGithub = "https://github.com/edgardanielgd"
                            />
                        </div>
                    </div>
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Sobre nosotros
                    </h1>
                        <InfoOverlay
                            source={"Nuestra Misión"}
                            target={
                                "Facilitar y flexibilizar la venta y compra de bienes muebles, " +
                                "nuevos y usados, entre los vendedores y los consumidores residentes en Colombia."}
                        />
                        <InfoOverlay
                            source={"Nuestra Visión"}
                            target={
                                "Desarrollar una plataforma web de comercio electrónico innovadora " + 
                                "y confiable reconocida a nivel Nacional, donde los emprendedores subasten " + 
                                "sus productos y los consumidores puedan ofertar por los de su interés."}
                        />
                        <InfoOverlay
                            source={"Principios y valores"}
                            target={
                                "Confiablidad - " + 
                                "Transparencia - " + 
                                "Soporte al cliente"}
                        />
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Mantente al tanto
                    </h1>
                    <div>
                        <img
                            className = "ofertapp-img"
                            src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt = "OfertApp"
                            style = {{
                                width: "30px", height: "30px", borderRadius: "50%"
                            }}
                        /> &nbsp;    
                        <Link 
                            to = "https://github.com/OfertAp-UNAL/OfertApp-Frontend"
                        >
                            Síguenos en GitHub    
                        </Link> <br/>
                        📜
                        <a target="_blank" href="[OfertApp] Políticas.pdf">
                            Nuestras Políticas
                        </a>
                        <br/><br/>
                        2023 © OfertApp
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default OfertAppTeam;