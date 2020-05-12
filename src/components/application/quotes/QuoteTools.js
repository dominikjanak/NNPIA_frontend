import React from "react";
import SessionService from "../../../service/SessionService";


export class QuoteTools extends React.Component {

  render() {
    if(this.props.user !== SessionService.getUsername()){
      return null;
    }
    return (
      <div className="toolbox float-right text-right mb-1">
        <div className="btn-group" role="group">
          <span className="btn btn-outline-warning" title="Upravit"><i className="fas fa-pencil-alt"></i></span>
          <span className="btn btn-outline-danger" title="Odstranit" onClick={() => this.props.remove(this.props.quoteId)}><i className="fas fa-trash-alt"></i></span>
        </div>
      </div>
    )
  }

  deleteHandle(){

  }
}