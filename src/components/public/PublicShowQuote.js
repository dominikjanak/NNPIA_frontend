import React from "react";
import "../../styles/public-quote.css"
import StarRatings from "react-star-ratings";
import {withRouter} from "react-router-dom";
import QuoteService from "../../service/QuoteService";
import PopupMessagesService from "../../service/PopupMessagesService";

/**
 * Public quote presenter
 */
class PublicShowQuote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quiteId: props.match.params.id
    }
  }

  componentDidMount() {
    document.title = "Veřejný citát | Citáty";
    this.initQuoteData();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.quote != null && (
          <div className="public-quote my-5">

            <div className="row">
              <div className="col-12 quote text-center">&bdquo;{this.state.quote.quote}&ldquo;</div>
            </div>

            <div className="row mt-4 my-4">
              <div
                className="col-12 author text-right">{`${this.state.quote.author.firstname} ${this.state.quote.author.surname} (${this.state.quote.author.country})`}</div>
            </div>

            <div className="row mt-2">
              <div className="col-md-7 pr-3">
                {this.state.quote.categories.map((item, index) => (
                  <span className="badge badge-secondary" key={item.id}>{item.name}</span>
                ))}
              </div>
              <div className="col-md-5 text-right">
                <StarRatings
                  rating={this.state.quote.score}
                  starRatedColor="#ffc845"
                  starEmptyColor="#ccc"
                  numberOfStars={10}
                  starDimension="28px"
                  starSpacing="0px"
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  initQuoteData = () => {
    QuoteService.getPublic(this.state.quiteId).then((res) => {
      if (res.data.status === 200) {
        if (res.data.status_key === "SUCCESS") {

          console.log(res.data.result);
          this.setState({
            quote: res.data.result
          })
        } else if (res.data.status_key === "NOT-EXISTS") {
          PopupMessagesService.error("Požadovaný citát neexistuje!");
        }
      } else {
        PopupMessagesService.error("Nepodařilo se načíst data citátu!");
      }
    });

  }
}

export default withRouter(PublicShowQuote);