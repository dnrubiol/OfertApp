import withRouter from "../../services/withRouter";
import { Component } from "react";
import { getReports } from "../../services/reportService";
import Pagination from "./../common/pagination";
import { paginate } from "../../utils/paginate";
import { toast } from "react-toastify";

import Report from "./Report";

const pageSize = 10;

class UserReportsHistory extends Component {
  state = {
    rawReports: [], // All reports
    reports: [], // Reports to display
    currentPage: 1,
  };

  async componentDidMount() {
    try {
      const { data: response } = await getReports();
      const { status, data } = response;
      if (status === "success") {

        const reportsToShow = paginate(
          data, this.state.currentPage, pageSize
          );
        
        this.setState({ 
          rawReports: data,
          reports: reportsToShow,
        });

      } else {
        toast.error("Failed to fetch reports");
      }
      
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  }

  handlePageChange = page => {
    this.setState({ 
        currentPage: page,
        reports: paginate( this.state.rawReports, page, pageSize )
    });
  }

  render() {
    return (
      <div className="w-100">
        <h1 className = "ofertapp-page-title">
            Mis Reportes
        </h1>
        {
          this.state.reports.length > 0 ?
            <div>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th className="ofertapp-table-header">Id del reporte</th>
                    <th className="ofertapp-table-header">Usuario que reporta</th>
                    <th className="ofertapp-table-header">Tipo de reporte</th>
                    <th className="ofertapp-table-header">Cuerpo del reporte</th>
                    <th className="ofertapp-table-header">Soportes</th>
                    <th className="ofertapp-table-header"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.reports.map((report) => (
                    <Report
                      key={report.id}
                      report={report}
                      navigate={this.props.navigate}
                      userData={this.props.userData}
                    />
                  ))}
                </tbody>
              </table>
            
              <Pagination
                itemsCount={this.state.rawReports.length}
                pageSize={pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          :
            <div>
              <h2 className="general-text">
                No hay reportes
              </h2>
            </div>
        }
        
      </div>
    );
  }
}

export default withRouter(UserReportsHistory);
