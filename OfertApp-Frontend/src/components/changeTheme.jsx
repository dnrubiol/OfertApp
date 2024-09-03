import { Component } from "react";
import chageTheme from "./../images/changeTheme.png";

class ChangeTheme extends Component {

    state = {
        currentTheme: "light"
    }

    componentDidUpdate(prevProps) {
        if (prevProps.theme !== this.props.theme) {
            const theme = this.props.theme;
            this.setState({ currentTheme: theme });
        }
    }

    async componentDidMount() {
        const theme = this.props.theme;
        this.setState({ currentTheme: theme });
    }

    updateTheme() {
        const theme = this.state.currentTheme === "light" ? "dark" : "light";
        this.setState({ currentTheme: theme });
        this.props.updateTheme(theme);
    }

    render() {
        return (
        <div className = "text-center">
            <img src={chageTheme} 
                alt="OfertApp ChangeTheme" onClick={() => { this.updateTheme() }} 
                style={{
                    "cursor": "pointer",
                    "width": "40px",
                    "height": "40px !important",
                    "margin": "auto",
                    "marginTop": "60%",
                }}
            />
        </div>
        );
    }
}

export default ChangeTheme;