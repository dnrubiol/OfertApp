import Joi from "joi-browser";
import withRouter from "../../../services/withRouter";
import Form from "../../common/form";
import { createPublication, getCategories } from "../../../services/publicationService";
import { toast } from "react-toastify";
import ComboBox from "../../common/comboBox";
import CheckBox from "../../common/checkBox";
import SupportsUploadCarousel from "./supportsUploadCarousel";
import Info from "../../common/info";

import "./../publicationView.css";

class CreatePublicationForm extends Form {
  state = {
    data: {
      title: "",
      category: "",
      productDescription: "",
      startingPrice: "",
      auctionDuration: "",
      evidenceFiles: {},
      evidenceDescriptions: {},
      boostProduct: false,
    },
    errors: {},
    categories: [],
    defaultAuctionDuration: ""
  };

  async componentDidMount() {
    const { data: requestData } = await getCategories();
    const { status, data } = requestData;
    if( status === "success" ){

      // Gen default value for auction duration
      const dateDuration = new Date( Date.now() + 1000 * 60 * 60 * 24 ); // One day
      const defaultAuctionDuration = dateDuration.toISOString().split("T")[0];

      this.setState({
          data : {
            ...this.state.data,
            category: data[0] ? data[0].id : "",
            auctionDuration: defaultAuctionDuration
          },
         categories: data,
          defaultAuctionDuration
        });
    }
  }

  schema = {
    title: Joi.string().required().label("Título"),
    category: Joi.string().required().label("Categoría"),
    productDescription: Joi.string()
      .required()
      .label("Descripción del producto"),
    startingPrice: Joi.number().required().label("Precio inicial").greater(0),
    auctionDuration: Joi.date().label("Tiempo de subasta").greater("now"),
    evidenceFiles: Joi.object().pattern(
      /.*/, Joi.required() 
    ).required().label("Evidencia").min(1),
    evidenceDescriptions: Joi.object().pattern(
      /.*/, Joi.string().required().allow("")
    ).required().label("Descripción de la evidencia"),
    boostProduct: Joi.boolean().label("Boosteable"),
  };

  genServiceData = ( userIsVIP ) => {
    const { 
      productDescription, startingPrice, evidenceFiles, evidenceDescriptions,
      category, auctionDuration, boostProduct, title
     } = this.state.data;

    // Find category ID
    const categoryId = category

    // Generate form data info
    const formData = new FormData();

    // Modify name fields that already exist to make them match with what the backend expects
    formData.append("title", title);
    formData.append("description", productDescription);
    formData.append("minOffer", startingPrice);
    formData.append("category", categoryId);

    for( const id in evidenceFiles ){
      const file = evidenceFiles[ id ];
      const description = evidenceDescriptions[ id ];

      // Check if file is empty
      if( file !== null )
        formData.append("supportsFiles", file);

      // Descriptions are not mandatory actually
      if( description != null && description !== "" )
        formData.append("supportsDescriptions", description);
      else
        formData.append("supportsDescriptions", "");
    }

    if( auctionDuration !== "" && userIsVIP ){
      // User can chage endDate only if he is VIP
      formData.append("endDate", new Date(auctionDuration).toISOString());
    }

    if( boostProduct && userIsVIP ){
      // Double checking that user is not trying to cheat :D
      formData.append("priority", true);
    }

    return formData;
  };

  doSubmit = async ( isVIP ) => {
    const publicationData = this.genServiceData( isVIP );
    try {
      const { data: result } = await createPublication(publicationData);
      const { status, error, data } = result;
      if (status === "success") {
        toast.success("Publicación realizada con éxito");
        this.props.navigate("/publication/" + data.id );
      } else {
        this.setState({
          serverErrors : error
        });
        toast.error("No se pudo crear la publicación");
      }
    } catch (ex) {
      toast.error("No se pudo realizar la publicación");
    }
  };

