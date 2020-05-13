import React from "react";
import SessionService from "../../../service/SessionService";
import {Link} from "react-router-dom";


export class QuoteTools extends React.Component {

  render() {
    if(this.props.user !== SessionService.getUsername()){
      return null;
    }
    return (
      <div className="toolbox float-right text-right mb-1">
        <div className="btn-group" role="group">
          <Link className="btn btn-outline-warning" title="Upravit" to={"/app/quote/edit/"+this.props.quoteId}><i className="fas fa-pencil-alt"/></Link>
          <span className="btn btn-outline-danger" title="Odstranit" onClick={() => this.props.removeHandler(this.props.quoteId)}><i className="fas fa-trash-alt"/></span>
        </div>
      </div>
    )
  }

  deleteHandle(){

  }
}