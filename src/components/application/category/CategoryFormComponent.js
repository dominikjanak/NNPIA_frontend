import * as React from 'react';
import ApplicationLayout from "./../layout/ApplicationLayout";
import PopupMessagesService from "../../../service/PopupMessagesService";
import CategoryService from "../../../service/CategoryService";
import {withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";

class CategoryFormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.match.params.id,
      name: ""
    }

    this.handleAddMore = this.handleAddMore.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    document.title = (this.props.action === "new" ? "Nová kategorie" : "Upravit kateorii") + " | Citáty";
    if(this.props.action === "edit"){
      this.loadCategoryData();
    }
  }

  loadCategoryData(){
    CategoryService.get(this.state.categoryId).then((res)=>{
      if(res.data.status === 200) {
        if(res.data.status_key === "SUCCESS"){
          this.setState({
            name: res.data.result.name
          })
        }else if(res.data.status_key === "NOT-EXISTS"){
          PopupMessagesService.error("Požadovaná kategorie neexistuje!");
        }
      } else {
        PopupMessagesService.error("Nepodařilo se načíst data o kategorii!");
      }
    });
  }

  render() {
        return (
          <ApplicationLayout pageTitle={this.props.pageTitle}>
            <form>
              <div className="d-flex mb-3">
                <Link className="btn btn-outline-danger px-4" to="/app"><i className="fas fa-arrow-left"/> Přejít na výpis</Link>
                <div className="btn-group ml-auto">
                {
                  this.props.action === "new" ?
                  (
                    <React.Fragment>
                        <span className="btn btn-outline-success px-4" onClick={this.handleAddMore}><i className="fas fa-plus"/> Přidat více</span>
                        <span className="btn btn-success px-4" onClick={this.handleAdd}><i className="fas fa-save"/> Přidat</span>
                    </React.Fragment>
                  ):(
                      <span className="btn btn-warning px-4" onClick={this.handleSaveChanges}><i className="fas fa-save"/> Uložit změny</span>
                  )
                }
                  </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputCity">Název kategorie</label>
                  <input type="text" class="form-control"  maxLength="50" name="name" onChange={this.onChange} value={this.state.name} />
                </div>
              </div>
            </form>
          </ApplicationLayout>
        );
  }

  handleSaveChanges = e => {
    if(!this.validateCategoryData()) return;

    CategoryService.update(this.state.categoryId, this.state.name.trim()).then((res) => {
      console.log(res.data);
      if(res.data.status === 200) {
        if(res.data.status_key === "SUCCESS"){
          this.props.history.push("/app/category");
        }
        else{
          PopupMessagesService.warn("Tato kategorie již v databázi je, prosím vložte jinou.");
        }
      }
      else{
        PopupMessagesService.error("Při vkládání kategorie nastala neočekávaná chyba!");
      }
    });
  }

  validateCategoryData(){
    if(this.state.name.length <= 0){
      PopupMessagesService.warn("Zadejte název kategorie!");
      return false;
    }

    if(this.state.name.length > 50){
      PopupMessagesService.warn("Název kategirie můž obsahovat maximálně 50 znaků!");
      return false;
    }

    return true;
  }

  addCategory(redirect){
    if(!this.validateCategoryData()) return;

    CategoryService.add(this.state.name.trim()).then((res) => {
      let clear = true;
      if(res.data.status === 200) {
        console.log(res.data);
        if(res.data.status_key === "SUCCESS"){
          PopupMessagesService.success("Kategorie byla uložena.");
        }
        else{
          PopupMessagesService.warn("Tato kategorie již v databázi je, prosím vložte jinou.");
          clear = false;
        }
      }
      else{
        PopupMessagesService.error("Při ukládání kategorie nastala neočekávaná chyba!");
        clear = false;
      }

      if(redirect){
        this.props.history.push("/app/category");
      }

      if(clear){
        this.setState({name: ""});
      }
    });
  }

  handleAddMore(){
    this.addCategory(false);
  }

  handleAdd(){
    this.addCategory(true);
  }

  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value });
  }
}

export default withRouter(CategoryFormComponent);