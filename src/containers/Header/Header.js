import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import {
    adminMenu,
    studentManageMenu,
    lecturerMenu,
    employeeMenu,
} from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    componentDidMount() {
        // console.log("check userInfo from Header ", this.props.userInfo);
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.loai_tai_khoan;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.STUDENTMANAGE) {
                menu = studentManageMenu;
            }
            if (role === USER_ROLE.LECTURER) {
                menu = lecturerMenu;
            }
            if (role === USER_ROLE.EMPLOYEE) {
                menu = employeeMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        // console.log("check userInfo from Header", userInfo);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />
                        {", "}
                        {userInfo && userInfo.Nguoidung.ho_ten
                            ? userInfo.Nguoidung.ho_ten
                            : ""}
                        !
                    </span>
                    <i class="fas fa-globe"></i>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VIE
                    </span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? "language-en active"
                                : "language-en"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        ENG
                    </span>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
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
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
