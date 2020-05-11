import React from "react";
import SessionService from "../../../service/SessionService";


export const QuoteTools = ({ quoteId, user }) => {

  if(user !== SessionService.getUsername()){
    return null;
  }

  return (
    <div className="toolbox text-right mb-1">
      <div className="btn-group" role="group">
        <span className="btn btn-outline-warning" title="Upravit"><i className="fas fa-pencil-alt"></i></span>
        <span className="btn btn-outline-danger" title="Odstranit"><i className="fas fa-trash-alt"></i></span>
      </div>
    </div>
  )
}