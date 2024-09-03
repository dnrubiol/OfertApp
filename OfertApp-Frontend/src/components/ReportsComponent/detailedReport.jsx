import { Component } from "react";
import withRouter from "../../services/withRouter";
import { getReportSupports, postReportSupport } from "../../services/reportService";
import ReportSupport from "./ReportSupport";
import { toast } from "react-toastify";
import { getDatetimeFormatted } from "../../utils/getTime";
import AddSupportDialog from "./addSupportDialog";
import UpdateReportStatusForm from "./../Admins/updateReport";
import UserLink from "../common/UserLink/userLink";

class DetailedReport extends Component {

  state = { 
    supports: [],
    report : null,
    reportId: this.props.params.id
  };

  async componentDidMount() {
    try {
      const { data: response } = await getReportSupports(
        this.props.params.id
      );
      const { status, data } = response;
      if (status === "success") {
        this.setState({ 
          supports: data["supports"],
          report: data["report"]
        });
      } else {
        toast.error("Failed to fetch supports");
      }
    } catch (error) {
      toast.error("Failed to fetch supports:", error);
    }
  }

  async handleSubmit( data, body ) {  
    const formData = new FormData();
    formData.append("data", data);
    formData.append("body", body);
    formData.append("type", "IMAGE");
    
    const id = this.state.reportId;

    try{
      const { data: result } = await postReportSupport(formData, id);
      const { status, data, error } = result;
      if (status === "success") {
        
        const supportData = {
          ...data,
          // We know its myself who did add the support
          user: this.props.userData,
        }

        this.setState({
          supports: [...this.state.supports, supportData],
        });

        toast.success("Soporte agregado");

      } else {
        toast.error("Error al agregar soporte " + 
          (error ? JSON.stringify(error) : "")
        );
      }
      
    } catch (error) {
      toast.error("Error al agregar soporte " + error);
    }
  }

  render() {
    const { userData } = this.props;
    const { supports, report } = this.state;
    const isAdmin = userData != null && userData.isAdmin;
    return (
      report ?
        <div className="row text-center">
          <button
            type="button"
            className="btn ofertapp-button-primary mb-2"
            data-toggle="modal"
            data-target= { !isAdmin ? "#modalAddSupport" : "#modalUpdateReport" }
          >
            { ! isAdmin ? "Agregar Soporte" : "Actualizar estado de reporte" }
          </button>
          <AddSupportDialog onSubmit = { (data, body) => this.handleSubmit(
            data, body
          ) }/>
          <UpdateReportStatusForm 
            report = {report}
            onSuccess = { () => toast.success("Reporte actualizado") }
            onError = { (error) => toast.error("Error al actualizar reporte " + error) }
          />
          <div className = "row mb-3">
            <div className = "col-12">
              <h5>
                Detalles del reporte con ID: <br/> {this.props.params.id}
              </h5>
            </div>
            <div className = "col-12 col-md-4">
              <h5>Hecho por:</h5>
              <UserLink
                fontSize="24"
                user={ report.user }
              />
            </div>
            <div className = "col-12 col-md-4">
              <h5>Hacia:</h5>
              <UserLink
                fontSize="24"
                user={ report.publication.user }
              />
            </div>
            <div className = "col-12 col-md-4">
              <h5>En:</h5>
              <h5>
                {getDatetimeFormatted(
                  report.createdAt
                )}
              </h5>
            </div>
          </div>
          <h5 className="mb-3">
            Soportes:
          </h5>
          {
            supports.length > 0 ?
              <div className="row">
                {
                  supports.map((support) => (
                    <ReportSupport 
                      key={support.id}
                      support={support} 
                    />    
                  ))
                }
              </div>
            : <p>No hay soportes para este reporte</p>
            }
        </div>
        :
        <div className="row text-center">
          <h3
            className="mb-3"
          >
            {"Cargando"}
          </h3>
        </div>

    );
  }
}

export default withRouter(DetailedReport);
