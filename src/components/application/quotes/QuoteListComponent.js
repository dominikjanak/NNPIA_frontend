import * as React from 'react';
import '../../../styles/quotes.css';
import ApplicationLayout from "./../layout/ApplicationLayout";
import QuoteService from "../../../service/QuoteService";
import PopupMessagesService from "../../../service/PopupMessagesService";
import Pagination from "react-js-pagination";
import {OrderComponent} from "../../system/OrderComponent";
import Quote from "./Quote";
import RatingService from "../../../service/RatingService";
import {Link} from "react-router-dom";

class QuoteListComponent extends React.Component {
  constructor() {
    super();
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  state = {
    page: 1,
    totalPages: 1,
    totalQuotes: 0,
    orderBy: 'id',
    order: 'asc',
    quotes: [],
    orderOptions: [
      {value: "id", label: "Vložení"},
      {value: "quote", label: "Citát"},
      {value: "authorFirstname", label: "Jméno autora"},
      {value: "authorSurname", label: "Příjmení autora"},
      {value: "authorCountry", label: "Země autora"},
      {value: "userFirstname", label: "Jméno vkladatele"},
      {value: "userSurname", label: "Příjmení vkladatele"}
    ]
  }

  componentDidMount() {
    document.title = "Seznam citátů | Citáty";
    this.reloadQuoteList();
  }

  reloadQuoteList() {
    QuoteService.fetch(this.state.page-1, this.state.orderBy, this.state.order).then((res) => {
      if(res.data.status === 200) {
        let data = res.data.result;
        this.setState({quotes: data.content, totalQuotes: data.totalElements, totalPages: data.totalPages })
      }
      else{
        PopupMessagesService.error("Data se nepodařilo načíst");
      }
    });
  }

  render() {
        return (
          <ApplicationLayout pageTitle={this.props.pageTitle}>
            <div className="mt-3">
              <div className="btn-group">
                <Link className="btn btn-success mr-2" to="/app/quote/new"><i className="fas fa-plus"/> Nový</Link>
              </div>
              <OrderComponent handler={this.handleOrderChange} options={this.state.orderOptions} />
            </div>


            {this.state.quotes.map((item, index) => (
              <Quote data={item} key={item.id} ratingHandler={this.handleQuoteRating} removeHandler={this.handleDeleteQuote} />
            ))}

            <Pagination
              innerClass="pagination justify-content-end"
              activePage={this.state.page}
              itemsCountPerPage={25}
              totalItemsCount={this.state.totalQuotes}
              onChange={this.handlePageChange.bind(this)}
              itemClass="page-item"
              linkClass="page-link"
              hideNavigation={true}
            />
          </ApplicationLayout>
        );
  }

  handleOrderChange(orderBy, order) {
    this.setState({orderBy: orderBy, order: order}, this.reloadQuoteList);
  }

  handlePageChange(pageNumber) {
    this.setState({page: pageNumber}, this.reloadQuoteList);
  }

  handleQuoteRating(rating, id){
    RatingService.rateQuote(id, rating).then((res) =>{
      if(res.data.status !== 200 || res.data.status_key !== "SUCCESS") {
        PopupMessagesService.error("Hodnocení nebylo možné uložit!");
      }
    });
  }

  handleDeleteQuote(id){
    PopupMessagesService.confirm("Opravdu chcete tento citát smazat?").then((res) => {
      if (res.value) {
        QuoteService.delete(id).then((res) => {
          if(res.data.status === 200 && res.data.status_key === "SUCCESS") {
            this.reloadQuoteList();
          }
          else{
            PopupMessagesService.error("Citát se nepodařilo odstranit!");
          }
        });
      }
    })
  }

}

export default QuoteListComponent;