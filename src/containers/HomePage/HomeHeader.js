import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import Company from "./Section/Company";
import "../../assets/icon-diadiem-35px.png";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import { Link } from "react-router-dom";

class HomeHeader extends Component {
    componentDidMount() {
        // console.log("check userInfo from HomeHeader ", this.props.userInfo);
        let { userInfo } = this.props;
    }

    render() {
        const { processLogout, userInfo } = this.props;

        // console.log("chekc props: ", this.props);
        // console.log("check userInfo: ", this.props.userInfo);
        return (
            <React.Fragment>
                {/* <div className="main-home-header"> */}
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="home-header.home" />
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
                                    <div className="text-title tracking-in-expand-fwd">
                                        <img
                                            class="emojione"
                                            alt="????"
                                            title=":blush:"
                                            src="https://cdn.jsdelivr.net/emojione/assets/png/1f60a.png?v=2.2.7"
                                        />
                                        <FormattedMessage id="home-header.cit-greet-title" />
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":tada:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f389.png?v=2.2.7"
                                            />
                                            <FormattedMessage id="home-header.cit-greet-des1" />{" "}
                                            <a
                                                className="text-bold show-more"
                                                href="/guide"
                                            >
                                                <FormattedMessage id="home-header.more-information" />
                                            </a>
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            <FormattedMessage id="home-header.cit-greet-des2" />
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":heart_eyes:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f60d.png?v=2.2.7"
                                            />
                                            <FormattedMessage id="home-header.cit-greet-des3" />
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="welcome fade-in"
                                    style={{
                                        backgroundColor: "#fafafa",
                                        border: "1px solid #fafafa",
                                        padding: "15px 0",
                                    }}
                                >
                                    <Company />
                                </div>
                                {/* dia diem thuc tap */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-diadiem">
                                        <div className="icon-diadiem"></div>
                                        <center>
                                            <FormattedMessage id="left-header.internship-location" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":tada:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f389.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des1" /> */}
                                            **C?? H???I TH???C T???P H???P D???N**
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            B???n ??ang mu???n t??m n??i th???c t???p t???t
                                            nh???t?
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            B???n ??ang kh??t khao tr???i nghi???m m??i
                                            tr?????ng c??ng s??? th???c t????
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            B???n quy???t t??m c?? ???????c c??ng vi???c t???t
                                            ngay khi ra tr?????ng?
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":heart_eyes:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f60d.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des3" /> */}
                                            CIT Interns ??em ?????n cho b???n th??ng
                                            tin v??? nh???ng ?????a ??i???m th???c t???p ch???t
                                            l?????ng, uy t??n ????? b???n c?? th??? t??m ???????c
                                            m???t n??i th???c t???p ph?? h???p v???a ?? nh???t!
                                        </p>
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":heart_eyes:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f60d.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des3" /> */}
                                            C???p nh???t nh???ng ??i???u t???t nh???t m?? b???n
                                            c???n!
                                        </p>
                                    </div>
                                </div>
                                {/* bieu mau */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-mauphieu">
                                        <div className="icon-mauphieu"></div>
                                        <center>
                                            <FormattedMessage id="left-header.form" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            Thu???n l???i t???ng b?????c ho??n th??nh k???
                                            th???c t???p th???c t???, t???t c??? c??c bi???u
                                            m???u c???n chu???n b??? trong qu?? tr??nh
                                            th???c t???p th???c t??? c???a sinh vi??n ???????c
                                            ???? ???????c c???p nh???t ?????y ????? t???i ????y.
                                        </p>
                                    </div>
                                </div>
                                {/* nop bao cao */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-nopbaocao">
                                        <div className="icon-nopbaocao"></div>
                                        <center>
                                            <FormattedMessage id="left-header.submit" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":tada:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f389.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des1" /> */}
                                            Ch??c m???ng b???n ???? ho??n th??nh xu???t s???c
                                            k??? th???c t???p th???c t???
                                        </p>
                                    </div>
                                </div>
                                {/* huong dan */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-huongdan">
                                        <div className="icon-huongdan"></div>
                                        <center>
                                            <FormattedMessage id="left-header.guide" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            Th??ng tin chi ti???t v??? quy tr??nh th???c
                                            t???p th???c t???.
                                        </p>
                                    </div>
                                </div>
                                {/* trao doi */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-forum">
                                        <div className="icon-forum"></div>
                                        <center>
                                            <FormattedMessage id="left-header.forum" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":heart_eyes:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f60d.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des3" /> */}
                                            Mu???n ??i nhanh h??y ??i m???t m??nh, mu???n
                                            ??i xa h??y ??i c??ng nhau. C??c b???n sinh
                                            vi??n - nh???ng ng?????i ???? trao ?????i l??
                                            nh???ng ng?????i mu???n ??i xa.
                                        </p>
                                    </div>
                                </div>
                                {/* lien he */}
                                <div className="welcome fade-in background-image-2">
                                    <div className="text-title bg-color-lienhe">
                                        <div className="icon-lienhe"></div>
                                        <center>
                                            <FormattedMessage id="left-header.contact" />
                                        </center>
                                    </div>
                                    <div className="description">
                                        <p>
                                            <img
                                                class="emojione"
                                                alt="????"
                                                title=":bulb:"
                                                src="https://cdn.jsdelivr.net/emojione/assets/png/1f4a1.png?v=2.2.7"
                                            />
                                            {/* <FormattedMessage id="home-header.cit-greet-des2" /> */}
                                            N???u b???n g???p b???t k??? kh?? kh??n n??o
                                            trong k??? th???c t???p th???c t???, ?????ng ch???n
                                            ch??? k???t n???i v???i CIT Interns ????? nh???n
                                            ???????c s??? h??? tr??? nh??!
                                        </p>
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
                {/* </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
