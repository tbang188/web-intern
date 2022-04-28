import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
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
    }

    toggle = () => {
        this.props.toggleFromParent();
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
            "id",
            "sinhvien",
            "format",
            "trinhbay",
            "lichlamviec",
            "sobuoithuctap",
            "kehoachcongtac",
            "kehoachcongtac",
            "hieubietcoquan",
            "ppthuchien",
            "cungcolythuyet",
            "kynangthuchanh",
            "kinhnghiemthuctien",
            "donggopcoquan",
            "khongsinhhoat",
            "khongphieugiaoviec",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error("Hãy điền đầy đủ thông tin để hoàn thành!", {
                    duration: 6500,
                });
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    };

    render() {
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
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <div>
                        <i class="fas fa-tasks"></i>
                        {"   "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        <span>Phiếu chấm điểm</span>
                        {" | "}
                        {this.state.id}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "format");
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "trinhbay");
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "lichlamviec"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "sobuoithuctap"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kehoachcongtac"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "hieubietcoquan"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "ppthuchien"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "cungcolythuyet"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kynangthuchanh"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kinhnghiemthuctien"
                                    );
                                }}
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
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "donggopcoquan"
                                    );
                                }}
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
                            <select
                                id="mySelect"
                                type="text"
                                // placeholder="Nhập vào đánh giá"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "khongsinhhoat"
                                    );
                                }}
                                value={this.state.khongsinhhoat}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn
                                </option>
                                <option className="option" value="0">
                                    CÓ DỰ HỌP
                                </option>
                                <option className="option" value="1">
                                    KHÔNG DỰ HỌP
                                </option>
                            </select>
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
                            <select
                                id="mySelect"
                                type="text"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "khongphieugiaoviec"
                                    );
                                }}
                                value={this.state.khongphieugiaoviec}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn
                                </option>
                                <option className="option" value="0">
                                    GỞI ĐÚNG HẠN
                                </option>
                                <option className="option" value="1">
                                    KHÔNG GỞI/GỞI KHÔNG ĐÚNG HẠN
                                </option>
                            </select>
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
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span
                                    style={{
                                        color: "#e74c3c",
                                    }}
                                >
                                    * Chú ý: Kiểm tra kỹ thông tin, phiếu sẽ
                                    được LƯU và KHÔNG THỂ SỬA ĐỔI!
                                </span>
                            </label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-primary px-3"
                        onClick={() => {
                            this.handleSaveUser();
                        }}
                    >
                        <i class="fas fa-check"></i>
                        <FormattedMessage id="menu.admin.confirm" />
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className="btn-secondary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        <i class="fas fa-times"></i>
                        <FormattedMessage id="menu.admin.close" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditScore);
