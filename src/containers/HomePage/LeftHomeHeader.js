import React, { Component } from "react";
import { connect } from "react-redux";
import "./LeftHomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { Link } from "react-router-dom";
import withRouter from "./Section/Company";
import { history } from "./../../redux";
import { push } from "connected-react-router";

class LeftHomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
        };
    }

    changeLanguage = (language) => {
        // alert(language);
        this.props.changeLanguageAppRedux(language);
    };

    handleChangeColor = (colorData) => {
        this.setState({
            color: colorData,
        });
    };

    render() {
        // console.log("check props: ", this.props);
        const { processLogout, userInfo } = this.props;

        return (
            <div className="left-home-header-container">
                <div className="left-home-header-content">
                    {/* trang chu */}
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <div className="item-logo">
                            <div className="head-item-logo shake-lr"></div>
                            {/* <span className="name-home fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.home" />
                                </div>
                            </span> */}
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* dia diem thuc tap */}
                    <Link
                        to="/internship-location"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="item">
                            <div className="icon-diadiem shake-lr"></div>
                            <span className="name-diadiem fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.internship-location" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* thong tin */}
                    <Link to="/information" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-thongtin shake-lr"></div>
                            <span className="name-thongtin fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.information" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* bieu mau */}
                    <Link to="/form" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-mauphieu shake-lr"></div>
                            <span className="name-mauphieu fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.form" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* nop bao cao */}
                    <Link to="/submit" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-nopbaocao shake-lr"></div>
                            <span className="name-nopbaocao fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.submit" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* huong dan */}
                    <Link to="/guide" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-huongdan shake-lr"></div>
                            <span className="name-huongdan fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.guide" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* trao doi */}
                    {/* <Link to="/forum" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-forum shake-lr"></div>
                            <span className="name-forum fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.forum" />
                                </div>
                            </span>
                        </div>
                    </Link> */}
                    {/* lien he */}
                    <Link to="/contact" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <div className="icon-lienhe shake-lr"></div>
                            <span className="name-lienhe fade-in">
                                <div className="text-box">
                                    <FormattedMessage id="left-header.contact" />
                                </div>
                            </span>
                            {/* <div className="hover-black-bg"></div> */}
                        </div>
                    </Link>
                    {/* thay doi ngon ngu */}
                    <div className="item-flag">
                        <div className="button-language">
                            <i class="fas fa-caret-down"></i>
                            <i class="fas fa-globe"></i>
                            lang
                        </div>

                        <div class="flag-dropdown fade-in">
                            {/* tieng viet */}
                            <a
                                className="language-vi"
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.VI)
                                }
                            >
                                <div className="icon-vi"></div>
                                <div className="name-lang-vi fade-in">
                                    <div className="text-box">Vietnamese</div>
                                </div>
                            </a>
                            {/* tieng anh */}
                            <a
                                className="language-en"
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.EN)
                                }
                            >
                                <div className="icon-en"></div>
                                <div className="name-lang-en fade-in">
                                    <div className="text-box">English</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftHomeHeader);
