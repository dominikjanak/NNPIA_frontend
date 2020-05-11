import * as React from 'react';
import './styles/app.css';
import ApplicationLayout from "./layout/ApplicationLayout";

class QuoteListComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ApplicationLayout pageTitle={this.props.pageTitle}>
                    APP
                </ApplicationLayout>
            </React.Fragment>
        );
    }
}

export default QuoteListComponent;