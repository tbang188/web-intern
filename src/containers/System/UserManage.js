import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService, // sinh vien
    createNewLecturerService, // giang vien
    createNewEduStaffService, // giao vu
    createNewEmployeeService, // nhan vien cong ty
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser"; // sinh vien
import ModalLecturer from "./ModalLecturer"; // giang vien
import ModalEduStaff from "./ModalEduStaff"; // giao vu
import ModalEmployee from "./ModalEmployee"; // nhan vien cong ty
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalLecturer: false,
            isOpenModalEduStaff: false,
            isOpenModalEmployee: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
        // console.log("get users form node.js: ", response);
    };

    // sinh vien
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    // giang vien
    handleAddNewLecturer = () => {
        this.setState({
            isOpenModalLecturer: true,
        });
    };

    // giao vu
    handleAddNewEduStaff = () => {
        this.setState({
            isOpenModalEduStaff: true,
        });
    };

    // nhan vien cong ty
    handleAddNewEmployee = () => {
        this.setState({
            isOpenModalEmployee: true,
        });
    };

    // #40 -> ~49:20
    // sinh vien
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    // giang vien
    toggleLecturerModal = () => {
        this.setState({
            isOpenModalLecturer: !this.state.isOpenModalLecturer,
        });
    };

    // giao vu
    toggleEduStaffModal = () => {
        this.setState({
            isOpenModalEduStaff: !this.state.isOpenModalEduStaff,
        });
    };

    // nhan vien cong ty
    toggleEmployeeModal = () => {
        this.setState({
            isOpenModalEmployee: !this.state.isOpenModalEmployee,
        });
    };

    // sua nguoi dung
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    // sinh vien
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
            // console.log("response create user: ", response);
        } catch (e) {
            console.log(e);
        }
        // console.log("check data from child: ", data);
    };

    // giang vien
    createNewLecturer = async (data) => {
        try {
            let response = await createNewLecturerService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalLecturer: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
            // console.log("response create lecturer: ", response);
        } catch (e) {
            console.log(e);
        }
        // console.log("check data from child: ", data);
    };

    // giao vu
    createNewEduStaff = async (data) => {
        try {
            let response = await createNewEduStaffService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEduStaff: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
            // console.log("response create lecturer: ", response);
        } catch (e) {
            console.log(e);
        }
        // console.log("check data from child: ", data);
    };

    // nhan vien cong ty
    createNewEmployee = async (data) => {
        try {
            let response = await createNewEmployeeService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEmployee: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
            // console.log("response create lecturer: ", response);
        } catch (e) {
            console.log(e);
        }
        // console.log("check data from child: ", data);
    };

    // xoa nguoi dung
    handleDeleteUser = async (user) => {
        // console.log("click delete", user);
        try {
            let response = await deleteUserService(user.s_id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // sua nguoi dung
    handleEditUser = async (user) => {
        // console.log("check edit user ", user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        // console.log("click confirm: ", user);
        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUserFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (e) {
            console.log(e);
        }
        // console.log("check edit user", response);
    };

    render() {
        let arrUsers = this.state.arrUsers;
        console.log("check arrUsers", arrUsers);
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <ModalLecturer
                    isOpen={this.state.isOpenModalLecturer}
                    toggleFromParent={this.toggleLecturerModal}
                    createNewLecturer={this.createNewLecturer}
                />
                <ModalEduStaff
                    isOpen={this.state.isOpenModalEduStaff}
                    toggleFromParent={this.toggleEduStaffModal}
                    createNewEduStaff={this.createNewEduStaff}
                />
                <ModalEmployee
                    isOpen={this.state.isOpenModalEmployee}
                    toggleFromParent={this.toggleEmployeeModal}
                    createNewEmployee={this.createNewEmployee}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}

                <div className="title text-center">Manage Users</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new Student
                    </button>
                    <button
                        className="btn btn-secondary px-3"
                        onClick={() => this.handleAddNewLecturer()}
                    >
                        <i className="fas fa-plus"></i> Add new Lecturer
                    </button>
                    <button
                        className="btn btn-third px-3"
                        onClick={() => this.handleAddNewEduStaff()}
                    >
                        <i className="fas fa-plus"></i> Add new Education Staff
                    </button>
                    <button
                        className="btn btn-fourth px-3"
                        onClick={() => this.handleAddNewEmployee()}
                    >
                        <i className="fas fa-plus"></i> Add new Employee
                    </button>
                </div>
                <div className="users-table mt-3 mx-3">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Fullname</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Role account</th>
                                <th className="action-colum">Action</th>
                            </tr>

                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.s_id}</td>
                                            {/* <td>{item.Sinhvien.ma_lop}</td> */}
                                            <td>{item.ho_ten}</td>
                                            <td>{item.dia_chi}</td>
                                            <td>{item.email}</td>
                                            <td>{item.sdt}</td>
                                            <td>
                                                {item.Taikhoan.loai_tai_khoan}
                                            </td>
                                            <td className="action-row">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
