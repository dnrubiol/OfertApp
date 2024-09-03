import Form from "../form";
import Joi from "joi-browser";
import withRouter from "../../../services/withRouter";
import { addOffer } from "../../../services/offerService";
import { toast } from "react-toastify";
import DisplayErrors from "../Errors/displayErrors";
import "../../../App.css";
import "./offer.css";

class OfferForm extends Form {
  state = {
    data: {
      amount: 0
    },
    errors: {},
    serverErrors: {},
  };

  schema = {
    amount: Joi.number().required().label("Cantidad a ofertar"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    const { publication } = this.props;

    const { data: info } = await addOffer(publication.id, data);
    const { status, error } = info;
    if (status === "success") {
        toast.success(
            "Oferta realizada"
        );

        // Call callback for adding offer into offers view
        const { OnOfferAdd } = this.props;
        OnOfferAdd( info.data );
    }else {
        this.setState({
            serverErrors : error
        })
    }

    // Finally close openned modal
    // Note: This is not the React way
    const modal = document.getElementById("modalOferta");
    modal.setAttribute("aria-hidden", "true")
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
        <div>
            <form onSubmit={this.handleSubmit} id="offer-form" className="h-100">
                <div className="row">
                    {this.renderInput("amount","Cantidad a ofertar")}
                </div>
                <div className="row align-right pt-3">
                    <button
                        type="button"
                        className="btn ofertapp-button-primary"
                        data-toggle="modal"
                        disabled={this.validate() !== null}
                        onClick = {(e) => {
                          this.handleSubmit(e);
                        }}
                    >
                        Postular Oferta
                    </button>
                </div>
            </form>
            <DisplayErrors errors={this.state.serverErrors} />
        </div>
    );
  }
}

export default withRouter(OfferForm);