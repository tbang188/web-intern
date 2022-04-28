import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import {
    getAllAssignmentSheet,
    getAllDetailAssignmentSheet,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ModalDetailAssignmentSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            ngaybdthuctap: "",
            ngayktthuctap: "",

            vieclam1: "",
            vieclam2: "",
            vieclam3: "",
            vieclam4: "",
            vieclam5: "",
            vieclam6: "",
            vieclam7: "",
            vieclam8: "",

            sobuoi1: "",
            sobuoi2: "",
            sobuoi3: "",
            sobuoi4: "",
            sobuoi5: "",
            sobuoi6: "",
            sobuoi7: "",
            sobuoi8: "",

            ngaybd1: "",
            ngaybd2: "",
            ngaybd3: "",
            ngaybd4: "",
            ngaybd5: "",
            ngaybd6: "",
            ngaybd7: "",
            ngaybd8: "",

            ghichu1: "",
            ghichu2: "",
            ghichu3: "",
            ghichu4: "",
            ghichu5: "",
            ghichu6: "",
            ghichu7: "",
            ghichu8: "",

            arrSheet: [],
            arrDetailSheet: [],
        };
    }

    async componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let user = this.props.currentUser;
        let response = await getAllAssignmentSheet(user.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrSheet: response.sheet, // using for review
            });
        }
        this.state.arrSheet.map((item, index) => {
            this.setState({
                ngaybdthuctap: item.ngay_bd_thuc_tap,
                ngayktthuctap: item.ngay_kt_thuc_tap,
            });
        });
        //---------------------------------------------------------------
        let response1 = await getAllDetailAssignmentSheet(user.id, "1");
        if (response1 && response1.errCode === 0) {
            this.setState({
                arrDetailSheet: response1.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd1: item.ngay_bd,
                sobuoi1: item.so_buoi,
                vieclam1: item.viec_lam,
                ghichu1: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response2 = await getAllDetailAssignmentSheet(user.id, "2");
        if (response2 && response2.errCode === 0) {
            this.setState({
                arrDetailSheet: response2.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd2: item.ngay_bd,
                sobuoi2: item.so_buoi,
                vieclam2: item.viec_lam,
                ghichu2: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response3 = await getAllDetailAssignmentSheet(user.id, "3");
        if (response3 && response3.errCode === 0) {
            this.setState({
                arrDetailSheet: response3.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd3: item.ngay_bd,
                sobuoi3: item.so_buoi,
                vieclam3: item.viec_lam,
                ghichu3: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response4 = await getAllDetailAssignmentSheet(user.id, "4");
        if (response4 && response4.errCode === 0) {
            this.setState({
                arrDetailSheet: response4.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd4: item.ngay_bd,
                sobuoi4: item.so_buoi,
                vieclam4: item.viec_lam,
                ghichu4: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response5 = await getAllDetailAssignmentSheet(user.id, "5");
        if (response5 && response5.errCode === 0) {
            this.setState({
                arrDetailSheet: response5.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd5: item.ngay_bd,
                sobuoi5: item.so_buoi,
                vieclam5: item.viec_lam,
                ghichu5: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response6 = await getAllDetailAssignmentSheet(user.id, "6");
        if (response6 && response6.errCode === 0) {
            this.setState({
                arrDetailSheet: response6.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd6: item.ngay_bd,
                sobuoi6: item.so_buoi,
                vieclam6: item.viec_lam,
                ghichu6: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response7 = await getAllDetailAssignmentSheet(user.id, "7");
        if (response7 && response7.errCode === 0) {
            this.setState({
                arrDetailSheet: response7.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd7: item.ngay_bd,
                sobuoi7: item.so_buoi,
                vieclam7: item.viec_lam,
                ghichu7: item.ghi_chu,
            });
        });
        //---------------------------------------------------------------
        let response8 = await getAllDetailAssignmentSheet(user.id, "8");
        if (response8 && response8.errCode === 0) {
            this.setState({
                arrDetailSheet: response8.detail_sheet, // using for review
            });
        }
        this.state.arrDetailSheet.map((item, index) => {
            this.setState({
                ngaybd8: item.ngay_bd,
                sobuoi8: item.so_buoi,
                vieclam8: item.viec_lam,
                ghichu8: item.ghi_chu,
            });
        });
    };

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
        let arrInput = ["id"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
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
            ngaybdthuctap: date[0],
        });
    };
    handleonChangeDatePicker1 = (date) => {
        this.setState({
            ngayktthuctap: date[0],
        });
    };
    handleonChangeDatePickerWeek1 = (date) => {
        this.setState({
            ngaybd1: date[0],
        });
    };
    handleonChangeDatePickerWeek2 = (date) => {
        this.setState({
            ngaybd2: date[0],
        });
    };
    handleonChangeDatePickerWeek3 = (date) => {
        this.setState({
            ngaybd3: date[0],
        });
    };
    handleonChangeDatePickerWeek4 = (date) => {
        this.setState({
            ngaybd4: date[0],
        });
    };
    handleonChangeDatePickerWeek5 = (date) => {
        this.setState({
            ngaybd5: date[0],
        });
    };
    handleonChangeDatePickerWeek6 = (date) => {
        this.setState({
            ngaybd6: date[0],
        });
    };
    handleonChangeDatePickerWeek7 = (date) => {
        this.setState({
            ngaybd7: date[0],
        });
    };
    handleonChangeDatePickerWeek8 = (date) => {
        this.setState({
            ngaybd8: date[0],
        });
    };

    render() {
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
                        <i class="fab fa-wpforms"></i>{" "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        <span>Phiếu giao việc</span>
                        {" | "}
                        {this.state.id}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.subject-id" /> */}
                                Ngày bắt đầu thực tập
                            </label>
                            <DatePicker
                                disabled
                                value={this.state.ngaybdthuctap}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.academic-rank" /> */}
                                Ngày kết thúc thực tập
                            </label>
                            <DatePicker
                                disabled
                                value={this.state.ngayktthuctap}
                            />
                        </div>
                    </div>
                    {/* tuan 1 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ nhất
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd1} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="tex"
                                value={this.state.sobuoi1}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam1}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu1}
                            />
                        </div>
                    </div>
                    {/* tuan 2 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ hai
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd2} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi2}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam2}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu2}
                            />
                        </div>
                    </div>
                    {/* tuan 3 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ ba
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd3} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi3}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam3}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu3}
                            />
                        </div>
                    </div>
                    {/* tuan 4 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ tư
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd4} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi4}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam4}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu4}
                            />
                        </div>
                    </div>
                    {/* tuan 5 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ năm
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd5} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi5}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam5}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu5}
                            />
                        </div>
                    </div>
                    {/* tuan 6 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ sáu
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd6} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi6}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam6}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu6}
                            />
                        </div>
                    </div>
                    {/* tuan 7 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ bảy
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd7} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi7}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam7}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu7}
                            />
                        </div>
                    </div>
                    {/* tuan 8 */}
                    <div className="sigal-line">
                        <div className="input-container">
                            Tuần làm việc thứ tám
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Ngày bắt đầu</label>
                            <DatePicker disabled value={this.state.ngaybd8} />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.password" /> */}
                                Số buổi làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sobuoi8}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Nội dung công việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.vieclam8}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ghi chú
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.ghichu8}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button
                        color="primary"
                        className="btn-primary px-3"
                        onClick={() => {
                            this.handleSaveUser();
                        }}
                    >
                        <i class="fas fa-check"></i>
                        <FormattedMessage id="menu.admin.confirm" />
                    </Button>{" "} */}
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
)(ModalDetailAssignmentSheet);
