import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import {
    getAllRatingSheet,
    getAllScoreSheet,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ModalDetailScoreSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            arrDetail: [],
            sinhvien: "",
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
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                sinhvien: user.sinh_vien,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let user = this.props.currentUser;
        let response = await getAllScoreSheet(user.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrDetail: response.score_sheet, // using for review
                format: response.score_sheet[0].format,
                trinhbay: response.score_sheet[0].trinh_bay,
                lichlamviec: response.score_sheet[0].lich_lam_viec,
                sobuoithuctap: response.score_sheet[0].so_buoi_thuc_tap,
                kehoachcongtac: response.score_sheet[0].ke_hoach_cong_tac,
                kehoachcongtac: response.score_sheet[0].ke_hoach_cong_tac,
                hieubietcoquan: response.score_sheet[0].hieu_biet_co_quan,
                ppthuchien: response.score_sheet[0].pp_thuc_hien,
                cungcolythuyet: response.score_sheet[0].cung_co_ly_thuyet,
                kynangthuchanh: response.score_sheet[0].ky_nang_thuc_hanh,
                kinhnghiemthuctien:
                    response.score_sheet[0].kinh_nghiem_thuc_tien,
                donggopcoquan: response.score_sheet[0].dong_gop_co_quan,
                khongsinhhoat: response.score_sheet[0].khong_sinh_hoat,
                khongphieugiaoviec:
                    response.score_sheet[0].khong_phieu_giao_viec,
            });
        }
    };

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        let arrDetail = this.state.arrDetail;
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

        let diemtru =
            Number(this.state.khongsinhhoat) +
            Number(this.state.khongphieugiaoviec);

        let diemconlai =
            tongdiem -
            Number(this.state.khongsinhhoat) -
            Number(this.state.khongphieugiaoviec);

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <div>
                        <i class="fas fa-tasks"></i>{" "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        <span>Phiếu chấm điểm</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {/* {"(phiếu này được gửi từ Cán bộ hướng dẫn)"} */}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Hình thức
                                trình bày (điểm tối đa 1.0)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <span>Đúng format của khoa</span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.format}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                <span>Trình bày mạch lạc, chính tả</span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.trinhbay}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i>
                                <span> Phiếu theo dõi</span>
                                <span> (điểm tối đa 4.75)</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Có lịch làm việc đầy đủ cho 8 tuần</span>
                                <span className="red-text"> (tối đa 0.25)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.lichlamviec}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Số buổi thực tập tại cơ quan trong 1 tuần ≥
                                    6
                                </span>
                                <span className="red-text">
                                    {" "}
                                    (tối đa 1.0, ít hơn 6 buổi 0.0 điểm)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.sobuoithuctap}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Hoàn thành tốt kế hoạch công tác ghi trong
                                    lịch làm việc. Cách tính điểm = (Điểm cộng
                                    của cán bộ hướng dẫn/100) x 3.5
                                </span>
                                <span className="red-text"> (tối đa 3.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kehoachcongtac}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Nội dung
                                thực tập - quyển báo cáo (điểm tối đa 4.25)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Có được sự hiểu biết tốt về cơ quan nơi thực
                                    tập
                                </span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.hieubietcoquan}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Phương pháp thực hiện phù hợp với nội dung
                                    công việc được giao
                                </span>
                                <span className="red-text"> (tối đa 1.0)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.ppthuchien}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Kết quả củng cố lý thuyết</span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.cungcolythuyet}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Kết quả rèn luyện kỹ năng thực hành</span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kynangthuchanh}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Kinh nghiệm thực tiễn thu nhận được</span>
                                <span className="red-text"> (tối đa 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kinhnghiemthuctien}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Kết quả công việc có đóng góp cho cơ quan
                                    nơi thực tập
                                </span>
                                <span className="red-text"> (tối đa 1.25)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.donggopcoquan}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#6c5ce7",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-star"></i>{" "}
                                <span>Tổng điểm: {tongdiem}/10</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#d63031",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-exclamation-circle"></i> Điểm
                                trừ: {diemtru}
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Dự họp để nghe phổ biến TTTT </span>
                                <span className="red-text">
                                    {" "}
                                    (KHÔNG DỰ HỌP: trừ 1 điểm)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.khongsinhhoat}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Gởi phiếu giao việc về khoa</span>
                                <span className="red-text">
                                    {" "}
                                    (KHÔNG ĐÚNG HẠN: trừ 1 điểm)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.khongphieugiaoviec}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#6c5ce7",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-star"></i>{" "}
                                <span>Điểm còn lại: {diemconlai}/10</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        className="btn-secondary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        <i class="fas fa-times"></i>
                        {/* <FormattedMessage id="menu.admin.close" /> */}
                        <span>Đóng</span>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalDetailScoreSheet);
