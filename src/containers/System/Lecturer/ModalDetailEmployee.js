import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import { getAllEmployee } from "../../../services/userService";

class ModalDetailEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            arrDetail: [],
            hoten: "",
            sdt: "",
            diachi: "",
            email: "",
            chucvu: "",
            bophanlamviec: "",
        };
    }

    async componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                sid: user.nhan_vien,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let user = this.props.currentUser;
        let response = await getAllEmployee(user.nhan_vien);
        if (response && response.errCode === 0) {
            this.setState({
                arrDetail: response.users, // using for review
                hoten: response.users.Nguoidung.ho_ten,
                sdt: response.users.Nguoidung.sdt,
                diachi: response.users.Nguoidung.dia_chi,
                email: response.users.Nguoidung.email,
                chucvu: response.users.Nhanvien.chuc_vu,
                bophanlamviec: response.users.Nhanvien.bo_phan_lam_viec,
            });
        }
    };

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        let arrDetail = this.state.arrDetail;

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
                        <i class="far fa-id-card"></i>{" "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        {this.state.hoten}
                        {" | "}
                        {this.state.sid}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.fullname" />
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.hoten}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.student-id" /> */}
                                Mã số cán bộ
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sid}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.student.class-id" /> */}
                                Chức vụ
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.chucvu}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Bộ phận làm việc
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.bophanlamviec}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.address" />
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.diachi}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                disabled
                                type="text"
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.admin.phone" />
                            </label>
                            <input
                                disabled
                                type="text"
                                value={this.state.sdt}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
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
)(ModalDetailEmployee);
