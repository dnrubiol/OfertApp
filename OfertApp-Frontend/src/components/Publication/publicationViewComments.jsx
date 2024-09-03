import { Component } from "react";
import "./publicationView.css";
import Comment from "../common/Comment/comment";
import CustomButton from "../common/Button/button";
import UserLink from "../common/UserLink/userLink";
import { addComment } from "../../services/publicationService";

class PublicationViewComments extends Component {
  state = {
    replyingTo: null,
    commentTitle: null,
    commentBody: null,
    comments: []
  };

  async componentDidMount() {
    const { publication } = this.props;

    this.setState({
      comments: publication.comments
    });
  }

  handleCommentTitleChange = (event) => {
    this.setState({
      commentTitle: event.target.value 
    });
  };

  handleCommentBodyChange = (event) => {
    this.setState({
      commentBody: event.target.value 
    });
  };

  handleAddComment = async () => {
    const { commentTitle, commentBody, replyingTo } = this.state;
    const comment = {
      title: commentTitle,
      text: commentBody,
    };
    const { publication, userData } = this.props;
    const { data: requestResponse } = await addComment(publication.id,
      replyingTo ? replyingTo.id : null,
      comment
    );

    const {status, data} = requestResponse;
    if( status === "success"){
      const newComment = {
        ...data,
        user : userData,
        reactionsCount : {
          LIKE: 0, DISLIKE: 0, WARNING: 0
        },
        createdAt: new Date().toISOString()
      }
      
      // Add comment to visualization list
      this.setState({
        comments: [
          newComment, ...this.state.comments
        ]
      });
      
    }
    
  };

  render() {
    const loggedIn = this.props.userLoggedIn;   
    const userData = this.props.userData;
    
    return (
      <div className="row align-middle general-text">
        <h3 className="ofertapp-label">Comentarios</h3>
        <div
          className="ofertapp-overflow ofertapp-comments-block"
          style={{ "--height": "480px" }}
        >
          {this.state.comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              onClick={(comment) => {
                // Set replying to content
                this.setState({ replyingTo: comment });
              }}
              userLoggedIn={loggedIn}
              userData={userData}
            />
          ))}
        </div>
        {
          loggedIn && !( userData && userData.isAdmin ) &&
          <div className= "col-12">
            Haz click sobre un comentario para responder.
            <input
              className="form-control mb-3"
              placeholder="Escribe un título para tu comentario"
              type="text"
              onChange={this.handleCommentTitleChange}
            />
            <input
              className="form-control mb-3"
              placeholder="Puedes agregar una descripción si lo deseas"
              type="text"
              onChange={this.handleCommentBodyChange}
            />
            {this.state.replyingTo && (
              <div className="row align-middle">
                <div className="col-12 col-md-6">
                  <p>
                    <strong>- Respondiendo a:</strong>
                  </p>
                </div>
                <div className="col-12 col-md-5">
                  <UserLink
                    user={this.state.replyingTo.user}
                    base={false}
                    fontSize={16}
                  />
                </div>
                <div
                  className="col-12 col-md-1"
                  onClick={() => {
                    this.setState({ replyingTo: null });
                  }}
                >
                  X
                </div>
              </div>
            )}
            <CustomButton
              onClick={() => this.handleAddComment()}
              caption="Crear Comentario"
              type="primary"
            />
          </div>
        }
        
      </div>
    );
  }
}

export default PublicationViewComments;
