import React from 'react';
import {RouteHandler} from 'react-router';

class AppHandler extends React.Component {
    render() {
        return (
            <div>
                <section className="todoapp">
                    <RouteHandler {...this.props} key={this.props.pathname} />
                </section>
            </div>
        );
    }
}

export default AppHandler;
