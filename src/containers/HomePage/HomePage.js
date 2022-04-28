import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import LeftHomeHeader from "./LeftHomeHeader";

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <LeftHomeHeader />
                <HomeHeader />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
