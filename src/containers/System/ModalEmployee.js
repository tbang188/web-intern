import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllInternshipLocation } from "../../services/userService";
import { emitter } from "../../utils/emitter";

class ModalEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            hoten: "",
            diachi: "",
            sdt: "",
            chucvu: "",
            bophanlamviec: "",
            macoquan: "",
            email: "",
            matkhau: "",
            loaitaikhoan: "R5",
            arrInternshipLocation: [],
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
                bophanlamviec: "",
                macoquan: "",
                email: "",
                matkhau: "",
                loaitaikhoan: "R5",
            });
        });
    }

    async componentDidMount() {
        await this.getAllFromReact();

        // console.log("mouting modal");
    }

    getAllFromReact = async () => {
        let res = await getAllInternshipLocation("All");
        if (res && res.errCode === 0) {
            this.setState({
                arrInternshipLocation: res.internship_location,
            });
        }
        // console.log("get allcode form node.js: ", response);
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
            "chucvu",
            "bophanlamviec",
            "macoquan",
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

    handleAddNewEmployee = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // console.log("check props child", this.props);
            this.props.createNewEmployee(this.state);
        }
    };

    render() {
        // console.log("check chil props", this.props);
        // console.log("check child open modal", this.props.isOpen);
        let arrInternshipLocation = this.state.arrInternshipLocation;
        console.log("check arrInternshipLocation", arrInternshipLocation);

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
                        Create a new Employee
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
                            <label>Working parts</label>
                            <input
                                type="text"
                                placeholder="Enter Working parts"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "bophanlamviec"
                                    );
                                }}
                                value={this.state.bophanlamviec}
                            />
                        </div>
                        <div className="input-container">
                            <label>Company ID</label>
                            {/* <input
                                type="text"
                                placeholder="Create Company ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "macoquan");
                                }}
                                value={this.state.macoquan}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Create Company ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "macoquan");
                                }}
                                value={this.state.macoquan}
                            >
                                {arrInternshipLocation &&
                                    arrInternshipLocation.map((item, index) => {
                                        return (
                                            <option className="option">
                                                {item.Coquan.ma_co_quan}
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
                            this.handleAddNewEmployee();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEmployee);
