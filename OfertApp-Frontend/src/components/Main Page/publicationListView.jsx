import { getAnyTimePassed } from "./../../utils/getTime";
import withRouter from "../../services/withRouter";
import UserLink from "./../common/UserLink/userLink";
import ShowFile from "../common/ShowFile/showFile";
import "./mainPage.css";

function PublicationListView({ publication }) {
  const { id, title, currentPrice, supports, endDate, user } = publication;
  return (
    <div
      key={id}
      className="card ofertapp-publication-card"
      onClick={() => (window.location.href = "/publication/" + id)}
    >
      <div className="card-header">
        <div className="row">
          <div className="col-12 col-sm-3" style={{ textAlign: "right" }}>
            Por:
          </div>
          <div className="col-12 col-sm-9">
            <UserLink base fontSize="16" fontColor="#fff" user={user} />
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-4 ofertapp-pub-card-support">
            <ShowFile
              caption = {"Publication Support"}
              data = {(supports && supports.length > 0) ? 
                supports[0].data : "https://cdn.filestackcontent.com/pLDF5BZTP6ASwiobbC8W" }
              contentType = {(supports && supports.length > 0) ? 
                supports[0].type : "IMAGE" }
              width = "100%"
            />
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 ofertapp-pub-card-info-title">{title}</div>
              <div className="col-12 col-sm-6 ofertapp-pub-card-info">
                Precio actual: COP ${" "}
                {currentPrice
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="col-12 col-sm-6 ofertapp-pub-card-info">
                {getAnyTimePassed(endDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PublicationListView);
