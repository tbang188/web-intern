import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./HomeHeader.scss";
import "./InternshipDetail.scss";
import { FormattedMessage } from "react-intl";
import "../../assets/icon-diadiem-35px.png";
import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CRow } from "@coreui/react";
import { CCol } from "@coreui/react";
import { CCardImage } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import {
    getAllInternshipLocation, // ok
} from "../../services/userService";
import CardBackground from "../../assets/hiring9.png";
import CardImg from "../../assets/card-img-2.png";
import iconInternshipLocation from "../../assets/icon-diadiem-35px.png";
import { withRouter } from "react-router";

class InternshipDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrInternshipLocation: [],
        };
    }

    async componentDidMount() {
        let { userInfo } = this.props;
        await this.getAllFromReact();
        // console.log("check userInfo", this.props.userInfo);
        // console.log(
        //     "check arrInternshipLocation",
        //     this.state.arrInternshipLocation
        // );
    }

    getAllFromReact = async () => {
        let response = await getAllInternshipLocation("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrInternshipLocation: response.internship_location,
            });
        }
    };

    handleViewInternshipDetail = (internship) => {
        // console.log("check view internship ", internship);
        this.props.history.push(`/detail-internship/${internship.ma_co_quan}`);
    };

    render() {
        let arrInternshipLocation = this.state.arrInternshipLocation;
        // console.log("check arrInternshipLocation", arrInternshipLocation);
        const { processLogout, userInfo } = this.props;

        // console.log("chekc props: ", this.props);
        // console.log("check userInfo: ", this.props.userInfo);
        return (
            <React.Fragment>
                {/* <div className="main-home-header"> */}
                <div className="home-header-container intership-location-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.internship-location" />
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
                                <div
                                    className="welcome fade-in"
                                    style={{
                                        backgroundColor: "#fafafa",
                                        border: "1px solid #fafafa",
                                        padding: "15px 0",
                                    }}
                                >
                                    <p className="text-title tracking-in-expand-fwd">
                                        <img
                                            class="emojione"
                                            title=":tada:"
                                            src={iconInternshipLocation}
                                        />{" "}
                                        <FormattedMessage id="left-header.internship-location" />
                                    </p>
                                    {/* <Company /> */}
                                    <CRow
                                        xs={{ cols: 1 }}
                                        md={{ cols: 3 }}
                                        className="g-4"
                                    >
                                        {arrInternshipLocation &&
                                            arrInternshipLocation
                                                .slice(0)
                                                .reverse()
                                                .map((item, index) => {
                                                    return (
                                                        <CCol
                                                            xs
                                                            title={
                                                                item.Coquan
                                                                    .ten_co_quan
                                                            }
                                                        >
                                                            <CCard
                                                                className="h-100 card-data"
                                                                //click xem chi tiet
                                                                onClick={() =>
                                                                    this.handleViewInternshipDetail(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    <CCardImage
                                                                        orientation="top"
                                                                        src={
                                                                            CardImg
                                                                        }
                                                                    />
                                                                </div>
                                                                <CCardBody>
                                                                    <CCardTitle
                                                                        style={{
                                                                            fontWeight:
                                                                                "600",
                                                                            color: "#6c5ce7",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item
                                                                                .Coquan
                                                                                .ten_co_quan
                                                                        }
                                                                    </CCardTitle>
                                                                    <CCardText>
                                                                        <i class="fas fa-map-marker-alt"></i>{" "}
                                                                        <span
                                                                            style={{
                                                                                color: "#636e72",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item
                                                                                    .Coquan
                                                                                    .tinh_tp
                                                                            }
                                                                        </span>
                                                                    </CCardText>
                                                                    <CCardText>
                                                                        <i class="fas fa-thumbtack"></i>{" "}
                                                                        <span
                                                                            style={{
                                                                                color: "#636e72",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.noi_dung_cv
                                                                            }
                                                                        </span>
                                                                    </CCardText>
                                                                    <CCardText>
                                                                        <i class="fas fa-users"></i>{" "}
                                                                        <span
                                                                            style={{
                                                                                color: "#636e72",
                                                                            }}
                                                                        >
                                                                            Số
                                                                            lượng:{" "}
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                                color: "#ff7675",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.so_luong_sv
                                                                            }
                                                                        </span>
                                                                    </CCardText>
                                                                </CCardBody>
                                                            </CCard>
                                                        </CCol>
                                                    );
                                                })}
                                    </CRow>
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
                                                            Trần Ng Minh Thư
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
                                                            Phan Hoàng Anh
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
                                                            Nguyễn Thanh Bằng
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
                                            <a href="mailto:office@cit.ctu.edu.vn?Subject=Xin Chào CIT Interns!">
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InternshipDetail)
);
