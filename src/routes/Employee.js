import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageJobRequirements from "../containers/System/Employee/ManageJobRequirements";
import ManageRating from "../containers/System/Employee/ManageRating";

class Employee extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/employee/manage-job-requirements"
                                component={ManageJobRequirements}
                            />
                            <Route
                                path="/employee/manage-rating"
                                component={ManageRating}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        EmployeeMenuPath: state.app.EmployeeMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