  handleSubmit = (e, isVIP) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    toast.error(errors);
    if (errors) return;
    this.doSubmit( isVIP );
  };

  handleEvidenceFileSelection = (id, file) => {
    const { data } = this.state;
    data.evidenceFiles[ id ] = file;

    if( file === null )
      delete data.evidenceFiles[ id ];

    this.setState({ data });
  };

  handleEvidenceDescriptionChange = (id, description) => {
    const { data } = this.state;
    data.evidenceDescriptions[ id ] = description;

    if( description === null)
      delete data.evidenceDescriptions[ id ];
    
    this.setState({ data });
  };

  handleBoosteableChange = (checked) => {
    const { data } = this.state;
    data["boostProduct"] = checked;
    this.setState({ data });
  };

  handleCategorySelection = (category) => {
    const { data } = this.state;
    data["category"] = category;
    this.setState({ data });
  };

  render() {
    const { userData } = this.props;
    const { categories, defaultAuctionDuration } = this.state;

    // Check if user has VIP State
    // Don't worry, backend will verify this as well
    let isVIP = false, vipPubCount = 0;
    if (userData) {
      isVIP = userData.vipState;
      vipPubCount = userData.vipPubCount;
    }

    // Check if this publication can be boosteable
    const pubIsBoosteable = isVIP && vipPubCount > 0;

    return (
      <div>
        <h1 className = "ofertapp-page-title">
          Publica un producto
        </h1>
        <form onSubmit={ (e) => {this.handleSubmit( e, isVIP )} } className="row text-center">
          <div className="col-12 col-md-6 ofertapp-creation-column">
            <h1 className = "ofertapp-inspirational-message">
              ¡Ponle un título a tu publicación!
            </h1>
            {this.renderInput(
              "title", "Recuerda ser claro, será lo primero que vean tus posibles compradores",
              "text", false, "", "",
              "OBLIGATORIO: Éste título aparecerá en la mayoría de las listas donde tu publicación aparecerá"
            )}
            <div className="ofertapp-div-hline"></div>
            
            <h1 className = "ofertapp-inspirational-message">
              ¿Qué vas a publicar?
            </h1>
            {
              <ComboBox
                name="category"
                label="De qué categoría es el producto que quieres vender"
                value = {categories.length > 0 ? categories[0].name : ""}
                options={ (() => {
                  return categories.map((category) => {
                    return {
                      name: category.id,
                      label: category.name,
                    };
                  });
                })() }
                onChange={ this.handleCategorySelection }
                info = {
                  "OBLIGATORIO: Las categorías son definidas por nosotros y permiten " +
                  "ordenar los productos de una mejor manera"
                }
              />
            }
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              Describe tu producto
            </h1>
            {this.renderInput("productDescription",
              "Extiéndete todo lo que necesites, proporciona " + 
              "todos los detalles relevantes que sea necesario conocer",
              "textarea", false, "", "", 
              "OBLIGATORIO: Los usaurios podrán ver ésta información antes de ofertar"
              )}
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              ¿Cuál debe ser el precio mínimo de oferta?
            </h1>
            {this.renderInput("startingPrice", 
              "Recuerda que éste debería ser el valor mínimo que, consideras, vale tu producto (COP $)", 
              "number", false, "", "",
              "OBLIGATORIO: Venderás tu producto a un precio mayor, recuerda que descontaremos el" +
              " 10% de comisión por venta"
            )}
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              Tiempo de subasta
            </h1>
            {this.renderInput(
              "auctionDuration",
              "Si eres usuario VIP, puedes cambiar éste tiempo", "date",
              !isVIP, "", defaultAuctionDuration,
              "OBLIGATORIO: Si eres usuario VIP podrás cambiar éste tiempo! "
            )}
            <div className="ofertapp-div-hline"></div>
            
          </div>
          <div className="col-12 col-md-6 ofertapp-creation-column">

            <h1 className = "ofertapp-inspirational-message">
              Publica algunas evidencias que certifiquen la calidad de tu producto
              <p><Info text={
                "OBLIGATORIO: Publica al menos un soporte para tu producto, es importante " +
                "para nosotros que tus posibles compradores tengan confianza en tu producto"
              } 
              /></p>
              <p className="text-muted" style={{
                fontSize: "12px"
              }}>
              Recuerda que si no adjuntas un archivo junto a una descripción ésta simpelemente
              será ignorada y no aparecerá en tu soporte final
              </p>
              
            </h1>
            
            <div className="ofertapp-div-hline"></div>
            <SupportsUploadCarousel 
              onDescriptionChange = {this.handleEvidenceDescriptionChange}
              onEvidenceFileChange = {this.handleEvidenceFileSelection}
            />
            <div className="ofertapp-div-hline"></div>
            <h1 className = "ofertapp-inspirational-message">
              ¡Recuerda verificarlo todo antes de enviar!
            </h1>
            
            {pubIsBoosteable && 
              <div>
                <div className="ofertapp-div-hline"></div>
                <CheckBox
                  name = "boostProduct"
                  label = "¿Quieres que tu publicación sea boosteada?"
                  onChange = {this.handleBoosteableChange}
                />
                <div className="ofertapp-div-hline"></div>
              </div>
            }
            {
              this.renderButton("Publicalo!")
            }
            {
              this.generateErrorsDiv()
            }
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePublicationForm);
