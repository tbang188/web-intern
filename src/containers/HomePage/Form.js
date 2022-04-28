import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
//import "./Form.scss";
import { FormattedMessage } from "react-intl";
import Company from "./Section/Company";
import "../../assets/icon-diadiem-35px.png";
import phieutiepnhan from "../../assets/phieu-tiep-nhan.png";
import phieugiaoviec from "../../assets/phieu-giao-viec.png";
import phieutheodoi from "../../assets/phieu-theo-doi.png";
import phieudanhgiaketquatt from "../../assets/phieu-danh-gia.png";
import phieudanhgiabaocao from "../../assets/phieu-danh-gia-bao-cao.png";
import maubaocao from "../../assets/mau-bao-cao.png";
import LeftHomeHeader from "./LeftHomeHeader";
import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CRow } from "@coreui/react";
import { CCol } from "@coreui/react";
import { CCardImage } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import CardBackground from "../../assets/bieumau.jpg";
import iconForm from "../../assets/icon-mauphieu-35px.png";

class Form extends Component {
    componentDidMount() {
        let { userInfo } = this.props;
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <React.Fragment>
                <LeftHomeHeader />
                {/* <div className="main-home-header"> */}
                <div className="home-header-container form-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.form" />
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
                                    <div className="text-title tracking-in-expand-fwd ">
                                        {/* <i class="fas fa-file-alt"></i>{" "} */}
                                        <img
                                            class="emojione"
                                            title=":tada:"
                                            src={iconForm}
                                        />{" "}
                                        <FormattedMessage id="left-header.form" />
                                    </div>

                                    <div className="description">
                                        <CRow
                                            xs={{ cols: 1 }}
                                            md={{ cols: 3 }}
                                            className="g-4"
                                        >
                                            {/* Phiếu tiếp nhận sinh viên thực tập thức tế */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={phieutiepnhan}
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Phiếu tiếp nhận sinh
                                                            viên thực tập thức
                                                            tế
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1hSXG2gnKXj3M-3al9u-QQktSjlR3vKxr"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            {/* Phiếu giao việc cho sinh viên thực tập thực tế */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={phieugiaoviec}
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Phiếu giao việc cho
                                                            sinh viên thực tập
                                                            thực tế
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1XyOlCWNnjJAAQIhom7EVcX_XFqA5IFaZ"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            {/* Phiếu theo dõi sinh viên thực tập thực tế */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={phieutheodoi}
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Phiếu theo dõi sinh
                                                            viên thực tập thực
                                                            tế
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1793fTprPiWre0LHTf9ZqT1GfkozJWzII"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            {/* Phiếu đánh giá kết quả thực tập thực tế */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={
                                                            phieudanhgiaketquatt
                                                        }
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Phiếu đánh giá kết
                                                            quả thực tập thực tế
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1bphK4dEqDIZX0blrTvvreJJ51bdJcg-g"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            {/* Phiếu đánh giá báo cáo kết quả thực tập thực tế */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={phieudanhgiabaocao}
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Phiếu đánh giá báo
                                                            cáo kết quả thực tập
                                                            thực tế
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1Jk6Bfeki2jIzKlF22gxmNNobbhn2lKNa"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            {/* Mẫu báo cáo */}
                                            <CCol xs>
                                                <CCard className="h-100 card-data">
                                                    <CCardImage
                                                        orientation="top"
                                                        src={maubaocao}
                                                    />
                                                    <CCardBody>
                                                        <CCardTitle
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Mẫu báo cáo
                                                        </CCardTitle>
                                                        <CCardText>
                                                            <a
                                                                href="https://drive.google.com/uc?export=download&id=1gKs-OneMmk5mAck-NCqpPL4vfL0-YyWM"
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "#00b894",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline-primary"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            margin: "8px",
                                                                        }}
                                                                    >
                                                                        <i class="fas fa-cloud-download-alt"></i>
                                                                        Tải
                                                                        xuống
                                                                    </span>
                                                                </button>
                                                            </a>
                                                        </CCardText>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                        </CRow>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
