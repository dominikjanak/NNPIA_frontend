import * as React from 'react';
import '../../../styles/category.css';
import ApplicationLayout from "../layout/ApplicationLayout";
import PopupMessagesService from "../../../service/PopupMessagesService";
import Pagination from "react-js-pagination";
import Category from "./Category";
import {Link} from "react-router-dom";
import {OrderComponent} from "../../system/OrderComponent";
import CategoryService from "../../../service/CategoryService";

class CategoryListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  state = {
    page: 1,
    totalPages: 1,
    totalCategories: 0,
    orderBy: 'id',
    order: 'asc',
    categories: [],
    orderOptions: [
      {value: "id", label: "Vložení"},
      {value: "name", label: "Název"}
    ]
  }

  componentDidMount() {
    document.title = "Seznam kategorií | Citáty";
    this.reloadCategoryList();
  }

  reloadCategoryList() {
    CategoryService.fetch(this.state.page-1, this.state.orderBy, this.state.order).then((res) => {
      if(res.data.status === 200) {
        let data = res.data.result;
        this.setState({categories: data.content, totalCategories: data.totalElements, totalPages: data.totalPages })
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
                      <Link className="btn btn-success mr-2" to="/app/category/new"><i className="fas fa-plus"/> Nová kategorie</Link>
                    </div>
                    <OrderComponent handler={this.handleOrderChange} options={this.state.orderOptions} />
                  </div>

                  <table className="table table-striped category-content">
                    <thead>
                    <tr>
                      <th scope="col" style={{width: "50px"}}>#</th>
                      <th scope="col">Název</th>
                      <th scope="col" style={{width: "100px"}}>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.length > 0 ?(
                      this.state.categories.map((item, index) => (
                        <Category data={item} numering={(this.state.page - 1)*25+index + 1} key={item.id} removeHandler={this.handleRemoveAuthor} />
                      ))
                    ): (
                      <tr>
                        <td colSpan="3" className="text-center">To je nemilé, nic zde není!</td>
                      </tr>
                    )}
                    </tbody>
                  </table>

                  <Pagination
                    innerClass="pagination justify-content-end"
                    activePage={this.state.page}
                    itemsCountPerPage={15}
                    totalItemsCount={this.state.totalCategories}
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
    PopupMessagesService.confirm("Opravdu chcete tuto kategorii smazat?").then((res) => {
      if (res.value) {
        CategoryService.delete(id).then((res) => {
          if(res.data.status === 200 && res.data.status_key === "SUCCESS") {
            this.reloadCategoryList();
          }
          else{
            PopupMessagesService.error("Kategorii se nepodařilo odstranit!");
          }
        });
      }
    })
  }

  handlePageChange = (pageNumber) =>
    this.setState({page: pageNumber}, this.reloadCategoryList);

  handleOrderChange = (orderBy, order) =>
    this.setState({orderBy: orderBy, order: order}, this.reloadCategoryList);

}

export default CategoryListComponent;