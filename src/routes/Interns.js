import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageStudentManage from "../containers/System/Admin/ManageStudentManage";
import ManageAdmin from "../containers/System/Admin/ManageAdmin";
import SystemWelcome from "../containers/System/SystemWelcome";

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        // const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/system/welcome"
                                component={SystemWelcome}
                            />
                            {/* <Route
                                path="/system/user-redux"
                                component={UserRedux}
                            /> */}
                            <Route
                                path="/system/user-studentmanage"
                                component={ManageStudentManage}
                            />
                            <Route
                                path="/system/user-admin"
                                component={ManageAdmin}
                            />

                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
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
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
