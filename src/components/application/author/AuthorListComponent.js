import * as React from 'react';
import '../../../styles/app.css';
import ApplicationLayout from "../layout/ApplicationLayout";
import PopupMessagesService from "../../../service/PopupMessagesService";
import AuthorService from "../../../service/AuthorService";
import Pagination from "react-js-pagination";
import Author from "./Author";
import {Link} from "react-router-dom";
import {OrderComponent} from "../../system/OrderComponent";
import QuoteService from "../../../service/QuoteService";

class QuoteListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  state = {
    page: 1,
    totalPages: 1,
    totalAuthors: 0,
    orderBy: 'id',
    order: 'asc',
    authors: [],
    orderOptions: [
      {value: "id", label: "Vložení"},
      {value: "firstname", label: "Jméno autora"},
      {value: "surname", label: "Příjmení autora"},
      {value: "country", label: "Země autora"}
    ]
  }

  componentDidMount() {
    document.title = "Seznam autorů | Citáty";
    this.reloadAuthorList();
  }

  reloadAuthorList() {
    AuthorService.fetch(this.state.page-1, this.state.orderBy, this.state.order).then((res) => {
      if(res.data.status === 200) {
        let data = res.data.result;
        this.setState({authors: data.content, totalAuthors: data.totalElements, totalPages: data.totalPages })
      }
      else{
        PopupMessagesService.error("Data se nepodařilo načíst");
      }
    });
  }


    render() {
        return (
            <React.Fragment>
                <ApplicationLayout pageTitle={this.props.pageTitle}>
                  <div className="mt-3">
                    <div className="btn-group">
                      <Link className="btn btn-success mr-2" to="/app/author/new"><i className="fas fa-plus"/> Nový</Link>
                    </div>
                    <OrderComponent handler={this.handleOrderChange} options={this.state.orderOptions} />
                  </div>

                  <table className="table table-striped author-content">
                    <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Jméno</th>
                      <th scope="col">Příjmení</th>
                      <th scope="col">Země</th>
                      <th scope="col">Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.authors.map((item, index) => (
                      <Author data={item} numering={(this.state.page - 1)*25+index + 1} key={item.id} removeHandler={this.handleRemoveAuthor} />
                    ))}
                    </tbody>
                  </table>

                  <Pagination
                    innerClass="pagination justify-content-end"
                    activePage={this.state.page}
                    itemsCountPerPage={25}
                    totalItemsCount={this.state.totalAuthors}
                    onChange={this.handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                    hideNavigation={true}
                  />
                </ApplicationLayout>
            </React.Fragment>
        );
    }

  handleRemoveAuthor = (id) => {
    PopupMessagesService.confirm("Opravdu chcete tohoto autora smazat?").then((res) => {
      if (res.value) {
        AuthorService.delete(id).then((res) => {
          if(res.data.status === 200 && res.data.status_key === "SUCCESS") {
            this.reloadAuthorList();
          }
          else{
            PopupMessagesService.error("Citát se nepodařilo odstranit!");
          }
        });
      }
    })
  }

  handlePageChange = (pageNumber) =>
    this.setState({page: pageNumber}, this.reloadAuthorList);

  handleOrderChange = (orderBy, order) =>
    this.setState({orderBy: orderBy, order: order}, this.reloadAuthorList);


}

export default QuoteListComponent;