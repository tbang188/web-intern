import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { getAllAllCode } from "../../../services/userService";
import { getAllSubject } from "../../../services/userService";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalLecturer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            hoten: "",
            diachi: "",
            sdt: "",
            mabomon: "",
            hocham: "",
            hocvi: "",
            email: "",
            matkhau: "",
            loaitaikhoan: "R3",
            arrAllCodeAR: [],
            arrAllCodeD: [],
            arrSubject: [],
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                sid: "",
                hoten: "",
                diachi: "",
                sdt: "",
                mabomon: "",
                hocham: "",
                hocvi: "",
                email: "",
                matkhau: "",
                loaitaikhoan: "R3",
            });
        });
    }

    async componentDidMount() {
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
            "sid",
            "hoten",
            "diachi",
            "sdt",
            "mabomon",
            "hocham",
            "hocvi",
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

    handleAddNewLecturer = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewLecturer(this.state);
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
                        <FormattedMessage id="menu.admin.add-new-lecturer" />
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
                                <FormattedMessage id="menu.admin.staff-id" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Lecturer ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "sid");
                                }}
                                value={this.state.sid}
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
                            <label>
                                <FormattedMessage id="menu.lecturer.subject" />
                            </label>
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Subject ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "mabomon");
                                }}
                                value={this.state.mabomon}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn bộ môn
                                </option>
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
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Academic rank"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocham");
                                }}
                                value={this.state.hocham}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn học hàm
                                </option>
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
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Degree"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocvi");
                                }}
                                value={this.state.hocvi}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn học vị
                                </option>
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
                                placeholder="Create Password"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "matkhau");
                                }}
                                value={this.state.matkhau}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-primary px-3"
                        onClick={() => {
                            this.handleAddNewLecturer();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalLecturer);
