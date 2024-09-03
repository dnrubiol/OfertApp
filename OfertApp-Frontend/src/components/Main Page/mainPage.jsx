import { Component } from "react";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import withRouter from "../../services/withRouter";
import NumberBox from "../common/numberBox";
import { paginate } from "../../utils/paginate";
import { getPublications } from "../../services/publicationService";
import PublicationListView from "./publicationListView";
import PriceRangeFilter from "./priceRangeFilter";
import ComboBox from "../common/comboBox";
import CheckBox from "../common/checkBox";
import CustomButton from "../common/Button/button";
import "./../common/Button/button.css";
import { parseJwt } from "../../utils/parseJWT";

const defaultLimit = 10;

class MainPage extends Component {

  orderbyFields = [
    {
      name: "relevance",
      label: "Relevancia"
    },
    {
      name: "price",
      label: "Precio"
    },
    {
      name: "offers",
      label: "N° Ofertas"
    },
    {
      name: "comments",
      label: "N° Comentarios"
    },
  ]

  state = {
    data : {
      titleQuery : "",
      minPriceFilter : 0,
      maxPriceFilter : Number.MAX_VALUE,
      orderBy : "relevance",
      limit: defaultLimit,
      available: true,
      user : ""
    },
    publications: [],
    currentPage: 1,
    pageSize: 5
  };

  async componentDidMount() {
    // Have on mind that this method is not called on path change
    // in our case, we care about props changes only

    // Check if user is viewing his own publications only
    if( this.props.userPublications === "true" ){
      const token = localStorage.getItem("token");
      if( token ){
        try{
          const payload = parseJwt(token);

          // Set user to filter ID
          let data = this.state.data;
          data.user = payload.user_id;
          this.setState({ data: data });
        } catch(e) {
          console.log("Error: ", e);
          this.props.navigate("/login");
          return;
        }
      } else {
        this.props.navigate("/login");
        return;
      }
    }
    await this.handleSubmit();
  }

    componentDidUpdate(prevProps) {
      // Check if user is viewing his own publications only
      if( this.props.userPublications !== prevProps.userPublications ){
        this.componentDidMount(); // Actually component did mount if url changed at this point
      }
    }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      publications,
    } = this.state;
    const paginatedData = paginate(publications, currentPage, pageSize);
    return { totalCount: publications.length, data: paginatedData };
  }

  handleSubmit = async () => {
    const { titleQuery, minPriceFilter, maxPriceFilter, available, orderBy, limit, user } = this.state.data;
    const requestParams = {};

    // Filter by title (LIKE operator in sql databases)
    if (titleQuery && titleQuery.trim() !== "") {
      requestParams["title"] = titleQuery;
    }

    // Set availability only param
    if( available ){
      requestParams["available"] = available;
    }
      
    // Set price range
    requestParams["minPrice"] = minPriceFilter;
    requestParams["maxPrice"] = maxPriceFilter;

    // Set order by
    requestParams["orderBy"] = orderBy;

    
    // Set limit
    if( limit && limit > 0){
      requestParams["limit"] = limit;
    }

    // Set filtered user (First approach will consider only current user's publications)
    if (user && this.props.userPublications === "true" && user.toString().trim() !== "") {
      requestParams["user"] = user;
    }

    // Send request
    try {
      const { data:response } = await getPublications(requestParams);
      const { data, status } = response;
      if( status === "success" ){
        this.setState({ 
          publications: data
        });
        return;
      } else {
        this.setState({ 
          publications: []
        });
      }

    } catch (e) {
      console.log("Error: ", e);
      this.setState({
        publications: []
      });
    }
  }

  handleTitleChange = (value) => {
    this.setState({ data: {...this.state.data, titleQuery: value} });
  };

  handleMinPriceChange = (value) => {
    this.setState({ data: {...this.state.data, minPriceFilter: value} });
  };

  handleMaxPriceChange = (value) => {
    this.setState({ data: {...this.state.data, maxPriceFilter: value} });
  };

  handleLimitChange = (value) => {
    this.setState({ data: {...this.state.data, limit: value} });
  }

  handleAvailableChange = (value) => {
    this.setState({ data: {...this.state.data, available: value} });
  }

  handleOrderByChange = (value) => {
    this.setState({ data: {...this.state.data, orderBy: value }});
  }

  resetFilters = () => {
    this.setState({
      data : {
        ...this.state.data,
        titleQuery : "",
        minPriceFilter : 0,
        maxPriceFilter : Number.MAX_VALUE,
        orderBy : "relevance",
        limit: defaultLimit,
        available: true,
      }
    });
  }

  render() {
    const {
      pageSize,
      currentPage,
    } = this.state;

    const { 
      minPriceFilter, maxPriceFilter, available,
      orderBy, limit, titleQuery
    } = this.state.data;

    const { totalCount, data: publications } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-3 ofertapp-page-title">
            {this.props.userPublications === "true" ? "Mis publicaciones" : "Publicaciones"}
          </h1>
        </div>
        <div className="col-12 col-sm-3 text-center">
          <div className="ofertapp-pub-filter-divider">
            <SearchBox 
              label = "Contiene en su titulo" onChange={this.handleTitleChange}
              value={titleQuery}
              info={"OPCIONAL: Filtra las publicaciones por su título, buscaremos todos los" + 
                " títulos que contengan la cadena de texto ingresada en cualquier parte"}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <PriceRangeFilter
              valueMin={0}
              values={[minPriceFilter, maxPriceFilter]}
              valueMax={Number.MAX_VALUE}
              onChangeMin={this.handleMinPriceChange}
              onChangeMax={this.handleMaxPriceChange}
              info={"OPCIONAL: Filtra las publicaciones por su precio, buscaremos todas las" +
                " publicaciones que tengan un precio entre los valores ingresados"}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <CheckBox name="available" label="Solo publicaciones disponibles" 
              onChange={this.handleAvailableChange}
              value={available}
              info={"OPCIONAL: Filtra las publicaciones por su disponibilidad, buscaremos todas las" + 
                " publicaciones en las que puedas ofertar"}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <ComboBox name="orderby" label="Ordenar por" options={this.orderbyFields} 
              onChange={this.handleOrderByChange} 
              currentValue={orderBy}
              info={"OPCIONAL: Ordena las publicaciones por el campo seleccionado"}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <NumberBox 
              value={defaultLimit} label = "Límite de publicaciones" 
              onChange={this.handleLimitChange}
              currentValue={limit}
              info={"OPCIONAL: Limita la cantidad de publicaciones a mostrar"}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <CustomButton caption="Filtrar" type="primary" onClick={() => {
                this.handleSubmit()
              }} 
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <CustomButton caption="Reiniciar" type="primary" onClick={() => {
                this.resetFilters()
              }} 
            />
          </div>
        </div>
        <div className="col-12 col-sm-9">
          {publications.map((publication) => (
            <PublicationListView
              key={publication.id}
              publication={publication}
            />
          ))}

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>

    );
  }
}

export default withRouter(MainPage);