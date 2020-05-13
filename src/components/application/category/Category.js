import React, {useState} from "react";
import {Link} from "react-router-dom";

const Category = ({data, numering, removeHandler}) => {
    return (
      <tr>
        <th scope="row">{numering}</th>
        <td>{data.name}</td>
        <td>
          <Link className="text-warning p-2" title="Upravit" to={"/app/category/edit/"+data.id}><i className="fas fa-pencil-alt"/></Link>
          <span className="button text-danger p-2" title="Odstranit" onClick={() => removeHandler(data.id)}><i className="fas fa-trash-alt"/></span>
        </td>
      </tr>
    )
}

export default Category;