import * as React from 'react';
import '../../../styles/quotes.css';
import ApplicationLayout from "./../layout/ApplicationLayout";
import QuoteService from "../../../service/QuoteService";
import PopupMessagesService from "../../../service/PopupMessagesService";
import {Quote} from "./Quote";
import Pagination from "react-js-pagination";
import {OrderFlter} from "./OrderFlter";

class QuotesComponent extends React.Component {
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
  }

  componentDidMount() {
    this.reloadQuoteList();
  }

  reloadQuoteList() {
    QuoteService.fetchQuotes(this.state.page-1, this.state.orderBy, this.state.order).then((res) => {
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
            <OrderFlter handler={this.handleOrderChange}/>

            {this.state.quotes.map((item, index) => (
              <Quote data={item} key={index} totalCount={this.props.totalRecipes} remove={this.handleDeleteQuote} />
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

  handleDeleteQuote(id){
    PopupMessagesService.confirm("Opravdu chcete tento citát smazat?", (value) => {
      if(value){
        QuoteService.delete(id).then((res) => {
          if(res.data.status === 200 && res.data.status_key === "SUCCESS") {
            this.reloadQuoteList();
          }
          else{
            PopupMessagesService.error("Citát se nepodařilo odstranit!");
          }
        });
      }
    });
  }

}

export default QuotesComponent;