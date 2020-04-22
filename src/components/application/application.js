import React from 'react';
import {Link} from "react-router-dom";

function Application() {
  return (
    <div className="App">
      APP <br />
        <Link to={`/logout`}>Logout</Link>
    </div>
  );
}

export default Application;
