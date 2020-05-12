import React from "react";

export class OrderFlter extends React.Component {
  constructor() {
    super();
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
  }

  state ={
    orderby: 'id',
    order: 'asc'
  }

  onSubmitFilter = () =>
    this.props.handler(this.state.orderby, this.state.order);

  onChange = (e) =>
    this.setState({[e.target.name]: e.target.value });

  render() {
    return (
      <div className="filter-box text-right mb-1">
        <div className="btn-group">
          <select className="custom-select mr-sm-2" name="orderby" onChange={this.onChange}>
            <option defaultValue value="id">Vložení</option>
            <option value="quote">Citát</option>
            <option value="authorFirstname">Jméno autora</option>
            <option value="authorSurname">Příjmení autora</option>
            <option value="authorCountry">Země autora</option>
            <option value="userFirstname">Jméno vkladatele</option>
            <option value="userSurname">Příjmení vkladatele</option>
          </select>
        </div>
        <div className="btn-group">
          <select className="custom-select mr-sm-2" name="order" onChange={this.onChange}>
            <option defaultValue value="asc">Vzestupně</option>
            <option value="desc">Sestupně</option>
          </select>
        </div>

        <div className="btn-group">
          <span className="btn btn-success" onClick={this.onSubmitFilter}><i className="fas fa-save"></i></span>
        </div>
      </div>
    )
  }
}