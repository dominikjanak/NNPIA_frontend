import React from "react";
import Select from 'react-select';

/**
 * Order component
 */
export class OrderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderby: props.options.length > 0 ? props.options[0].value : null,
      order: 'asc',
      oOptions: [
        {value: "asc", label: "Vzestupně"},
        {value: "desc", label: "Sestupně"}
      ]
    }
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
  }

  render() {
    return (
      <div className="d-flex justify-content-end float-right mb-1">
        <div style={{width: "200px"}} className="mr-2">
          <Select
            name="orderby"
            defaultValue={this.props.options.length > 0 ? this.props.options[0] : null}
            options={this.props.options}
            onChange={this.onChange}
          />
        </div>
        <div style={{width: "130px"}} className="mr-2">
          <Select
            classNamePrefix="select"
            defaultValue={this.state.oOptions.length > 0 ? this.state.oOptions[0] : null}
            name="order"
            options={this.state.oOptions}
            onChange={this.onChange}
          />
        </div>
        <span className="btn btn-success" onClick={this.onSubmitFilter}><i className="fas fa-save"/></span>
      </div>
    )
  }

  onSubmitFilter = () =>
    this.props.handler(this.state.orderby, this.state.order);

  onChange = (e, a) => {
    this.setState({[a.name]: e.value});
  }
}