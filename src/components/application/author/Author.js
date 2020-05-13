import React, {useState} from "react";
import {Link} from "react-router-dom";

const Author = ({data, numering, removeHandler, updateHandler}) => {
  const [firstname, setFirstname] = useState(data.firstname)
  const [surname, setSurname] = useState(data.surname)
  const [country, setCountry] = useState(data.country)

    return (
      <tr>
        <th scope="row">{numering}</th>
        <td>{firstname}</td>
        <td>{surname}</td>
        <td>{country}</td>
        <td style={{width: "100px"}}>
          <Link className="text-warning p-2" title="Upravit" to={"/app/author/edit/"+data.id}><i className="fas fa-pencil-alt"/></Link>
          <span className="button text-danger p-2" title="Odstranit" onClick={() => removeHandler(data.id)}><i className="fas fa-trash-alt"/></span>
        </td>
      </tr>
    )
}

export default Author;