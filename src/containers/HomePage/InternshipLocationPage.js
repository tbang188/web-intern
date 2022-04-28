import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import InternshipDetail from "./InternshipDetail";
import LeftHomeHeader from "./LeftHomeHeader";
import ViewInternshipDetail from "./ViewInternshipDetail";

class InternshipLocationPage extends Component {
    render() {
        return (
            <React.Fragment>
                <LeftHomeHeader />
                <InternshipDetail />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InternshipLocationPage);
