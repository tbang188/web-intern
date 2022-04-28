import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "../../assets/icon-diadiem-35px.png";
import LeftHomeHeader from "./LeftHomeHeader";
import iconContact from "../../assets/icon-lienhe-35px.png";
import nttchung from "../../assets/nttchung.webp";
import tmtan from "../../assets/tmtan.png";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
} from "mdb-react-ui-kit";

class Contact extends Component {
    componentDidMount() {
        let { userInfo } = this.props;
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <React.Fragment>
                <LeftHomeHeader />
                {/* <div className="main-home-header"> */}
                <div className="home-header-container contact-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.contact" />
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
                                <div className="welcome fade-in">
                                    <div className="text-title tracking-in-expand-fwd ">
                                        {/* <i class="fas fa-file-alt"></i>{" "} */}
                                        <img
                                            class="emojione"
                                            title=":tada:"
                                            src={iconContact}
                                        />{" "}
                                        <FormattedMessage id="left-header.contact" />
                                    </div>

                                    <div className="description">
                                        <MDBRow>
                                            <MDBCol sm="6">
                                                <MDBCard
                                                    style={{
                                                        maxWidth: "540px",
                                                    }}
                                                >
                                                    <MDBRow className="g-0">
                                                        <MDBCol md="4">
                                                            <MDBCardImage
                                                                className="w-100"
                                                                src={nttchung}
                                                                alt="..."
                                                                style={{
                                                                    borderRadius:
                                                                        "50%",
                                                                }}
                                                            />
                                                        </MDBCol>
                                                        <MDBCol md="8">
                                                            <MDBCardBody>
                                                                <MDBCardTitle className="text-bold">
                                                                    Ths. CVC.
                                                                    Nguyễn Thị
                                                                    Thủy Chung
                                                                </MDBCardTitle>
                                                                <MDBCardText>
                                                                    Công tác đào
                                                                    tạo, công
                                                                    tác sinh
                                                                    viên, đảm
                                                                    bảo chất
                                                                    lượng, hợp
                                                                    tác quốc tế.
                                                                </MDBCardText>
                                                                <MDBCardText>
                                                                    <small className="text-muted">
                                                                        <i class="fas fa-phone"></i>{" "}
                                                                        02923832211
                                                                    </small>
                                                                    <br></br>
                                                                    <small className="text-muted">
                                                                        <i class="fas fa-envelope"></i>{" "}
                                                                        nttchung@cit.ctu.edu.vn
                                                                    </small>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            </MDBCol>

                                            <MDBCol sm="6">
                                                <MDBCard
                                                    style={{
                                                        maxWidth: "540px",
                                                    }}
                                                >
                                                    <MDBRow className="g-0">
                                                        <MDBCol md="4">
                                                            <MDBCardImage
                                                                className="w-100"
                                                                src={tmtan}
                                                                alt="..."
                                                                style={{
                                                                    borderRadius:
                                                                        "50%",
                                                                }}
                                                            />
                                                        </MDBCol>
                                                        <MDBCol md="8">
                                                            <MDBCardBody>
                                                                <MDBCardTitle className="text-bold">
                                                                    Ths. Trần
                                                                    Minh Tân
                                                                </MDBCardTitle>
                                                                <MDBCardText>
                                                                    Công tác đào
                                                                    tạo sau đại
                                                                    học, NCKH,
                                                                    webmaster.
                                                                </MDBCardText>
                                                                <MDBCardText>
                                                                    <small className="text-muted">
                                                                        <i class="fas fa-phone"></i>{" "}
                                                                        02923734713
                                                                    </small>
                                                                    <br></br>
                                                                    <small className="text-muted">
                                                                        <i class="fas fa-envelope"></i>{" "}
                                                                        tmtan@cit.ctu.edu.vn
                                                                    </small>
                                                                </MDBCardText>
                                                            </MDBCardBody>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="text-title tracking-in-expand-fwd "></div>

                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8273293750863!2d105.76699151426172!3d10.03110357525149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zS2hvYSBDw7RuZyBOZ2jhu4cgVGjDtG5nIFRpbiB2w6AgVHJ1eeG7gW4gVGjDtG5nIChDVFUp!5e0!3m2!1svi!2s!4v1638883418466!5m2!1svi!2s"
                                            width="100%"
                                            height="410"
                                            style={{ border: "0" }}
                                            allowfullscreen=""
                                            loading="lazy"
                                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
