import * as React from 'react';
import './quotes.css';
import ApplicationLayout from "./../layout/ApplicationLayout";
import QuoteService from "../../../service/QuoteService";
import PopupMessagesService from "../../../service/PopupMessagesService";
import {Quote} from "./Quote";
import SessionService from "../../../service/SessionService";

class QuotesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: []

    }
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
    QuoteService.fetchQuotes().then((res) => {
      if(res.data.status === 200) {
        this.setState({quotes: res.data.result.content})
      }
      else{
        PopupMessagesService.error("Data se nepodařilo načíst");
      }
      });
  }

  render() {
        return (
          <ApplicationLayout pageTitle={this.props.pageTitle}>
            {this.state.quotes.map((item, index) => (
              <Quote data={item} key={index} />
            ))}
          </ApplicationLayout>
        );
    }

}

export default QuotesComponent;