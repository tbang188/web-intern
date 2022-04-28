import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import LeftHomeHeader from "./LeftHomeHeader";
import {
    getAllRegistrationFormByStudent, //ok
    getAllStudentById, //ok
    getAllEmployee,
    getAllLecturer,
    getAllRegistrationForm,
    getAllAssignmentSheet,
    getAllDetailAssignmentSheetById,
    getAllScoreSheet,
} from "../../services/userService";
import "./ViewInternshipDetail.scss";
import DatePicker from "../../components/Input/DatePicker";
import moment from "moment";
import Collapsible from "react-collapsible";

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailRegistrationForm: [],
            arrStudentInformation: [],
            arrLecturer: [],
            arrEmployee: [],
            giangvien_id: "",
            nhanvien_id: "",
            lecturer_name: "",
            lecturer_email: "",
            employee_name: "",
            employee_email: "",
            id_form: "",
            arrSheet: [],
            arrDetailSheet: [],
            detailScoreSheet: [],
            // ------------
            format: "",
            trinhbay: "",
            lichlamviec: "",
            sobuoithuctap: "",
            kehoachcongtac: "",
            kehoachcongtac: "",
            hieubietcoquan: "",
            ppthuchien: "",
            cungcolythuyet: "",
            kynangthuchanh: "",
            kinhnghiemthuctien: "",
            donggopcoquan: "",
            khongsinhhoat: "",
            khongphieugiaoviec: "",
        };
    }

    async componentDidMount() {
        let userInfo = this.props.userInfo;
        // console.log("check User:", userInfo);

        let res1 = await getAllStudentById(userInfo.s_id);
        if (res1 && res1.errCode === 0) {
            this.setState({ arrStudentInformation: res1.users });
        } // mang thong tin sv
        // console.log("check Student:", res1);

        let res2 = await getAllRegistrationFormByStudent(userInfo.s_id);
        if (res2 && res2.errCode === 0) {
            this.setState({
                detailRegistrationForm: res2.registration_form,
            });
        } // mang thong tin phieu tiep nhan
        // console.log("check Form:", res2);
        res2.registration_form.map((item) => {
            let nhan_vien = item.Phieutiepnhan.nhan_vien;
            if (nhan_vien !== null) {
                this.setState({
                    nhanvien_id: nhan_vien,
                    id_form: item.Phieutiepnhan.id,
                });
            } else {
                this.setState({
                    nhanvien_id: "",
                });
            }
            // console.log("check res Employee:", nhan_vien);
        });

        let res4 = await getAllEmployee(this.state.nhanvien_id);
        if (res4 && res4.errCode === 0) {
            this.setState({
                employee_name: res4.users.Nguoidung.ho_ten,
                employee_email: res4.users.Nguoidung.email,
            });
        } // mang thong tin phieu tiep nhan
        // console.log("check Employee:", this.state.employee_name);

        res2.registration_form.map((item) => {
            let giang_vien = item.Chitietphancong.giang_vien;
            if (giang_vien !== null) {
                this.setState({
                    giangvien_id: giang_vien,
                });
            } else {
                this.setState({
                    giangvien_id: "",
                });
            }
            // console.log("check res Lecturer:", giang_vien);
        });

        let res3 = await getAllLecturer(this.state.giangvien_id);
        if (res3 && res3.errCode === 0) {
            this.setState({
                lecturer_name: res3.users.Nguoidung.ho_ten,
                lecturer_email: res3.users.Nguoidung.email,
            });
        } else {
            this.setState({
                lecturer_name: "",
                lecturer_email: "",
            });
        } // mang thong tin phieu tiep nhan
        // console.log("check Lecturer:", this.state.lecturer_name);

        let res5 = await getAllAssignmentSheet(this.state.id_form);
        if (res5 && res5.errCode === 0) {
            this.setState({
                arrSheet: res5.sheet,
            });
        } else {
            // this.setState({ arrSheet: "" });
        }

        let res6 = await getAllDetailAssignmentSheetById(this.state.id_form);
        if (res6 && res6.errCode === 0) {
            this.setState({
                arrDetailSheet: res6.detail_sheet,
            });
        } else {
            // this.setState({ arrSheet: "" });
        }

        let res7 = await getAllScoreSheet(this.state.id_form);
        // console.log("check Score Sheet:", res7.score_sheet);
        if (res7 && res7.errCode === 0 && res7.score_sheet.length === 1) {
            this.setState({
                detailScoreSheet: res7.score_sheet,
                format: res7.score_sheet[0].format,
                trinhbay: res7.score_sheet[0].trinh_bay,
                lichlamviec: res7.score_sheet[0].lich_lam_viec,
                sobuoithuctap: res7.score_sheet[0].so_buoi_thuc_tap,
                kehoachcongtac: res7.score_sheet[0].ke_hoach_cong_tac,
                kehoachcongtac: res7.score_sheet[0].ke_hoach_cong_tac,
                hieubietcoquan: res7.score_sheet[0].hieu_biet_co_quan,
                ppthuchien: res7.score_sheet[0].pp_thuc_hien,
                cungcolythuyet: res7.score_sheet[0].cung_co_ly_thuyet,
                kynangthuchanh: res7.score_sheet[0].ky_nang_thuc_hanh,
                kinhnghiemthuctien: res7.score_sheet[0].kinh_nghiem_thuc_tien,
                donggopcoquan: res7.score_sheet[0].dong_gop_co_quan,
                khongsinhhoat: res7.score_sheet[0].khong_sinh_hoat,
                khongphieugiaoviec: res7.score_sheet[0].khong_phieu_giao_viec,
            });
        } else {
        } // mang thong tin phieu tiep nhan
    }

    render() {
        const { processLogout, userInfo } = this.props;

        let detailRegistrationForm = this.state.detailRegistrationForm;
        let arrStudentInformation = this.state.arrStudentInformation;
        let arrSheet = this.state.arrSheet;
        let arrDetailSheet = this.state.arrDetailSheet;
        let detailScoreSheet = this.state.detailScoreSheet;

        // console.log("check render Student:", arrStudentInformation);
        // console.log("check render Form:", detailRegistrationForm);
        // console.log("check id_form: ", this.state.id_form);
        // console.log("check detail_sheet: ", arrDetailSheet);

        let tongdiem =
            Number(this.state.format) +
            Number(this.state.trinhbay) +
            Number(this.state.lichlamviec) +
            Number(this.state.sobuoithuctap) +
            Number(this.state.kehoachcongtac) +
            Number(this.state.hieubietcoquan) +
            Number(this.state.ppthuchien) +
            Number(this.state.cungcolythuyet) +
            Number(this.state.kynangthuchanh) +
            Number(this.state.kinhnghiemthuctien) +
            Number(this.state.donggopcoquan);
        // console.log("check Tong diem: ", tongdiem);

        let diemtru =
            Number(this.state.khongsinhhoat) +
            Number(this.state.khongphieugiaoviec);
        // console.log("check Diem tru: ", diemconlai);

        let diemconlai =
            tongdiem -
            Number(this.state.khongsinhhoat) -
            Number(this.state.khongphieugiaoviec);
        // console.log("check Diem con lai: ", diemconlai);

        const ttcanhan_close = (
            <p className="text-title tracking-in-expand-fwd infomation-form-name">
                <i class="fas fa-angle-right gray-text"></i>{" "}
                <i class="fas fa-address-card"></i> Thông tin cá nhân
            </p>
        );
        const ttcanhan_open = (
            <p className="text-title tracking-in-expand-fwd infomation-form-name">
                <i class="fas fa-angle-down gray-text"></i>{" "}
                <i class="fas fa-address-card"></i> Thông tin cá nhân
            </p>
        );

        const tttiepnhan_close = (
            <p className="text-title tracking-in-expand-fwd registration-form-name">
                <i class="fas fa-angle-right gray-text"></i>{" "}
                <i class="fas fa-paper-plane"></i> Thông tin tóm tắt Phiếu tiếp
                nhận
            </p>
        );
        const tttiepnhan_open = (
            <p className="text-title tracking-in-expand-fwd registration-form-name">
                <i class="fas fa-angle-down gray-text"></i>{" "}
                <i class="fas fa-paper-plane"></i> Thông tin tóm tắt Phiếu tiếp
                nhận
            </p>
        );

        const ttgiaoviec_close = (
            <p className="text-title tracking-in-expand-fwd orange-text">
                <i class="fas fa-angle-right gray-text"></i>{" "}
                <i class="fas fa-thumbtack"></i> Phiếu giao việc [8 tuần]
            </p>
        );
        const ttgiaoviec_open = (
            <p className="text-title tracking-in-expand-fwd orange-text">
                <i class="fas fa-angle-down gray-text"></i>{" "}
                <i class="fas fa-thumbtack"></i> Phiếu giao việc [8 tuần]
            </p>
        );

        const ttchamdiem_close = (
            <p className="text-title tracking-in-expand-fwd red-text">
                <i class="fas fa-angle-right gray-text"></i>{" "}
                <i class="fas fa-star"></i>{" "}
                <span>Phiếu chấm điểm (do giảng viên</span>{" "}
                <span>{this.state.lecturer_name}</span> <span>chấm)</span>
            </p>
        );
        const ttchamdiem_open = (
            <p className="text-title tracking-in-expand-fwd red-text">
                <i class="fas fa-angle-down gray-text"></i>{" "}
                <i class="fas fa-star"></i>{" "}
                <span>Phiếu chấm điểm (do giảng viên</span>{" "}
                <span>{this.state.lecturer_name}</span> <span>chấm)</span>
            </p>
        );

        return (
            <React.Fragment>
                {/* menu trai */}
                <LeftHomeHeader />
                {/* menu tren */}
                <div className="home-header-container infomation-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.information" />
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
                                {/* Thong tin sinh vien */}
                                {arrStudentInformation &&
                                    arrStudentInformation.map((item, index) => {
                                        return (
                                            <div className="welcome fade-in ">
                                                <Collapsible
                                                    trigger={ttcanhan_close}
                                                    triggerWhenOpen={
                                                        ttcanhan_open
                                                    }
                                                    easing="ease"
                                                >
                                                    <div className="description">
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Họ và tên:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.ho_ten}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                MSSV:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.s_id}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Mã lớp:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {
                                                                    item
                                                                        .Sinhvien
                                                                        .ma_lop
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Địa chỉ:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.dia_chi}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Email:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.email}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail">
                                                                Số điện thoại:{" "}
                                                            </span>
                                                            <span className="company-detail-data">
                                                                {item.sdt}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </Collapsible>
                                            </div>
                                        );
                                    })}

                                {/* Thong tin phieu tiep nhan */}
                                {detailRegistrationForm &&
                                    detailRegistrationForm.map(
                                        (item, index) => {
                                            return (
                                                <div className="welcome fade-in">
                                                    <Collapsible
                                                        trigger={
                                                            tttiepnhan_close
                                                        }
                                                        triggerWhenOpen={
                                                            tttiepnhan_open
                                                        }
                                                        easing="ease"
                                                    >
                                                        <div className="description">
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Mã số sinh
                                                                    viên đăng
                                                                    ký:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {
                                                                        item.ma_sinh_vien
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Mã phiếu
                                                                    tiếp nhận:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {item.id}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Mã cơ quan:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {
                                                                        item.ma_co_quan
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Tên cơ quan:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .phong_lam_viec
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Cán bộ/Nhân
                                                                    viên hướng
                                                                    dẫn:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {item
                                                                        .Phieutiepnhan
                                                                        .nhan_vien ==
                                                                    null ? (
                                                                        <span
                                                                            style={{
                                                                                color: "#e17055",
                                                                            }}
                                                                        >
                                                                            Chưa
                                                                            cập
                                                                            nhật
                                                                            thông
                                                                            tin
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .employee_name
                                                                            }
                                                                            {
                                                                                " | MSCB: "
                                                                            }
                                                                            {
                                                                                item
                                                                                    .Phieutiepnhan
                                                                                    .nhan_vien
                                                                            }
                                                                            {
                                                                                " | Email liên hệ: "
                                                                            }
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .employee_email
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Nội dung
                                                                    công việc:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .noi_dung
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Số giờ làm
                                                                    việc/tuần:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .gio_1ngay
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Trạng thái:{" "}
                                                                </span>
                                                                <span className="company-detail-data text-bold">
                                                                    {item.trang_thai ==
                                                                    "101" ? (
                                                                        <span
                                                                            style={{
                                                                                color: "#e17055",
                                                                            }}
                                                                        >
                                                                            Chờ
                                                                            duyệt
                                                                            ...
                                                                        </span>
                                                                    ) : (
                                                                        <span
                                                                            style={{
                                                                                color: "#0984e3",
                                                                            }}
                                                                        >
                                                                            Đã
                                                                            được
                                                                            duyệt!
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <span className="text-bold company-detail">
                                                                    Giảng viên
                                                                    hướng dẫn:{" "}
                                                                </span>
                                                                <span className="company-detail-data">
                                                                    {item
                                                                        .Chitietphancong
                                                                        .giang_vien ==
                                                                    null ? (
                                                                        <span
                                                                            style={{
                                                                                color: "#e17055",
                                                                            }}
                                                                        >
                                                                            Chưa
                                                                            phân
                                                                            công
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .lecturer_name
                                                                            }
                                                                            {
                                                                                " | MSCB: "
                                                                            }
                                                                            {
                                                                                item
                                                                                    .Chitietphancong
                                                                                    .giang_vien
                                                                            }
                                                                            {
                                                                                " | Email liên hệ: "
                                                                            }
                                                                            {
                                                                                this
                                                                                    .state
                                                                                    .lecturer_email
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </Collapsible>
                                                </div>
                                            );
                                        }
                                    )}

                                {/* Thong tin phieu giao viec */}
                                {detailRegistrationForm &&
                                    detailRegistrationForm.map(
                                        (item, index) => {
                                            return (
                                                <div className="welcome fade-in">
                                                    <Collapsible
                                                        trigger={
                                                            ttgiaoviec_close
                                                        }
                                                        triggerWhenOpen={
                                                            ttgiaoviec_open
                                                        }
                                                        easing="ease"
                                                    >
                                                        <div className="description">
                                                            {arrSheet &&
                                                                arrSheet.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <div>
                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Ngày
                                                                                        bắt
                                                                                        đầu
                                                                                        thực
                                                                                        tập:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data">
                                                                                        <DatePicker
                                                                                            disabled
                                                                                            value={
                                                                                                item.ngay_bd_thuc_tap
                                                                                            }
                                                                                        />
                                                                                        {/* {
                                                                                        item.ngay_bd_thuc_tap
                                                                                    } */}
                                                                                    </span>
                                                                                </p>

                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Ngày
                                                                                        kết
                                                                                        thúc
                                                                                        thực
                                                                                        tập:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data">
                                                                                        <DatePicker
                                                                                            disabled
                                                                                            value={
                                                                                                item.ngay_kt_thuc_tap
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}

                                                            {/* Tuần 1 */}
                                                            {arrDetailSheet &&
                                                                arrDetailSheet.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <div>
                                                                                <p>
                                                                                    <span className="text-bold company-detail assignment-sheet-week">
                                                                                        <i class="far fa-calendar-alt"></i>

                                                                                        *
                                                                                        TUẦN
                                                                                        LÀM
                                                                                        VIỆC
                                                                                        THỨ{" "}
                                                                                        {
                                                                                            item.tuan_thu
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Ngày
                                                                                        bắt
                                                                                        đầu:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data ">
                                                                                        <DatePicker
                                                                                            disabled
                                                                                            value={
                                                                                                item.ngay_bd
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                </p>
                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Số
                                                                                        buổi
                                                                                        làm
                                                                                        việc:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data ">
                                                                                        {
                                                                                            item.so_buoi
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Nội
                                                                                        dung
                                                                                        công
                                                                                        việc:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data ">
                                                                                        {
                                                                                            item.viec_lam
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                                <p>
                                                                                    <span className="text-bold company-detail">
                                                                                        Ghi
                                                                                        chú:{" "}
                                                                                    </span>
                                                                                    <span className="company-detail-data ">
                                                                                        {
                                                                                            item.ghi_chu
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                        </div>
                                                    </Collapsible>
                                                </div>
                                            );
                                        }
                                    )}

                                {/* Thong tin phieu cham diem */}
                                {detailScoreSheet &&
                                    detailScoreSheet.map((item, index) => {
                                        return (
                                            <div className="welcome fade-in">
                                                <Collapsible
                                                    trigger={ttchamdiem_close}
                                                    triggerWhenOpen={
                                                        ttchamdiem_open
                                                    }
                                                    easing="ease"
                                                >
                                                    <div className="description">
                                                        <p>
                                                            <span className="text-bold company-detail assignment-sheet-week">
                                                                1. HÌNH THỨC
                                                                TRÌNH BÀY (điểm
                                                                tối đa 1.0)
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Đúng format của
                                                                khoa (điểm tối
                                                                đa 0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {item.format}
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Trình bày mạch
                                                                lạc, chính tả
                                                                (điểm tối đa
                                                                0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {item.trinh_bay}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail assignment-sheet-week">
                                                                2. PHIẾU THEO
                                                                DÕI (điểm tối đa
                                                                4.75)
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Có lịch làm việc
                                                                đầy đủ cho 8
                                                                tuần (tối đa
                                                                0.25):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {" "}
                                                                {
                                                                    item.lich_lam_viec
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Số buổi thực tập
                                                                tại cơ quan
                                                                trong 1 tuần ≥ 6
                                                                (tối đa 1.0, ít
                                                                hơn 6 buổi 0.0
                                                                điểm):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {" "}
                                                                {
                                                                    item.so_buoi_thuc_tap
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Hoàn thành tốt
                                                                kế hoạch công
                                                                tác ghi trong
                                                                lịch làm việc.
                                                                Cách tính điểm =
                                                                (Điểm cộng của
                                                                cán bộ hướng
                                                                dẫn/100) x 3.5
                                                                (tối đa 3.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.ke_hoach_cong_tac
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold company-detail assignment-sheet-week">
                                                                3. NỘI DUNG THỰC
                                                                TẬP - QUYỀN BÁO
                                                                CÁO (điểm tối đa
                                                                4.25)
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Có được sự hiểu
                                                                biết tốt về cơ
                                                                quan nơi thực
                                                                tập (tối đa
                                                                0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.hieu_biet_co_quan
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Phương pháp thực
                                                                hiện phù hợp với
                                                                nội dung công
                                                                việc được giao
                                                                (tối đa 1.0):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.pp_thuc_hien
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Kết quả củng cố
                                                                lý thuyết (tối
                                                                đa 0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.cung_co_ly_thuyet
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Kết quả rèn
                                                                luyện kỹ năng
                                                                thực hành (tối
                                                                đa 0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.ky_nang_thuc_hanh
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Kinh nghiệm thực
                                                                tiễn thu nhận
                                                                được (tối đa
                                                                0.5):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.kinh_nghiem_thuc_tien
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-check-circle"></i>{" "}
                                                                Kết quả công
                                                                việc có đóng góp
                                                                cho cơ quan nơi
                                                                thực tập (tối đa
                                                                1.25):{" "}
                                                            </span>
                                                            <span className="orange-text">
                                                                {
                                                                    item.dong_gop_co_quan
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold purple-text">
                                                                <i class="fas fa-star-half"></i>{" "}
                                                                TỔNG ĐIỂM 3
                                                                PHẦN: {tongdiem}
                                                                /10
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold red-text">
                                                                4. ĐIỂM TRỪ:{" "}
                                                                {diemtru}
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-times-circle"></i>{" "}
                                                                Dự họp để nghe
                                                                phổ biến TTTT
                                                                (KHÔNG DỰ HỌP:
                                                                trừ 1 điểm):{" "}
                                                            </span>
                                                            <span className="red-text">
                                                                {
                                                                    item.khong_sinh_hoat
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="mx-4">
                                                            <span className="text-bold company-detail">
                                                                <i class="far fa-times-circle"></i>{" "}
                                                                Gởi phiếu giao
                                                                việc về khoa
                                                                (KHÔNG ĐÚNG HẠN:
                                                                trừ 1 điểm):{" "}
                                                            </span>
                                                            <span className="red-text">
                                                                {
                                                                    item.khong_phieu_giao_viec
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="text-bold purple-text">
                                                                <i class="fas fa-star"></i>{" "}
                                                                TỔNG ĐIỂM CÒN
                                                                LẠI:{" "}
                                                                {diemconlai}/10
                                                            </span>
                                                        </p>
                                                    </div>
                                                </Collapsible>
                                            </div>
                                        );
                                    })}

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

export default connect(mapStateToProps, mapDispatchToProps)(Information);
