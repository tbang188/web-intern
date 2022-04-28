import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import StudentManage from "../routes/StudentManage";
import Lecturer from "../routes/Lecturer";
import Employee from "../routes/Employee";
import InternshipLocationPage from "./HomePage/InternshipLocationPage.js";
import ViewInternshipDetail from "./HomePage/ViewInternshipDetail";
import Information from "./HomePage/Information";
import Form from "./HomePage/Form";
import Submit from "./HomePage/Submit";
import Guide from "./HomePage/Guide";
import Forum from "./HomePage/Forum";
import Contact from "./HomePage/Contact";

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars
                                style={{
                                    height: "100vh",
                                    width: "100%",
                                }}
                            >
                                <Switch>
                                    <Route
                                        path={path.HOME}
                                        exact
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(HomePage))
                                        }
                                    />
                                    <Route
                                        path={path.HOMEPAGE}
                                        exact
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(HomePage))
                                        }
                                    />
                                    <Route
                                        path={path.INTERNSHIP_LOCATION}
                                        exact
                                        component={userIsAuthenticated(
                                            InternshipLocationPage
                                        )}
                                    />
                                    <Route
                                        path={path.DETAIL_INTERNSHIP}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(
                                                ViewInternshipDetail
                                            ))
                                        }
                                    />
                                    <Route
                                        path={path.INFORMATION}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Information))
                                        }
                                    />
                                    <Route
                                        path={path.FORM}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Form))
                                        }
                                    />
                                    <Route
                                        path={path.SUBMIT}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Submit))
                                        }
                                    />
                                    <Route
                                        path={path.GUIDE}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Guide))
                                        }
                                    />
                                    <Route
                                        path={path.FORUM}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Forum))
                                        }
                                    />
                                    <Route
                                        path={path.CONTACT}
                                        component={
                                            (userIsNotAuthenticated(Login),
                                            userIsAuthenticated(Contact))
                                        }
                                    />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(
                                            Login
                                        )}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />
                                    <Route
                                        path={path.STUDENT_MANAGE}
                                        component={userIsAuthenticated(
                                            StudentManage
                                        )}
                                    />
                                    <Route
                                        path={path.LECTURER}
                                        component={userIsAuthenticated(
                                            Lecturer
                                        )}
                                    />
                                    <Route
                                        path={path.EMPLOYEE}
                                        component={userIsAuthenticated(
                                            Employee
                                        )}
                                    />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            className="toast-container"
                            toastClassName="toast-item"
                            bodyClassName="toast-item-body"
                            autoClose={false}
                            hideProgressBar={true}
                            pauseOnHover={false}
                            pauseOnFocusLoss={true}
                            closeOnClick={false}
                            draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
