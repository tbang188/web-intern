import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSubscribe.scss";
import {
    getAllRegistrationForm, // ok
    deleteRegistrationFormService, // ok
    editRegistrationFormService, // ok
    createNewLecturerAssignmentService, // test
} from "../../../services/userService";
import { emitter } from "../../../utils/emitter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import _, { filter } from "lodash";
import ReactPaginate from "react-paginate";
import ModalLecturerAssignment from "./ModalLecturerAssignment";
import ModalDetailStudent from "../Employee/ModalDetailStudent";
import ModalDetailEmployee from "../Lecturer/ModalDetailEmployee";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageSubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            arrRegistrationForm: [],
            offset: 0,
            orgtableData: [],
            perPage: 3,
            currentPage: 0,
            value: "",
            DataSource: "",
            isOpenModalInternshipLocation: false,
            isOpenModalEditInternshipLocation: false,
            userEdit: {},
            formEdit: {},
            isOpenModalLecturerAssignment: false,
            arrLecturerAssignment: {},
            id: null,
            isOpenModalDetailStudent: false,
            detailStudent: {},
            isOpenModalDetailEmployee: false,
            detailEmployee: {},
            tongsodon: 0,
            daduyet: 0,
            chuaduyet: 0,
        };
    }

    async componentDidMount() {
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let response = await getAllRegistrationForm("All");
        this.setState({
            arrRegistrationForm: response.registration_form,
        });
        // console.log(this.state.arrRegistrationForm.length);
        let count = 0;
        this.state.arrRegistrationForm.map((item) => {
            if (item.trang_thai === "111") {
                count++;
            }
        });
        this.setState({
            daduyet: count,
            // tongsodon: this.state.arrRegistrationForm.length,
        });
        this.setState({
            chuaduyet:
                this.state.arrRegistrationForm.length - this.state.daduyet,
        });
    };

    handleDeleteRegistrationForm = async (form) => {
        try {
            let response = await deleteRegistrationFormService(form.id);
            if (response && response.errCode === 0) {
                await this.getAllFromReact();
                toast.success("Đã xóa phiếu đăng ký thực tập " + form.id, {
                    duration: 6500,
                });
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleCheckRegistrationForm = async (form) => {
        form.trang_thai = "111";
        form.Phieutiepnhan.tinh_trang = "111";
        try {
            let response = await editRegistrationFormService(form);
            if (response && response.errCode === 0) {
                await this.getAllFromReact();
                toast.success("Đã duyệt phiếu đăng ký thực tập " + form.id, {
                    duration: 6500,
                });
                toast.success(
                    "Đã thay đổi trạng thái phiếu " +
                        form.id +
                        " từ Chờ Xác Nhận thành Đã Xác Nhận",
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

    handleLecturerAssignment = async (data) => {
        this.setState({
            isOpenModalLecturerAssignment: true,
            arrLecturerAssignment: data,
            id: data.id,
        });
    };

    toggleLecturerAssignmentModal = () => {
        this.setState({
            isOpenModalLecturerAssignment:
                !this.state.isOpenModalLecturerAssignment,
        });
    };

    doCreateNewLecturerAssignment = async (data) => {
        data.id = this.state.id;
        try {
            let response = await createNewLecturerAssignmentService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllFromReact();
                this.setState({
                    isOpenModalLecturerAssignment: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
                toast.success("Đã phân công giảng viên hướng dẫn thành công", {
                    duration: 6500,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    toggleDetailStudentModal = () => {
        this.setState({
            isOpenModalDetailStudent: !this.state.isOpenModalDetailStudent,
        });
    };
    handleDetailStudent = async (user) => {
        this.setState({
            isOpenModalDetailStudent: true,
            detailStudent: user,
        });
    };
    doDetailStudent = async (user) => {
        try {
            await this.getAllFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    toggleDetailEmployeeModal = () => {
        this.setState({
            isOpenModalDetailEmployee: !this.state.isOpenModalDetailEmployee,
        });
    };
    handleDetailEmployee = async (user) => {
        this.setState({
            isOpenModalDetailEmployee: true,
            detailEmployee: user,
        });
    };
    doDetailEmployee = async (user) => {
        try {
            await this.getAllFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    searchTxt(e) {
        this.setState({ filter: e.target.value });
    }

    render() {
        let arrRegistrationForm = this.state.arrRegistrationForm;
        // console.log(this.state.arrRegistrationForm);
        // console.log(this.state.daduyet, "/", arrRegistrationForm.length);

        return (
            <div className="manage-subscribe-container">
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}

                {this.state.isOpenModalDetailStudent && (
                    <ModalDetailStudent
                        isOpen={this.state.isOpenModalDetailStudent}
                        toggleFromParent={this.toggleDetailStudentModal}
                        currentUser={this.state.detailStudent}
                        editUser={this.doDetailStudent}
                    />
                )}

                {this.state.isOpenModalDetailEmployee && (
                    <ModalDetailEmployee
                        isOpen={this.state.isOpenModalDetailEmployee}
                        toggleFromParent={this.toggleDetailEmployeeModal}
                        currentUser={this.state.detailEmployee}
                        editUser={this.doDetailEmployee}
                    />
                )}

                <ModalLecturerAssignment
                    isOpen={this.state.isOpenModalLecturerAssignment}
                    toggleFromParent={this.toggleLecturerAssignmentModal}
                    currentData={this.state.arrLecturerAssignment}
                    createNewLecturerAssignment={
                        this.doCreateNewLecturerAssignment
                    }
                />

                <div className="title">
                    <FormattedMessage id="menu.admin.manage-subscribe" />
                </div>

                {/* <div className="mx-3 input-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        onChange={this.searchTxt.bind(this)}
                        value={filter}
                    />
                </div> */}

                <div className="mx-3 mb-3 statistic-form">
                    <p className="text-bold">Thông tin</p>
                    <p className="blue-text">
                        Yêu cầu đã duyệt: {this.state.daduyet}
                    </p>
                    <p className="orange-text">
                        Yêu cầu chưa duyệt: {this.state.chuaduyet}
                    </p>
                </div>

                {/* card UI - start */}
                {/* card UI - end */}

                <CustomScrollbars
                    style={{
                        height: "490px",
                        width: "100%",
                        // border: "1px solid red",
                    }}
                >
                    <div className="users-table mx-3">
                        {!this.state.arrRegistrationForm ? (
                            "No data found!"
                        ) : (
                            <table id="customers">
                                <thead>
                                    <tr className="title-table">
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-id" /> */}
                                            Mã phiếu tiếp nhận
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                            Mã sinh viên đăng ký
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.max-student" /> */}
                                            Mã nhân viên hướng dẫn
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.max-student" /> */}
                                            Mã cơ quan
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-name" /> */}
                                            Tên cơ quan
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-city" /> */}
                                            Nội dung công việc
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-phone" /> */}
                                            Số giờ 1 tuần
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-phone" /> */}
                                            Phân công giảng viên
                                        </th>
                                        {/* <th>
                                        <FormattedMessage id="menu.internship-location.company-email" />
                                        Số ngày 1 tuần
                                    </th> */}
                                        {/* <th>
                                        <FormattedMessage id="menu.internship-location.skill-requirements" />
                                        Tình trạng phiếu
                                    </th> */}
                                        {/* <th>
                                        <FormattedMessage id="menu.internship-location.student-rights" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.note" />
                                    </th> */}
                                        <th className="action-colum">
                                            <FormattedMessage id="menu.admin.status" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrRegistrationForm
                                        .slice(0)
                                        .reverse()
                                        .map((item) => {
                                            return (
                                                <tr>
                                                    <td className="maphieutiepnhan">
                                                        {item.Phieutiepnhan.id}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-view"
                                                            style={{
                                                                backgroundColor:
                                                                    "#2ecc71",
                                                                width: "100%",
                                                                height: "100%",
                                                                border: "none",
                                                                outline: "none",
                                                                color: "#fff",
                                                                padding: "5px",
                                                                transitionDuration:
                                                                    "0.3s",
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "#27ae60",
                                                                },
                                                            }}
                                                            onClick={() =>
                                                                this.handleDetailStudent(
                                                                    item.Phieutiepnhan
                                                                )
                                                            }
                                                            title="Xem thông tin sinh viên"
                                                        >
                                                            <i class="fas fa-eye"></i>{" "}
                                                            <span className="text-bold">
                                                                {
                                                                    item
                                                                        .Phieutiepnhan
                                                                        .sinh_vien
                                                                }
                                                            </span>
                                                            {/* {" - "}Xem thông tin sinh viên */}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {item.Phieutiepnhan
                                                            .tinh_trang ==
                                                        "111" ? (
                                                            <button
                                                                className="btn-view"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#2ecc71",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    border: "none",
                                                                    outline:
                                                                        "none",
                                                                    color: "#fff",
                                                                    padding:
                                                                        "5px",
                                                                    transitionDuration:
                                                                        "0.3s",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "#27ae60",
                                                                    },
                                                                }}
                                                                onClick={() =>
                                                                    this.handleDetailEmployee(
                                                                        item.Phieutiepnhan
                                                                    )
                                                                }
                                                                title="Xem thông tin các bộ hướng dẫn"
                                                            >
                                                                <i class="fas fa-eye"></i>{" "}
                                                                <span className="text-bold">
                                                                    {
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .nhan_vien
                                                                    }
                                                                </span>
                                                                {/* {" - "}Xem thông tin cán bộ */}
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-view"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#2ecc71",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    border: "none",
                                                                    outline:
                                                                        "none",
                                                                    color: "#fff",
                                                                    padding:
                                                                        "5px",
                                                                    transitionDuration:
                                                                        "0.3s",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "#27ae60",
                                                                    },
                                                                }}
                                                            >
                                                                <i class="fas fa-eye-slash"></i>
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td>{item.ma_co_quan}</td>
                                                    <td className="phonglamviec">
                                                        {
                                                            item.Phieutiepnhan
                                                                .phong_lam_viec
                                                        }
                                                    </td>
                                                    <td className="noidungcv">
                                                        {
                                                            item.Phieutiepnhan
                                                                .noi_dung
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.Phieutiepnhan
                                                                .gio_1ngay
                                                        }
                                                    </td>
                                                    <td>
                                                        {item.Chitietphancong
                                                            .giang_vien ==
                                                        null ? (
                                                            <button
                                                                style={{
                                                                    backgroundColor:
                                                                        "#2ecc71",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    border: "none",
                                                                    outline:
                                                                        "none",
                                                                    color: "#fff",
                                                                    padding:
                                                                        "5px",
                                                                    transitionDuration:
                                                                        "0.3s",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "#27ae60",
                                                                    },
                                                                }}
                                                                onClick={() =>
                                                                    this.handleLecturerAssignment(
                                                                        item
                                                                    )
                                                                }
                                                                title="Phân công giảng viên"
                                                            >
                                                                Phân công ngay?
                                                            </button>
                                                        ) : (
                                                            item.Chitietphancong
                                                                .giang_vien
                                                        )}
                                                    </td>

                                                    <td className="action-row">
                                                        {item.Phieutiepnhan
                                                            .tinh_trang ==
                                                        "111" ? (
                                                            <button
                                                                style={{
                                                                    backgroundColor:
                                                                        "#2ecc71",
                                                                    width: "100%",
                                                                    height: "37px",
                                                                    border: "none",
                                                                    outline:
                                                                        "none",
                                                                    color: "#fff",
                                                                    padding:
                                                                        "5px",
                                                                    transitionDuration:
                                                                        "0.3s",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "#27ae60",
                                                                    },
                                                                }}
                                                            >
                                                                Đã duyệt!
                                                            </button>
                                                        ) : (
                                                            <button
                                                                // className="btn-edit"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#2ecc71",
                                                                    width: "50%",
                                                                    height: "37px",
                                                                    border: "none",
                                                                    outline:
                                                                        "none",
                                                                    color: "#fff",
                                                                    transitionDuration:
                                                                        "0.3s",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "#27ae60",
                                                                    },
                                                                }}
                                                                onClick={() =>
                                                                    this.handleCheckRegistrationForm(
                                                                        item
                                                                    )
                                                                }
                                                                title="Duyệt phiếu đăng ký"
                                                            >
                                                                <i class="fas fa-check"></i>
                                                            </button>
                                                        )}
                                                        {item.Phieutiepnhan
                                                            .tinh_trang ==
                                                        "111" ? (
                                                            <button
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                className="btn-delete"
                                                                onClick={() =>
                                                                    this.handleDeleteRegistrationForm(
                                                                        item
                                                                    )
                                                                }
                                                                title="Xóa phiếu đăng ký"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-delete"
                                                                onClick={() =>
                                                                    this.handleDeleteRegistrationForm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        )}
                        {/* <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPageDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    /> */}
                    </div>
                </CustomScrollbars>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubscribe);
