import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import LeftHomeHeader from "./LeftHomeHeader";
import {
    getDetailInternshipLocation, //ok
    createNewRegistrationFormService,
    getAllRegistrationFormByStudent, //ok
} from "../../services/userService";
import "./ViewInternshipDetail.scss";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ViewInternshipDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailInternshipLocation: [],
            maphieutiepnhan: "",
            phonglamviec: "",
            noidung: "",
            gio1ngay: "",
            ngay1tuan: "",
            tinhtrang: "101", //cho xet duyet
            nhanvien: "",
            sinhvien: "",
            macoquan: "",
            masinhvien: "",
            trangthai: "101", //cho xet duyet
            checkRegistration: 0,
        };
    }

    async componentDidMount() {
        let { userInfo } = this.props;

        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.ma_co_quan
        ) {
            let id = this.props.match.params.ma_co_quan;
            let res = await getDetailInternshipLocation(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailInternshipLocation: res.internship_location,
                });
            }
            // console.log(this.state.detailInternshipLocation);
        }
        await this.checkRegistrationForm();
    }

    checkRegistrationForm = async () => {
        let { userInfo } = this.props;
        let res2 = await getAllRegistrationFormByStudent(userInfo.s_id);
        if (res2 && res2.errCode === 0 && res2.registration_form.length === 1) {
            this.setState({ checkRegistration: 1 });
            // this.setState({
            //     detailRegistrationForm: res2.registration_form,
            // });
        } // mang thong tin phieu tiep nhan
    };

    handleonChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "maphieutiepnhan",
            "phonglamviec",
            "noidung",
            "gio1ngay",
            "ngay1tuan",
            "tinhtrang",
            "sinhvien",
            "macoquan",
            "masinhvien",
            "trangthai",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Nhập vào: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    createNewRegistrationForm = async (data) => {
        try {
            let response = await createNewRegistrationFormService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.checkRegistrationForm();
                toast.success(
                    "Đăng ký thực tập tại " +
                        data.phonglamviec +
                        " thành công!",
                    { duration: 6500 }
                );
                setTimeout(() => {
                    toast(
                        "Hãy truy cập vào trang Thông tin để kiểm tra phiếu và chờ xét duyệt từ giáo vụ khoa.",
                        {
                            duration: 8000,
                            style: {
                                color: "#6c5ce7",
                            },
                        }
                    );
                }, 500);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleAddNewRegistrationForm = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.createNewRegistrationForm(this.state);
        }
    };

    render() {
        const { processLogout, userInfo } = this.props;
        let id = this.props.match.params.ma_co_quan;
        let detailInternshipLocation = this.state.detailInternshipLocation;

        return (
            <React.Fragment>
                {/* menu trai */}
                <LeftHomeHeader />
                {/* menu tren */}
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
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
                                {/* Thong tin chi tiet dia diem thuc tap */}
                                {detailInternshipLocation &&
                                    detailInternshipLocation.map(
                                        (item, index) => {
                                            this.state.maphieutiepnhan =
                                                userInfo
                                                    ? userInfo.Nguoidung.s_id
                                                    : "none";
                                            this.state.phonglamviec =
                                                item.Coquan.ten_co_quan;
                                            this.state.noidung =
                                                item.noi_dung_cv;
                                            this.state.gio1ngay =
                                                item.gio_1tuan;
                                            this.state.ngay1tuan =
                                                item.gio_1tuan;
                                            this.state.tinhtrang = "101"; //cho xet duyet
                                            // this.state.nhanvien = item.;
                                            this.state.nhanvien = null;
                                            this.state.sinhvien = userInfo
                                                ? userInfo.Nguoidung.s_id
                                                : "none";
                                            this.state.macoquan =
                                                item.Coquan.ma_co_quan;
                                            this.state.masinhvien = userInfo
                                                ? userInfo.Nguoidung.s_id
                                                : "none";
                                            this.state.trangthai = "101"; //cho xet duyet
                                            // console.log(
                                            //     "check masinhvien: ",
                                            //     this.state.masinhvien
                                            // );
                                            return (
                                                <div className="welcome fade-in">
                                                    <p className="text-title tracking-in-expand-fwd company-name">
                                                        <i class="far fa-building"></i>{" "}
                                                        {
                                                            item.Coquan
                                                                .ten_co_quan
                                                        }
                                                    </p>
                                                    <div className="description">
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Tên cơ quan:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.Coquan
                                                                        .ten_co_quan
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Website:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.Coquan
                                                                        .website
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Số điện thoại cơ
                                                                quan:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.Coquan
                                                                        .sdt_co_quan
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Email cơ quan:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.Coquan
                                                                        .email_co_quan
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Địa chỉ cơ quan:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.Coquan
                                                                        .dia_chi
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Nội dung công
                                                                việc dự kiến cho
                                                                8 tuần:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.noi_dung_cv
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Môi trường làm
                                                                việc:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.moi_truong_lam_viec
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Yêu cầu của công
                                                                ty đối với sinh
                                                                viên thực tập:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.yeu_cau_sv
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Quyền lợi của
                                                                sinh viên - hỗ
                                                                trợ của công ty:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.quyen_loi_sv
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Số giờ ít nhất
                                                                mà sinh viên sẽ
                                                                được thực tập
                                                                tại công ty
                                                                trong 1 tuần:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.gio_1tuan}{" "}
                                                                giờ/tuần
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Số lượng sinh
                                                                viên tối đa công
                                                                ty có thể nhận:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item.so_luong_sv
                                                                }{" "}
                                                                sinh viên
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Ghi chú:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.ghi_chu}{" "}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    {/* nut dang ky - start*/}
                                                    {this.state
                                                        .checkRegistration ===
                                                    1 ? (
                                                        <div className="rigister-container">
                                                            <button
                                                                class="button button-rigister-done"
                                                                title="Đã đăng ký"
                                                            >
                                                                Bạn đã đăng ký
                                                                địa điểm thực
                                                                tập
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="rigister-container">
                                                            <button
                                                                class="button button-rigister"
                                                                onClick={() => {
                                                                    this.handleAddNewRegistrationForm();
                                                                }}
                                                                title="Đăng ký"
                                                            >
                                                                Bấm vào đây để
                                                                Đăng ký và chờ
                                                                Xét duyệt từ
                                                                giáo vụ khoa
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* nut dang ky - end*/}
                                                </div>
                                            );
                                        }
                                    )}

                                {/* footer */}
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
                        </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewInternshipDetail);
