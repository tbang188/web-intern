import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            sinhvien: "",
            noiquy: "",
            giogiac: "",
            giaotiep: "",
            tichcuc: "",
            dapungyccv: "",
            tthoctap: "",
            dexuatsangtao: "",
            baocaotiendo: "",
            donggop: "",
            hoanthanh: "",
            nhanxetkhac: "",
            ctdt: "",
            gopyctdt: "",
            ngaylap: "",
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
            "noiquy",
            "giogiac",
            "giaotiep",
            "tichcuc",
            "dapungyccv",
            "tthoctap",
            "dexuatsangtao",
            "baocaotiendo",
            "donggop",
            "hoanthanh",
            "nhanxetkhac",
            "ctdt",
            "gopyctdt",
            "ngaylap",
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

    handleonChangeDatePicker = (date) => {
        this.setState({
            ngaylap: date[0],
        });
    };

    render() {
        let tongdiem =
            Number(this.state.noiquy) +
            Number(this.state.giogiac) +
            Number(this.state.giaotiep) +
            Number(this.state.tichcuc) +
            Number(this.state.dapungyccv) +
            Number(this.state.tthoctap) +
            Number(this.state.dexuatsangtao) +
            Number(this.state.baocaotiendo) +
            Number(this.state.donggop) +
            Number(this.state.hoanthanh);

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
                        <span>Phiếu đánh giá</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {"(phiếu sẽ được gửi cho Giảng viên hướng dẫn)"}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.subject-id" /> */}
                                Ngày lập phiếu
                            </label>
                            <DatePicker
                                placeholder="dd/mm/yyyy"
                                onChange={this.handleonChangeDatePicker}
                                value={this.state.ngaylap}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Tinh thần kỷ
                                luật (điểm 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Thực hiện nội quy của cơ quan</label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "noiquy");
                                }}
                                value={this.state.noiquy}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Chấp hành giờ giấc làm việc
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "giogiac");
                                }}
                                value={this.state.giogiac}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Thái độ giao tiếp với cán bộ trong đơn vị
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "giaotiep");
                                }}
                                value={this.state.giaotiep}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Tích cực trong công việc
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "tichcuc");
                                }}
                                value={this.state.tichcuc}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Khả năng
                                chuyên môn, nghiệp vụ (điểm 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Điểm đáp ứng yêu cầu công việc
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "dapungyccv"
                                    );
                                }}
                                value={this.state.dapungyccv}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Tinh thần học hỏi, nâng cao trình độ
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "tthoctap");
                                }}
                                value={this.state.tthoctap}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Có đề xuất, sáng kiến, năng động trong công việc
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "dexuatsangtao"
                                    );
                                }}
                                value={this.state.dexuatsangtao}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Kết quả công
                                tác (điểm 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Báo cáo tiến độ công việc cho các bộ hướng dẫn
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "baocaotiendo"
                                    );
                                }}
                                value={this.state.baocaotiendo}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Hoàn thành công việc được giao
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "hoanthanh"
                                    );
                                }}
                                value={this.state.hoanthanh}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Kết quả công việc có đóng góp cho cơ quan nơi
                                thực tập
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào điểm"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "donggop");
                                }}
                                value={this.state.donggop}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="fas fa-user-edit"></i> Nhận xét khác
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
                                Nhận xét khác về sinh viên
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào nhận xét"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "nhanxetkhac"
                                    );
                                }}
                                value={this.state.nhanxetkhac}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Đánh giá của cơ quan về trương trình đào tạo
                                    (CTĐT)
                                </span>
                            </label>
                            {/* <input
                                type="text"
                                placeholder="Nhập vào đánh giá"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "nhanxetkhac"
                                    );
                                }}
                                value={this.state.nhanxetkhac}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Nhập vào đánh giá"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "ctdt");
                                }}
                                value={this.state.ctdt}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn đánh giá
                                </option>
                                <option className="option">
                                    Phù hợp với thực tế
                                </option>
                                <option className="option">
                                    Không phù hợp với thực tế
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Đề xuất góp ý của cơ quan về CTĐT
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập vào đề xuất góp ý"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "gopyctdt");
                                }}
                                value={this.state.gopyctdt}
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
                                <span>Tổng điểm: {tongdiem}/100</span>
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
                                    được gửi đi và không thể quay lại
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditRating);
