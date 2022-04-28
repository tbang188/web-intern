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
                                                Sinh viên tìm kiếm địa điểm thực
                                                tập tại chức năng{" "}
                                                <Link
                                                    to="/internship-location"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    ĐỊA ĐIỂM THỰC TẬP
                                                </Link>
                                                . Sau khi tìm được địa điểm phù
                                                hợp với năng lực bản thân thì
                                                bấm vào nút Đăng ký và chờ xét
                                                duyệt từ{" "}
                                                <span>Giáo vụ khoa</span>. Trong
                                                thời gian này sinh viên có thể
                                                vào chức năng{" "}
                                                <Link
                                                    to="/information"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    THÔNG TIN
                                                </Link>{" "}
                                                để xem các{" "}
                                                <span>Thông tin cá nhân</span>{" "}
                                                và tình trạng{" "}
                                                <span>
                                                    Phiếu đăng ký thực tập
                                                </span>
                                                .
                                            </p>
                                            <p>
                                                Sau khi{" "}
                                                <span>
                                                    Phiếu đăng ký thực tập
                                                </span>{" "}
                                                được duyệt thì sẽ hiện đầy đủ
                                                thông tin{" "}
                                                <span>Cán bộ hướng dẫn</span> và{" "}
                                                <span>Giảng viên</span> phụ
                                                trách,{" "}
                                                <span>Phiếu giao việc</span> sẽ
                                                được{" "}
                                                <span>Cán bộ hướng dẫn</span>{" "}
                                                cập nhật liên tục để sinh viên
                                                có thể nắm được lịch trình công
                                                việc phải làm trong suốt 8 tuần
                                                thực tập tại cơ quan.
                                            </p>
                                            <p>
                                                Kết thúc kỳ thực tập sinh viên
                                                sẽ vào chức năng{" "}
                                                <Link
                                                    to="/submit"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    NỘP BÁO CÁO
                                                </Link>{" "}
                                                để nộp file báo cáo về cho{" "}
                                                <span>Giảng viên</span> phụ
                                                trách để chấm điểm cuối khóa.
                                                Sau khi có điểm từ{" "}
                                                <span>Giảng viên</span> thì hệ
                                                thống sẽ tự cập nhật ở phần chức
                                                năng{" "}
                                                <Link
                                                    to="/information"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    THÔNG TIN
                                                </Link>
                                                . Trong suốt quá trình thực tập
                                                nếu có vướng mắc về hệ thống bạn
                                                có thể vào trang chức năng{" "}
                                                <Link
                                                    to="/contact"
                                                    className="text-bold hover-link-text non-underline"
                                                >
                                                    LIÊN HỆ
                                                </Link>
                                                , trong đây sẽ có đủ thông tin
                                                liên quan giúp bạn giải đáp thắc
                                                mắc.
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

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
