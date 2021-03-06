import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "../../assets/icon-diadiem-35px.png";
import LeftHomeHeader from "./LeftHomeHeader";
import iconGuide from "../../assets/icon-huongdan-35px.png";
import guide1 from "../../assets/guide-1.png";
import "./HomeHeader.scss";
import Slider from "react-slick";
import "./Guide.scss";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

class Guide extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        let { userInfo } = this.props;
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <React.Fragment>
                <LeftHomeHeader />
                {/* <div className="main-home-header"> */}
                <div className="home-header-container guide-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.guide" />
                                </div>
                                <div className="right-item-content">
                                    <FormattedMessage id="home-header.himyfr" />{" "}
                                    {userInfo && userInfo.Nguoidung.ho_ten
                                        ? userInfo.Nguoidung.ho_ten
                                        : ""}
                                    <i class="fas fa-user-circle"></i>
                                    {/* <i class="fas fa-caret-down"></i> */}
                                    <div
                                        className="btn btn-logout"
                                        onClick={processLogout}
                                        title="Log out"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                <div className="home-body-container">
                    <div className="home-body-content">
                        <div className="wrap-body">
                            <div className="center-body-content">
                                <div className="welcome fade-in background-image-1">
                                    <div className="text-title tracking-in-expand-fwd ">
                                        {/* <i class="fas fa-file-alt"></i>{" "} */}
                                        <img
                                            class="emojione"
                                            title=":tada:"
                                            src={iconGuide}
                                        />{" "}
                                        <FormattedMessage id="left-header.guide" />
                                    </div>

                                    <div className="description">
                                        <div className="banner-guide"></div>
                                        <div>
                                            <p>
                                                Sinh vi??n t??m ki???m ?????a ??i???m th???c
                                                t???p t???i ch???c n??ng{" "}
                                                <Link
                                                    to="/internship-location"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    ?????A ??I???M TH???C T???P
                                                </Link>
                                                . Sau khi t??m ???????c ?????a ??i???m ph??
                                                h???p v???i n??ng l???c b???n th??n th??
                                                b???m v??o n??t ????ng k?? v?? ch??? x??t
                                                duy???t t???{" "}
                                                <span>Gi??o v??? khoa</span>. Trong
                                                th???i gian n??y sinh vi??n c?? th???
                                                v??o ch???c n??ng{" "}
                                                <Link
                                                    to="/information"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    TH??NG TIN
                                                </Link>{" "}
                                                ????? xem c??c{" "}
                                                <span>Th??ng tin c?? nh??n</span>{" "}
                                                v?? t??nh tr???ng{" "}
                                                <span>
                                                    Phi???u ????ng k?? th???c t???p
                                                </span>
                                                .
                                            </p>
                                            <p>
                                                Sau khi{" "}
                                                <span>
                                                    Phi???u ????ng k?? th???c t???p
                                                </span>{" "}
                                                ???????c duy???t th?? s??? hi???n ?????y ?????
                                                th??ng tin{" "}
                                                <span>C??n b??? h?????ng d???n</span> v??{" "}
                                                <span>Gi???ng vi??n</span> ph???
                                                tr??ch,{" "}
                                                <span>Phi???u giao vi???c</span> s???
                                                ???????c{" "}
                                                <span>C??n b??? h?????ng d???n</span>{" "}
                                                c???p nh???t li??n t???c ????? sinh vi??n
                                                c?? th??? n???m ???????c l???ch tr??nh c??ng
                                                vi???c ph???i l??m trong su???t 8 tu???n
                                                th???c t???p t???i c?? quan.
                                            </p>
                                            <p>
                                                K???t th??c k??? th???c t???p sinh vi??n
                                                s??? v??o ch???c n??ng{" "}
                                                <Link
                                                    to="/submit"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    N???P B??O C??O
                                                </Link>{" "}
                                                ????? n???p file b??o c??o v??? cho{" "}
                                                <span>Gi???ng vi??n</span> ph???
                                                tr??ch ????? ch???m ??i???m cu???i kh??a.
                                                Sau khi c?? ??i???m t???{" "}
                                                <span>Gi???ng vi??n</span> th?? h???
                                                th???ng s??? t??? c???p nh???t ??? ph???n ch???c
                                                n??ng{" "}
                                                <Link
                                                    to="/information"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    TH??NG TIN
                                                </Link>
                                                . Trong su???t qu?? tr??nh th???c t???p
                                                n???u c?? v?????ng m???c v??? h??? th???ng b???n
                                                c?? th??? v??o trang ch???c n??ng{" "}
                                                <Link
                                                    to="/contact"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    LI??N H???
                                                </Link>
                                                , trong ????y s??? c?? ????? th??ng tin
                                                li??n quan gi??p b???n gi???i ????p th???c
                                                m???c.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-container">
                                    <div className="row">
                                        <div className="col-4 introduction">
                                            <div className="logo-cit-interns"></div>
                                            <div className="header">
                                                <FormattedMessage id="home-header.introduction" />
                                            </div>
                                            <div className="detail">
                                                <p>
                                                    <span className="text-bold">
                                                        CIT Interns
                                                    </span>{" "}
                                                    <FormattedMessage id="home-header.cit-interns-is" />
                                                </p>

                                                <p>
                                                    <FormattedMessage id="home-header.member-of-project" />
                                                    :
                                                </p>
                                                <ul>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.instructors" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/minhthu.ct"
                                                            target="_blank"
                                                        >
                                                            Tr???n Ng Minh Th??
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.student" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/anhphoang65/"
                                                            target="_blank"
                                                        >
                                                            Phan Ho??ng Anh
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.student" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/profile.php?id=100025480758295"
                                                            target="_blank"
                                                        >
                                                            Nguy???n Thanh B???ng
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-4 features">
                                            <div className="header">
                                                <FormattedMessage id="home-header.features" />
                                            </div>
                                            <div className="list">
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-diadiem"></div>
                                                    <FormattedMessage id="left-header.internship-location" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-mauphieu"></div>
                                                    <FormattedMessage id="left-header.form" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-nopbaocao"></div>
                                                    <FormattedMessage id="left-header.submit" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-huongdan"></div>
                                                    <FormattedMessage id="left-header.guide" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-forum"></div>
                                                    <FormattedMessage id="left-header.forum" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-lienhe"></div>
                                                    <FormattedMessage id="left-header.contact" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="header">
                                                <FormattedMessage id="home-header.cit" />
                                                <br></br>
                                                <FormattedMessage id="home-header.ctu" />
                                            </div>
                                            <div className="detail">
                                                <ul>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.address" />
                                                            :{" "}
                                                        </span>
                                                        <FormattedMessage id="home-header.ctu-address" />
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.phone" />
                                                            :{" "}
                                                        </span>
                                                        (84) 0292 3 734713
                                                        <br></br>0292 3 831301
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Fax:{" "}
                                                        </span>
                                                        (84) 0292 3830841
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Email:{" "}
                                                        </span>
                                                        office@cit.ctu.edu.vn
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Website:{" "}
                                                        </span>
                                                        <a href="http://www.cit.ctu.edu.vn/">
                                                            www.cit.ctu.edu.vn
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="support">
                                        <div className="left">
                                            &copy; 2021 CIT-INTERNS FROM{" "}
                                            <a
                                                href="http://www.cit.ctu.edu.vn/"
                                                target="_blank"
                                            >
                                                CIT
                                            </a>
                                        </div>
                                        <div className="right">
                                            <a href="mailto:office@cit.ctu.edu.vn?Subject=Xin Ch??o CIT Interns!">
                                                <i class="far fa-envelope"></i>{" "}
                                                office@cit.ctu.edu.vn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
