import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSubscribe from "../containers/System/StudentManage/ManageSubscribe";
import ManageInternshipLocation from "../containers/System/StudentManage/ManageInternshipLocation";
import ManageLecturer from "../containers/System/StudentManage/ManageLecturer";
import ManageStudent from "../containers/System/StudentManage/ManageStudent";
import ManageEmployee from "../containers/System/StudentManage/ManageEmployee";

class StudentManage extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/student-manage/manage-subscribe"
                                component={ManageSubscribe}
                            />
                            <Route
                                path="/student-manage/manage-internship-location"
                                component={ManageInternshipLocation}
                            />
                            <Route
                                path="/student-manage/user-lecturer"
                                component={ManageLecturer}
                            />
                            <Route
                                path="/student-manage/user-student"
                                component={ManageStudent}
                            />
                            <Route
                                path="/student-manage/user-employee"
                                component={ManageEmployee}
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
        StudentManageMenuPath: state.app.StudentManageMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentManage);
