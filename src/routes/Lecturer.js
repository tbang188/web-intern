import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageScore from "../containers/System/Lecturer/ManageScore";
import ManageStudentSupport from "../containers/System/Lecturer/ManageStudentSupport";

class Lecturer extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/lecturer/manage-score"
                                component={ManageScore}
                            />
                            <Route
                                path="/lecturer/manage-student-support"
                                component={ManageStudentSupport}
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
        LecturerMenuPath: state.app.LecturerMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Lecturer);
