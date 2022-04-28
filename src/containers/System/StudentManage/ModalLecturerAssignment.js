import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllLecturer } from "../../../services/userService";
import { emitter } from "../../../utils/emitter";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalLecturerAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            giangvien: "",
            arrLecturer: [],
        };
    }

    async componentDidMount() {
        let register_form = this.props.currentData;
        if (register_form && !_.isEmpty(register_form)) {
            this.setState({
                id: register_form.id,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let response = await getAllLecturer("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrLecturer: response.users,
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
        let arrInput = ["giangvien"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error("Vui lòng chọn giảng viên hướng dẫn", {
                    duration: 6500,
                });
                break;
            }
        }
        return isValid;
    };

    handleAddNewLecturerAssignment = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewLecturerAssignment(this.state);
        }
    };

    render() {
        let arrLecturer = this.state.arrLecturer;

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
                        {/* <i class="fas fa-map-marker-alt"> </i> */}
                        {/* <FormattedMessage id="menu.admin.add-new-internship-location" /> */}
                        Phân công Giảng viên hướng dẫn | {this.state.id}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="sigal-input">
                        {/* <div className="modal-user-body"> */}
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.internship-location.company-address" /> */}
                                Chọn giảng viên
                            </label>
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Enter Company address"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "giangvien"
                                    );
                                }}
                                value={this.state.giangvien}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Chọn giảng viên
                                </option>
                                {arrLecturer &&
                                    arrLecturer.map((item, index) => {
                                        return (
                                            <option
                                                className="option"
                                                value={item.s_id}
                                            >
                                                {item.s_id} -{" "}
                                                {item.Nguoidung.ho_ten}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-primary px-3"
                        onClick={() => {
                            this.handleAddNewLecturerAssignment();
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalLecturerAssignment);
