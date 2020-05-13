import React from "react";
import {Link} from "react-router-dom";

/**
 * Author render
 */
const Author = ({data, numering, removeHandler}) => {
  return (
    <tr>
      <th scope="row">{numering}</th>
      <td>{data.firstname}</td>
      <td>{data.surname}</td>
      <td>{data.country}</td>
      <td>
        <Link className="text-warning p-2" title="Upravit" to={"/app/author/edit/" + data.id}><i
          className="fas fa-pencil-alt"/></Link>
        <span className="button text-danger p-2" title="Odstranit" onClick={() => removeHandler(data.id)}><i
          className="fas fa-trash-alt"/></span>
      </td>
    </tr>
  )
}

export default Author;