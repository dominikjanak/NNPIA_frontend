import * as React from 'react';
import '../../../styles/appLayout.css';

function ApplicationLayout (props){
  return(
    <React.Fragment>
        <div className="mt-3 page-title">
          <h1 className="border-bottom">{ props.pageTitle }</h1>
        </div>
        <div className={props.class}>
          { props.children }
        </div>
    </React.Fragment>

  )
}

export default ApplicationLayout;