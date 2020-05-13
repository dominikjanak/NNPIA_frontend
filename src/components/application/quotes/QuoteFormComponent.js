import * as React from 'react';
import '../../../styles/quotes.css';
import ApplicationLayout from "./../layout/ApplicationLayout";
import PopupMessagesService from "../../../service/PopupMessagesService";
import AuthorService from "../../../service/AuthorService";
import CategoryService from "../../../service/CategoryService";
import CreatableSelect from 'react-select/creatable';
import {withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";
import QuoteService from "../../../service/QuoteService";

class QuoteFormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteId: props.match.params.id,
      selectedAuthor: null,
      quote: "",
      selectedCategories: [],
      authors: [],
      categories: []
    }

    this.handleAddMore = this.handleAddMore.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }



  componentDidMount() {
    document.title = (this.props.action === "new" ? "Nový citát" : "Upravit citát") + " | Citáty";
    if(this.props.action === "edit"){
      this.loadQuoteData();
    }
    this.loadAuthors();
    this.loadCategories();
  }

  loadQuoteData(){
    QuoteService.get(this.state.quoteId).then((res)=>{
      if(res.data.status === 200) {
        if(res.data.status_key === "SUCCESS"){

          let categories = [];
          res.data.result.categories.forEach((e) => {
            categories.push({value: e.id, label: e.name})
          });

          this.setState({
            quote: res.data.result.quote,
            selectedAuthor: {value: res.data.result.author.id, label: `${res.data.result.author.firstname} ${res.data.result.author.surname} (${res.data.result.author.country})`},
            selectedCategories: categories
          })
        }else if(res.data.status_key === "NOT-EXISTS"){
          PopupMessagesService.error("Požadovaný citát neexistuje!");
        }
      } else {
        PopupMessagesService.error("Nepodařilo se načíst data citátu!");
      }
    });
  }

  loadAuthors() {
    AuthorService.fetchAll().then((res)=>{
      console.log(res.data)
      if(res.data.status === 200) {
        let data = res.data.result.content;
        const options = [];
        data.forEach(e =>{
          options.push({ value: e.id, label: e.firstname + " " + e.surname + " ("+ e.country +")" });
        });

        this.setState({authors: options })
      }
      else{
        PopupMessagesService.error("Nepodařilo se načíst seznam autorů");
      }
    });
  }

  loadCategories() {
    CategoryService.fetchAll().then((res)=>{
      if(res.data.status === 200) {
        console.log(res.data)

        let data = res.data.result.content;
        const options = [];
        data.forEach(e =>{
          options.push({ value: e.id, label: e.name });
        });

        this.setState({categories: options })
      }
      else{
        PopupMessagesService.error("Nepodařilo se načíst seznam kategorií");
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
              <div className="form-group">
                <label htmlFor="inputAddress">Citát</label>
                <textarea className="form-control" placeholder="Zadejte citát" name="quote" value={this.state.quote} onChange={this.onChange}/>
              </div>
              <div className="form-row">
                <div className="form-group col-md-7">
                  <label htmlFor="inputCity">Kategorie</label>
                  <CreatableSelect
                    value={this.state.selectedCategories}
                    closeMenuOnSelect={false}
                    isMulti
                    options={this.state.categories}
                    onChange={this.handleCategoryChange}
                    isSearchable
                    placeholder="Vyberte kategorie"
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="inputState">Autor</label>
                  <CreatableSelect
                    value={this.state.selectedAuthor}
                    options={this.state.authors}
                    onChange={this.handleAuthorChange}
                    isSearchable
                    placeholder="Vyberte autora"
                  />
                </div>
              </div>
            </form>
          </ApplicationLayout>
        );
  }

  handleAddMore(){
    this.handleAddQuote(false);
  }

  handleAdd(){
    this.handleAddQuote(true);
  }

  handleSaveChanges = e => {
    if(!this.validateQuotesData()) return;

    QuoteService.update(this.state.quoteId, this.state.selectedAuthor.value, this.state.quote.trim(), this.getCateoriesList()).then((res) => {
      console.log(res.data);
      if(res.data.status === 200) {
        if(res.data.status_key === "SUCCESS"){
          this.props.history.push("/app");
        }
        else{
          PopupMessagesService.warn("Tento citát již v databázi je, prosím vložte jiný.");
        }
      }
      else{
        PopupMessagesService.error("Při vkládání citátu nastala neočekávaná chyba!");
      }
    });
  }

  validateQuotesData(){
    if(this.state.quote.length < 15){
      PopupMessagesService.warn("Citát musí obsahovat alespoň 15 znaků!");
      return false;
    }

    if(this.state.selectedAuthor === null){
      PopupMessagesService.warn("Vyberte autora citátu!");
      return false;
    }
    return true;
  }

  handleAddQuote(redirect){
    if(!this.validateQuotesData()) return;
    this.addQuote(redirect);
  }

  getCateoriesList(){
    let cat = [];
    this.state.selectedCategories.forEach(e =>{
      cat.push(e.value);
    });
    return cat;
  }

  addQuote(redirect){
    QuoteService.add(this.state.selectedAuthor.value, this.state.quote.trim(), this.getCateoriesList()).then((res) => {
      let clear = true;
      if(res.data.status === 200) {
        console.log(res.data);
        if(res.data.status_key === "SUCCESS"){
          PopupMessagesService.success("Citát byl uložen.");
        }
        else{
          PopupMessagesService.warn("Tento citát již v databázi je, prosím vložte jiný.");
          clear = false;
        }
      }
      else{
        PopupMessagesService.error("Při vkládání citátu nastala neočekávaná chyba!");
        clear = false;
      }

      if(redirect){
        this.props.history.push("/app");
      }

      if(clear){
        this.setState({selectedAuthor: null, quote: "", selectedCategories: []});
      }
    });
  }

  handleAuthorChange = selectedAuthor => {
    if(selectedAuthor != null){
      var re = /^([^ ]{0,50}\s+|)(.{1,50})\s+\((.{1,3})\)$/g;
      var m = re.exec(selectedAuthor.label)
      if(m != null && m.length === 4) {
        if(selectedAuthor.__isNew__ === true) {
          AuthorService.add(m[1], m[2], m[3]).then((res) => {
            if (res.data.status === 200) {
              if (res.data.status_key === "SUCCESS") {
                selectedAuthor.value = res.data.result.id;
                this.state.authors.push({value: res.data.result.id, label: res.data.result.firstname + " " +res.data.result.surname + " ("+res.data.result.country+")"});
              } else if (res.data.status_key === "ALREADY-EXISTS") {
                PopupMessagesService.warn("Tento autor již existuje!");
              }
            } else {
              PopupMessagesService.error("Nového autra se nepodařilo vytvořit!");
            }
          })
        }
        this.setState({ selectedAuthor });
      }
    }
  };

  handleCategoryChange = selectedCategories => {
    if(selectedCategories != null && selectedCategories.length > 0){
      let last = selectedCategories[selectedCategories.length - 1];
      if(last.__isNew__ === true){
        CategoryService.add(last.label).then((res)=>{
          if(res.data.status === 200) {
            if(res.data.status_key === "SUCCESS"){
              last.value = res.data.result.id;
              this.state.categories.push({value: res.data.result.id, label: res.data.result.name});
            }
            else if(res.data.status_key === "ALREADY-EXISTS"){
              PopupMessagesService.warn("Tato kategorie již existuje!");
            }
          }
          else{
            PopupMessagesService.error("Novou kategorii se nepodařilo vytvořit!");
          }
        });
      }
    }
    this.setState({ selectedCategories });
  };

  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value });
  }
}

export default withRouter(QuoteFormComponent);