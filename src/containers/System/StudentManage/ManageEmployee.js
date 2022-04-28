import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageEmployee.scss";
import {
    getAllEmployee,
    createNewEmployeeService,
    deleteUserService,
    editEmployeeService,
} from "../../../services/userService";
import ModalEmployee from "./ModalEmployee";
import ModalEditEmployee from "./ModalEditEmployee";
import { emitter } from "../../../utils/emitter";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            offset: 0,
            orgtableData: [],
            perPage: 3,
            currentPage: 0,
            value: "",
            DataSource: "",
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEmployee: false,
            isOpenModalEditEmployee: false,
            userEdit: {},
            tongcanbo: 0,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllEmployee("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
        this.setState({ tongcanbo: this.state.arrUsers.length });
    };

    handleAddNewEmployee = () => {
        this.setState({
            isOpenModalEmployee: true,
        });
    };

    toggleEmployeeModal = () => {
        this.setState({
            isOpenModalEmployee: !this.state.isOpenModalEmployee,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditEmployee: !this.state.isOpenModalEditEmployee,
        });
    };

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
                toast.success(
                    "Đã thêm cán bộ hướng dẫn " + data.hoten + " thành công!",
                    { duration: 6500 }
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    // xoa nguoi dung
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.s_id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
                toast.success(
                    "Đã xóa cán bộ hướng dẫn " + user.Nguoidung.ho_ten,
                    {
                        duration: 6500,
                    }
                );
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // sua nguoi dung
    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditEmployee: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let response = await editEmployeeService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditEmployee: false,
                });
                await this.getAllUserFromReact();
                toast.success(
                    "Đã thay đổi thông tin cán bộ hướng dẫn " +
                        user.hoten +
                        " thành công!",
                    {
                        duration: 6500,
                    }
                );
            } else {
                alert(response.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    };

    searchTxt(e) {
        this.setState({ filter: e.target.value });
    }

    render() {
        let { filter, arrUsers } = this.state;
        let dataSearch = arrUsers.filter((item) => {
            return Object.keys(item.Nguoidung).some((key) =>
                item.Nguoidung[key].toLowerCase().includes(filter.toLowerCase())
            );
        });

        return (
            <React.Fragment>
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                <div className="manage-employee-container">
                    <ModalEmployee
                        isOpen={this.state.isOpenModalEmployee}
                        toggleFromParent={this.toggleEmployeeModal}
                        createNewEmployee={this.createNewEmployee}
                    />

                    {this.state.isOpenModalEditEmployee && (
                        <ModalEditEmployee
                            isOpen={this.state.isOpenModalEditEmployee}
                            toggleFromParent={this.toggleUserEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.doEditUser}
                        />
                    )}

                    <div className="title">
                        <FormattedMessage id="menu.admin.manage-user-employee" />
                    </div>

                    <div className="mb-3">
                        <button
                            className="btn btn-third px-3"
                            onClick={() => this.handleAddNewEmployee()}
                        >
                            <i className="fas fa-plus"></i>{" "}
                            <FormattedMessage id="menu.admin.add-new-employee" />
                        </button>
                    </div>

                    <div className="mx-3 statistic-form">
                        <div className="col-sm ">
                            <p className="text-bold">Thông tin</p>
                            <p className="blue-text">
                                Tổng số cán bộ hướng dẫn: {this.state.tongcanbo}
                            </p>
                        </div>
                    </div>

                    <div className="mx-1 input-container">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            onChange={this.searchTxt.bind(this)}
                            value={filter}
                        />
                    </div>

                    <CustomScrollbars
                        style={{
                            height: "430px",
                            width: "100%",
                            // border: "1px solid red",
                        }}
                    >
                        <div className="users-table mx-3">
                            <table id="customers">
                                <tbody>
                                    <tr className="title-table">
                                        <th>
                                            <FormattedMessage id="menu.admin.staff-id" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.employee.company-id" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.admin.fullname" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.employee.position" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.employee.working-part" />
                                        </th>

                                        <th>
                                            <FormattedMessage id="menu.admin.address" />
                                        </th>
                                        <th>Email</th>
                                        <th>
                                            <FormattedMessage id="menu.admin.phone" />
                                        </th>
                                        {/* <th>
                                        <FormattedMessage id="menu.admin.role" />
                                    </th> */}
                                        <th className="action-colum">
                                            <FormattedMessage id="menu.admin.action" />
                                        </th>
                                    </tr>

                                    {dataSearch &&
                                        dataSearch
                                            .slice(0)
                                            .reverse()
                                            .map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{item.s_id}</td>
                                                        <td>
                                                            {
                                                                item.Nhanvien
                                                                    .ma_co_quan
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.Nguoidung
                                                                    .ho_ten
                                                            }
                                                        </td>
                                                        <td className="chucvu">
                                                            {
                                                                item.Nhanvien
                                                                    .chuc_vu
                                                            }
                                                        </td>
                                                        <td className="bophanlamviec">
                                                            {
                                                                item.Nhanvien
                                                                    .bo_phan_lam_viec
                                                            }
                                                        </td>
                                                        <td className="diachi-nguoidung">
                                                            {
                                                                item.Nguoidung
                                                                    .dia_chi
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.Nguoidung
                                                                    .email
                                                            }
                                                        </td>
                                                        <td>
                                                            {item.Nguoidung.sdt}
                                                        </td>
                                                        {/* <td>{item.loai_tai_khoan}</td> */}
                                                        <td className="action-row">
                                                            <button
                                                                className="btn-edit"
                                                                onClick={() =>
                                                                    this.handleEditUser(
                                                                        item
                                                                    )
                                                                }
                                                                title="Thay đổi thông tin"
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
                                                                title="Xóa cán bộ hướng dẫn"
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
                    </CustomScrollbars>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);
