import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import { getAllAllCode } from "../../../services/userService";
import { getAllSubject } from "../../../services/userService";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditLecturer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: "",
            sid: "",
            hocham: "",
            hocvi: "",
            mabomon: "",
            diachi: "",
            sdt: "",
            email: "",
            matkhau: "",
            loaitaikhoan: "",
            arrAllCodeAR: [],
            arrAllCodeD: [],
            arrSubject: [],
        };
    }

    async componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                hoten: user.Nguoidung.ho_ten,
                sid: user.s_id,
                hocham: user.Giangvien.hoc_ham,
                hocvi: user.Giangvien.hoc_vi,
                mabomon: user.Giangvien.ma_bo_mon,
                diachi: user.Nguoidung.dia_chi,
                sdt: user.Nguoidung.sdt,
                email: user.Nguoidung.email,
                matkhau: user.mat_khau,
                loaitaikhoan: user.loai_tai_khoan,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let academic_rank = await getAllAllCode("ACADEMIC_RANK");
        let degree = await getAllAllCode("DEGREE");
        let subject = await getAllSubject("All");
        if (academic_rank && academic_rank.errCode === 0) {
            this.setState({
                arrAllCodeAR: academic_rank.allcode,
            });
        }
        if (degree && degree.errCode === 0) {
            this.setState({
                arrAllCodeD: degree.allcode,
            });
        }
        if (subject && subject.errCode === 0) {
            this.setState({
                arrSubject: subject.subject,
            });
        }
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
        let arrInput = [
            "hoten",
            "sid",
            "hocham",
            "hocvi",
            "mabomon",
            "diachi",
            "sdt",
            "email",
            "matkhau",
            "loaitaikhoan",
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
        let arrAllCodeAR = this.state.arrAllCodeAR;
        let arrAllCodeD = this.state.arrAllCodeD;
        let arrSubject = this.state.arrSubject;

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
                        <i class="far fa-address-card"> </i>
                        <FormattedMessage id="menu.admin.edit-info" />:{" "}
                        {this.state.hoten} - {this.state.sid}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.fullname" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Fullname"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hoten");
                                }}
                                value={this.state.hoten}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.phone" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Phone number"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "sdt");
                                }}
                                value={this.state.sdt}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.lecturer.subject-id" />
                            </label>
                            {/* <input
                                type="text"
                                placeholder="Enter Subject ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "mabomon");
                                }}
                                value={this.state.mabomon}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Subject ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "mabomon");
                                }}
                                value={this.state.mabomon}
                            >
                                {arrSubject &&
                                    arrSubject.map((item, index) => {
                                        return (
                                            <option className="option">
                                                {item.ten_bo_mon}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.lecturer.academic-rank" />
                            </label>
                            {/* <input
                                type="text"
                                placeholder="Enter Academic rank"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocham");
                                }}
                                value={this.state.hocham}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Academic rank"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocham");
                                }}
                                value={this.state.hocham}
                            >
                                {arrAllCodeAR &&
                                    arrAllCodeAR.map((item, index) => {
                                        return (
                                            <option className="option">
                                                {item.valueVi}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.lecturer.degree" />
                            </label>
                            {/* <input
                                type="text"
                                placeholder="Enter Degree"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocvi");
                                }}
                                value={this.state.hocvi}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Degree"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocvi");
                                }}
                                value={this.state.hocvi}
                            >
                                {arrAllCodeD &&
                                    arrAllCodeD.map((item, index) => {
                                        return (
                                            <option className="option">
                                                {item.valueVi}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.address" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "diachi");
                                }}
                                value={this.state.diachi}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.password" />
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "matkhau");
                                }}
                                value={this.state.matkhau}
                                disabled
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditLecturer);
