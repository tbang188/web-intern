import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

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
                mabomon: "",
                hocham: "",
                hocvi: "",
                email: "",
                matkhau: "",
                loaitaikhoan: "R3",
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
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleAddNewLecturer = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // console.log("check props child", this.props);
            this.props.createNewLecturer(this.state);
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
                        Create a new Lecturer
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
                            <label>Lecturer ID</label>
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
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Subject ID</label>
                            <input
                                type="text"
                                placeholder="Enter Subject ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "mabomon");
                                }}
                                value={this.state.mabomon}
                            />
                        </div>
                        <div className="input-container">
                            <label>Academic rank</label>
                            <input
                                type="text"
                                placeholder="Enter Academic rank"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocham");
                                }}
                                value={this.state.hocham}
                            />
                        </div>
                        <div className="input-container">
                            <label>Degree</label>
                            {/* <input
                                
                                type="text"
                                placeholder="Enter Degree"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocvi");
                                }}
                                value={this.state.hocvi}
                            /> */}

                            <input
                                list="browsers"
                                name="browser"
                                id="browser"
                                type="text"
                                placeholder="Enter Degree"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "hocvi");
                                }}
                                value={this.state.hocvi}
                            />
                            <datalist id="browsers" />
                            <option value="Edge" />
                            <option value="Firefox" />
                            <option value="Chrome" />
                            <option value="Opera" />
                            <option value="Safari" />
                            <input type="submit" />
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
                            this.handleAddNewLecturer();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalLecturer);
