import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // vi - en
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { getAllClass } from "../../../services/userService";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: "",
            sid: "",
            malop: "",
            diachi: "",
            sdt: "",
            email: "",
            matkhau: "",
            loaitaikhoan: "R2",
            arrClass: [],
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                hoten: "",
                sid: "",
                malop: "",
                diachi: "",
                sdt: "",
                email: "",
                matkhau: "",
                loaitaikhoan: "R2",
            });
        });
    }

    async componentDidMount() {
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let classdb = await getAllClass("All");
        if (classdb && classdb.errCode === 0) {
            this.setState({
                arrClass: classdb.classdb,
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
            "malop",
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

    handleAddNewStudent = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewStudent(this.state);
        }
    };

    render() {
        let arrClass = this.state.arrClass;

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
                        <FormattedMessage id="menu.admin.add-new-student" />
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
                                <FormattedMessage id="menu.admin.student-id" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Student ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "sid");
                                }}
                                value={this.state.sid}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.student.class-id" />
                            </label>

                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Class ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "malop");
                                }}
                                value={this.state.malop}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn mã lớp
                                </option>
                                {arrClass &&
                                    arrClass.map((item, index) => {
                                        return (
                                            <option className="option">
                                                {item.ma_lop}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="modal-user-body">
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
                            this.handleAddNewStudent();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalStudent);
