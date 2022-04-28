import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalEduStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            hoten: "",
            diachi: "",
            sdt: "",
            chucvu: "",
            email: "",
            matkhau: "",
            loaitaikhoan: "R4",
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            // console.log("listen emitter from parent: ", data);
            // reset state
            this.setState({
                sid: "",
                hoten: "",
                diachi: "",
                sdt: "",
                chucvu: "",
                email: "",
                matkhau: "",
                loaitaikhoan: "R4",
            });
        });
    }

    componentDidMount() {
        // console.log("mouting modal");
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
            "sid",
            "hoten",
            "diachi",
            "sdt",
            "chucvu",
            "email",
            "matkhau",
            "loaitaikhoan",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleAddNewEduStaff = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // console.log("check props child", this.props);
            this.props.createNewEduStaff(this.state);
        }
    };

    render() {
        // console.log("check chil props", this.props);
        // console.log("check child open modal", this.props.isOpen);
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
                        <i class="far fa-address-card"> </i>
                        Create a new Education Staff
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Fullname</label>
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
                            <label>Staff ID</label>
                            <input
                                type="text"
                                placeholder="Enter Staff ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "sid");
                                }}
                                value={this.state.sid}
                            />
                        </div>
                        <div className="input-container">
                            <label>Phone</label>
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
                            <label>Address</label>
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
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>Position</label>
                            <input
                                type="text"
                                placeholder="Enter Position"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "chucvu");
                                }}
                                value={this.state.chucvu}
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
                            <label>Password</label>
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
                            this.handleAddNewEduStaff();
                        }}
                    >
                        <i class="fas fa-check"></i>Confirm
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className="btn-secondary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        <i class="fas fa-times"></i>Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEduStaff);
