import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; // vi-en
import "./ManageStudent.scss";
import {
    getAllStudent,
    createNewStudentService,
    deleteUserService,
    editStudentService,
} from "../../../services/userService";
import ModalStudent from "./ModalStudent";
import ModalEditStudent from "./ModalEditStudent";
import { emitter } from "../../../utils/emitter"; // check rong
import toast, { Toaster } from "react-hot-toast"; // thong bao
import * as XLSX from "xlsx";
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageStudent extends Component {
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
            isOpenModalStudent: false,
            isOpenModalEditStudent: false,
            userEdit: {},
            filename: "",
            file_scan: [],
            tongsinhvien: 0,
        };
    }

    async componentDidMount() {
        await this.getAllFromReact();
        // fetch(`http://quanlythuctap-cit.serveftp.com:8080/files/xlsx`)
        fetch(`http://localhost:8080/files/xlsx`)
            .then((result) => result.json())
            .then((file_scan) => this.setState({ file_scan: file_scan }));
    }

    getAllFromReact = async () => {
        let response = await getAllStudent("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
        this.setState({ tongsinhvien: this.state.arrUsers.length });
    };

    // sinh vien
    handleAddNewStudent = () => {
        this.setState({
            isOpenModalStudent: true,
        });
    };

    // sinh vien
    toggleStudentModal = () => {
        this.setState({
            isOpenModalStudent: !this.state.isOpenModalStudent,
        });
    };

    // sua nguoi dung
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditStudent: !this.state.isOpenModalEditStudent,
        });
    };

    // sinh vien
    createNewStudent = async (data) => {
        console.log("check data: ", data);
        try {
            let response = await createNewStudentService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllFromReact();
                this.setState({
                    isOpenModalStudent: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
                toast.success(
                    "Đã thêm sinh viên " + data.hoten + " thành công!",
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
                await this.getAllFromReact();
                toast.success("Đã xóa sinh viên " + user.Nguoidung.ho_ten, {
                    duration: 6500,
                });
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
            isOpenModalEditStudent: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let response = await editStudentService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditStudent: false,
                });
                await this.getAllFromReact();
                toast.success(
                    "Đã thay đổi thông tin sinh viên " +
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

    readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                json.map((item) => {
                    this.createNewStudent(item);
                });
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    render() {
        let { filter, arrUsers } = this.state;
        let dataSearch = arrUsers.filter((item) => {
            return Object.keys(item.Nguoidung).some((key) =>
                item.Nguoidung[key].toLowerCase().includes(filter.toLowerCase())
            );
        });

        let file_scan = this.state.file_scan;

        return (
            <React.Fragment>
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                <div className="manage-student-container">
                    <ModalStudent
                        isOpen={this.state.isOpenModalStudent}
                        toggleFromParent={this.toggleStudentModal}
                        createNewStudent={this.createNewStudent}
                    />

                    {this.state.isOpenModalEditStudent && (
                        <ModalEditStudent
                            isOpen={this.state.isOpenModalEditStudent}
                            toggleFromParent={this.toggleUserEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.doEditUser}
                        />
                    )}

                    <div className="title">
                        <FormattedMessage id="menu.admin.manage-user-student" />
                    </div>

                    {/* them sv - start */}

                    <div className="col-sm mb-3 add-new-student-left">
                        <button
                            className="btn btn-third px-3"
                            onClick={() => this.handleAddNewStudent()}
                        >
                            <i className="fas fa-plus"></i>{" "}
                            <FormattedMessage id="menu.admin.add-new-student" />
                        </button>
                    </div>

                    <div className="row col-sm mx-3 add-new-student-right">
                        <div className="col-sm">
                            <span className="text-bold">
                                Thêm mới sinh viên hàng loạt -
                            </span>{" "}
                            <span>
                                sử dụng tệp Excel (.xlsx) theo định dạng có sẵn.
                            </span>
                            <br></br>
                            <a
                                href={
                                    // "http://quanlythuctap-cit.serveftp.com:8080/files/xlsx/thong_tin_sinh_vien.xlsx"
                                    "http://localhost:8080/files/xlsx/thong_tin_sinh_vien.xlsx"
                                }
                                download
                                style={{
                                    textDecoration: "none",
                                }}
                                title="Tải về tệp .xlsx"
                            >
                                <button className="btn-download-xlsx px-2 mt-2 mb-2">
                                    <i class="fas fa-cloud-download-alt"></i>{" "}
                                    tải về tệp Excel mẫu (.xlsx)
                                </button>
                            </a>
                            <br></br>
                            <div className="btn-upload-xlsx px-2">
                                <span>
                                    <i class="fas fa-cloud-upload-alt"></i> tải
                                    lên tệp Excel (đã có thông tin)
                                </span>
                                <div className="mx-2 mt-2 mb-2">
                                    <input
                                        className="px-3"
                                        type="file"
                                        name="upload"
                                        id="upload"
                                        onChange={this.readUploadFile}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm statistic-form border-1px">
                            <p className="text-bold">Thông tin</p>
                            <p className="blue-text">
                                Tổng số sinh viên: {this.state.tongsinhvien}
                            </p>
                        </div>
                    </div>

                    {/* them sv - start */}

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
                            height: "370px",
                            width: "100%",
                            // border: "1px solid red",
                        }}
                    >
                        <div className="users-table mx-3">
                            <table id="customers">
                                <tbody>
                                    <tr className="title-table">
                                        <th>
                                            <FormattedMessage id="menu.admin.student-id" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.admin.fullname" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="menu.student.class-id" />
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
                                                                item.Nguoidung
                                                                    .ho_ten
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.Sinhvien
                                                                    .ma_lop
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
                                                                title="Xóa sinh viên"
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);
