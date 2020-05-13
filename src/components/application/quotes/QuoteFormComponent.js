import * as React from 'react';
import '../../../styles/quotes.css';
import ApplicationLayout from "./../layout/ApplicationLayout";
import PopupMessagesService from "../../../service/PopupMessagesService";
import AuthorService from "../../../service/AuthorService";
import CategoryService from "../../../service/CategoryService";
import CreatableSelect from 'react-select/creatable';
import {Link, withRouter} from 'react-router-dom';
import QuoteService from "../../../service/QuoteService";

/**
 * Quote form component
 */
class QuoteFormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteId: props.match.params.id,
      selectedAuthor: null,
      quote: "",
      publicState: false,
      selectedCategories: [],
      authors: [],
      categories: []
    }

    this.checkbox = React.createRef();
    this.handleAddMore = this.handleAddMore.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    document.title = (this.props.action === "new" ? "Nový citát" : "Upravit citát") + " | Citáty";
    if (this.props.action === "edit") {
      this.loadQuoteData();
    }
    this.loadAuthors();
    this.loadCategories();
  }

  render() {
    return (
      <ApplicationLayout pageTitle={this.props.pageTitle}>
        <form>
          <div className="d-flex mb-3">
            <Link className="btn btn-outline-danger px-4" to="/app"><i className="fas fa-arrow-left"/> Přejít na
              výpis</Link>
            <div className="btn-group ml-auto">
              {
                this.props.action === "new" ?
                  (
                    <React.Fragment>
                      <span className="btn btn-outline-success px-4" onClick={this.handleAddMore}><i
                        className="fas fa-plus"/> Přidat více</span>
                      <span className="btn btn-success px-4" onClick={this.handleAdd}><i className="fas fa-save"/> Přidat</span>
                    </React.Fragment>
                  ) : (
                    <span className="btn btn-warning px-4" onClick={this.handleSaveChanges}><i className="fas fa-save"/> Uložit změny</span>
                  )
              }
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-11">
              <div className="form-group">
                <label htmlFor="quote">Citát</label>
                <textarea className="form-control" placeholder="Zadejte citát" name="quote" value={this.state.quote}
                          onChange={this.onChange}/>
              </div>
            </div>
            <div className="form-group col-md-1">

              <label htmlFor="inputAddress">Veřejný</label><br/>
              <label className="switch danger round mt-3" title="Veřejně přístupný">
                <input type="checkbox" onChange={this.handleQuoteGlobal} ref={this.checkbox}/>
                <div className="slider"/>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-7">
              <label>Kategorie</label>
              <CreatableSelect
                value={this.state.selectedCategories}
                closeMenuOnSelect={false}
                isMulti
                options={this.state.categories}
                onChange={this.handleCategoryChange}
                isSearchable
                placeholder="Vyberte kategorie"
                createOptionPosition="first"
                formatCreateLabel={(inputValue) => `Vytvořit '${inputValue}'`}
                noOptionsMessage={() => "Žádné možnosti..."}
              />
              <small className="form-text text-muted"><span className="text-danger">*</span>Novou kategorii můžete
                vytvořit i zde.</small>
            </div>
            <div className="form-group col-md-5">
              <label>Autor</label>
              <CreatableSelect
                value={this.state.selectedAuthor}
                options={this.state.authors}
                onChange={this.handleAuthorChange}
                isSearchable
                createOptionPosition="first"
                placeholder="Vyberte autora"
                formatCreateLabel={(inputValue) => `Vytvořit '${inputValue}'`}
                noOptionsMessage={() => "Žádné možnosti..."}
              />
              <small className="form-text text-muted"><span className="text-danger">*</span> Nového autora můžete
                vytvořit ve formátu 'Jméno Příjmení (STS)'.</small>
            </div>
          </div>
        </form>
      </ApplicationLayout>
    );
  }

  loadQuoteData = () => {
    QuoteService.get(this.state.quoteId).then((res) => {
      if (res.data.status === 200) {
        if (res.data.status_key === "SUCCESS") {

          let categories = [];
          res.data.result.categories.forEach((e) => {
            categories.push({value: e.id, label: e.name})
          });

          this.checkbox.current.checked = res.data.result.global;
          this.setState({
            quote: res.data.result.quote,
            publicState: res.data.result.global,
            selectedAuthor: {
              value: res.data.result.author.id,
              label: `${res.data.result.author.firstname} ${res.data.result.author.surname} (${res.data.result.author.country})`
            },
            selectedCategories: categories
          })
        } else if (res.data.status_key === "NOT-EXISTS") {
          PopupMessagesService.error("Požadovaný citát neexistuje!");
        }
      } else {
        PopupMessagesService.error("Nepodařilo se načíst data citátu!");
      }
    });
  }

  loadAuthors = () => {
    AuthorService.fetchAll().then((res) => {
      if (res.data.status === 200) {
        let data = res.data.result.content;
        const options = [];
        data.forEach(e => {
          options.push({value: e.id, label: e.firstname + " " + e.surname + " (" + e.country + ")"});
        });

        this.setState({authors: options})
      } else {
        PopupMessagesService.error("Nepodařilo se načíst seznam autorů");
      }
    });
  }

  loadCategories = () => {
    CategoryService.fetchAll().then((res) => {
      if (res.data.status === 200) {
        let data = res.data.result.content;
        const options = [];
        data.forEach(e => {
          options.push({value: e.id, label: e.name});
        });

        this.setState({categories: options})
      } else {
        PopupMessagesService.error("Nepodařilo se načíst seznam kategorií");
      }
    });
  }

  validateQuotesData = () => {
    if (this.state.quote.length < 15) {
      PopupMessagesService.warn("Citát musí obsahovat alespoň 15 znaků!");
      return false;
    }

    if (this.state.quote.length > 1000) {
      PopupMessagesService.warn("Citát může obsahovat maximálně 1000 znaků!");
      return false;
    }

    if (this.state.selectedAuthor === null) {
      PopupMessagesService.warn("Vyberte autora citátu!");
      return false;
    }
    return true;
  }

  getCateoriesList = () => {
    let cat = [];
    this.state.selectedCategories.forEach(e => {
      cat.push(e.value);
    });
    return cat;
  }

  addQuote = (redirect) => {
    QuoteService.add(this.state.selectedAuthor.value, this.state.quote.trim(), this.getCateoriesList(), this.state.publicState).then((res) => {
      let clear = true;

      if (res.data.status === 200) {
        if (res.data.status_key === "SUCCESS") {
          PopupMessagesService.success("Citát byl uložen.");
        } else {
          PopupMessagesService.warn("Tento citát již v databázi je, prosím vložte jiný.");
          clear = false;
        }
      } else {
        PopupMessagesService.error("Při vkládání citátu nastala neočekávaná chyba!");
        clear = false;
      }

      if (redirect) {
        this.props.history.push("/app");
      }

      if (clear) {
        this.setState({selectedAuthor: null, quote: "", selectedCategories: []});
      }
    });
  }

  handleAddQuote = (redirect) => {
    if (!this.validateQuotesData()) return;
    this.addQuote(redirect);
  }

  handleSaveChanges = () => {
    if (!this.validateQuotesData()) return;
    QuoteService.update(this.state.quoteId, this.state.selectedAuthor.value, this.state.quote.trim(), this.getCateoriesList(), this.state.publicState).then((res) => {
      if (res.data.status === 200) {
        if (res.data.status_key === "SUCCESS") {
          this.props.history.push("/app");
        } else {
          PopupMessagesService.warn("Tento citát již v databázi je, prosím vložte jiný.");
        }
      } else {
        PopupMessagesService.error("Při vkládání citátu nastala neočekávaná chyba!");
      }
    });
  }

  handleAuthorChange = (selectedAuthor) => {
    if (selectedAuthor != null) {
      var re = /^([^ ]{0,50}\s+|)(.{1,50})\s+\((.{1,3})\)$/g;
      var m = re.exec(selectedAuthor.label)
      if (m != null && m.length === 4) {
        if (selectedAuthor.__isNew__ === true) {
          AuthorService.add(m[1], m[2], m[3]).then((res) => {
            if (res.data.status === 200) {
              if (res.data.status_key === "SUCCESS") {
                selectedAuthor.value = res.data.result.id;
                this.state.authors.push({
                  value: res.data.result.id,
                  label: res.data.result.firstname + " " + res.data.result.surname + " (" + res.data.result.country + ")"
                });
              } else if (res.data.status_key === "ALREADY-EXISTS") {
                PopupMessagesService.warn("Tento autor již existuje!");
              }
            } else {

            }
          })
        }
        this.setState({selectedAuthor});
      } else {
        PopupMessagesService.error("Nového autra se nepodařilo vytvořit!<br/>Musí být ve formátu 'Jméno Příjmení (Země)'<br/><small class='text-muted'>Popřípadě 'Jméno (Země)' nebo 'Jméno Příjmení Příjmení (Země)'</small><br/>Země může bsahvoat 1 až 3 znaky.");
      }
    }
  };

  handleCategoryChange = (selectedCategories) => {
    if (selectedCategories != null && selectedCategories.length > 0) {
      let last = selectedCategories[selectedCategories.length - 1];
      if (last.__isNew__ === true) {
        if (last.label.length > 50) {
          PopupMessagesService.error("Maximální povolená délka kategorie je 50 znaků.");
          return;
        }
        CategoryService.add(last.label).then((res) => {
          if (res.data.status === 200) {
            if (res.data.status_key === "SUCCESS") {
              last.value = res.data.result.id;
              this.state.categories.push({value: res.data.result.id, label: res.data.result.name});
            } else if (res.data.status_key === "ALREADY-EXISTS") {
              PopupMessagesService.warn("Tato kategorie již existuje!");
            }
          } else {
            PopupMessagesService.error("Novou kategorii se nepodařilo vytvořit!");
          }
        });
      }
    }
    this.setState({selectedCategories});
  };

  handleQuoteGlobal = (e) =>
    this.setState({publicState: e.target.checked})

  handleAdd = () =>
    this.handleAddQuote(true);

  handleAddMore = () =>
    this.handleAddQuote(false);

  onChange = (e) =>
    this.setState({[e.target.name]: e.target.value});
}

export default withRouter(QuoteFormComponent);