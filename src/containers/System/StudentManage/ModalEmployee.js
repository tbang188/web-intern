import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllInternshipLocation } from "../../../services/userService";
import { emitter } from "../../../utils/emitter";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast"; // thong bao

// const options = [
//     { value: "1", label: "cty1" },
//     { value: "2", label: "cty2" },
//     { value: "3", label: "cty3" },
// ]; // chua tim ra cach load dong duoc tu db

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
            // selectedOption: null,
        };

        this.listenToEmitter();
    }

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    // };

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
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
    }

    getAllFromReact = async () => {
        let res = await getAllInternshipLocation("All");
        if (res && res.errCode === 0) {
            this.setState({
                arrInternshipLocation: res.internship_location,
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
                toast.error("Hãy điền đầy đủ thông tin để hoàn thành!", {
                    duration: 6500,
                });
                break;
            }
        }
        return isValid;
    };

    handleAddNewEmployee = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewEmployee(this.state);
        }
    };

    render() {
        let arrInternshipLocation = this.state.arrInternshipLocation;

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
                        <FormattedMessage id="menu.admin.add-new-employee" />
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
                                placeholder="Enter Staff ID"
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
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.employee.position" />
                            </label>
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
                            <label>
                                <FormattedMessage id="menu.employee.working-part" />
                            </label>
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
                            <label>
                                <FormattedMessage id="menu.employee.company-id" />
                            </label>
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Create Company ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "macoquan");
                                }}
                                value={this.state.macoquan}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Mã cơ quan
                                </option>
                                {arrInternshipLocation &&
                                    arrInternshipLocation.map((item, index) => {
                                        return (
                                            <option
                                                className="option"
                                                value={item.Coquan.ma_co_quan}
                                            >
                                                {item.Coquan.ma_co_quan}
                                                {" - "}
                                                {item.Coquan.ten_co_quan}
                                            </option>
                                        );
                                    })}
                            </select>
                            {/* <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> */}
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
                            this.handleAddNewEmployee();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEmployee);
