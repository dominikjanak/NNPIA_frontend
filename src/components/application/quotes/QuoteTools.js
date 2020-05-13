import React from "react";
import SessionService from "../../../service/SessionService";
import {Link} from "react-router-dom";
import QuoteService from "../../../service/QuoteService";
import PopupMessagesService from "../../../service/PopupMessagesService";

/**
 * Quote author toolbox
 */
export class QuoteTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showState: props.global
    }
  }

  render() {
    if (!this.canShow() && this.state.showState === false) {
      return null;
    }

    return (
      <div className="toolbox float-right text-right mb-1">
        {this.canShow() && (
          <label className="switch danger small round mr-1" title="Veřejně přístupný">
            {React.createElement('input', {
              type: 'checkbox',
              defaultChecked: this.props.global,
              onChange: this.handleQuoteGlobal
            })}
            <div className="slider"/>
          </label>
        )}
        <div className="btn-group" role="group">
          {this.canShow() && (
            <React.Fragment>
              <Link className="btn btn-sm btn-warning" title="Upravit" to={"/app/quote/edit/" + this.props.quoteId}><i
                className="fas fa-pencil-alt"/></Link>
              <span className="btn btn-sm btn-danger" title="Odstranit"
                    onClick={() => this.props.removeHandler(this.props.quoteId)}><i
                className="fas fa-trash-alt"/></span>
            </React.Fragment>
          )}
          {
            this.state.showState ? (
              <Link className="btn btn-sm btn-info" title="Zobrazit vežejně"
                    to={"/show/" + this.props.quoteId}><i className="fas fa-eye"/></Link>
            ) : ("")
          }
        </div>
      </div>
    )
  }

  // can show owner tools
  canShow = () => {
    return this.props.user === SessionService.getUsername()
  }

  // Save quote visibility
  handleQuoteGlobal = (e) => {
    QuoteService.changePublic(this.props.quoteId, e.target.checked).then((res) => {
      if (res.data.status !== 200 || res.data.status_key !== "SUCCESS") {
        PopupMessagesService.error("Změnu nebylo možné uložit!");
      }
    });
    this.setState({showState: e.target.checked})
  }
}