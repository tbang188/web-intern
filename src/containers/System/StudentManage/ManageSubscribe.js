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
                toast.success("???? x??a phi???u ????ng k?? th???c t???p " + form.id, {
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
                toast.success("???? duy???t phi???u ????ng k?? th???c t???p " + form.id, {
                    duration: 6500,
                });
                toast.success(
                    "???? thay ?????i tr???ng th??i phi???u " +
                        form.id +
                        " t??? Ch??? X??c Nh???n th??nh ???? X??c Nh???n",
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
                toast.success("???? ph??n c??ng gi???ng vi??n h?????ng d???n th??nh c??ng", {
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
                        placeholder="T??m ki???m..."
                        onChange={this.searchTxt.bind(this)}
                        value={filter}
                    />
                </div> */}

                <div className="mx-3 mb-3 statistic-form">
                    <p className="text-bold">Th??ng tin</p>
                    <p className="blue-text">
                        Y??u c???u ???? duy???t: {this.state.daduyet}
                    </p>
                    <p className="orange-text">
                        Y??u c???u ch??a duy???t: {this.state.chuaduyet}
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
                                            M?? phi???u ti???p nh???n
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                            M?? sinh vi??n ????ng k??
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.max-student" /> */}
                                            M?? nh??n vi??n h?????ng d???n
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.max-student" /> */}
                                            M?? c?? quan
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-name" /> */}
                                            T??n c?? quan
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-city" /> */}
                                            N???i dung c??ng vi???c
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-phone" /> */}
                                            S??? gi??? 1 tu???n
                                        </th>
                                        <th>
                                            {/* <FormattedMessage id="menu.internship-location.company-phone" /> */}
                                            Ph??n c??ng gi???ng vi??n
                                        </th>
                                        {/* <th>
                                        <FormattedMessage id="menu.internship-location.company-email" />
                                        S??? ng??y 1 tu???n
                                    </th> */}
                                        {/* <th>
                                        <FormattedMessage id="menu.internship-location.skill-requirements" />
                                        T??nh tr???ng phi???u
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
                                                            title="Xem th??ng tin sinh vi??n"
                                                        >
                                                            <i class="fas fa-eye"></i>{" "}
                                                            <span className="text-bold">
                                                                {
                                                                    item
                                                                        .Phieutiepnhan
                                                                        .sinh_vien
                                                                }
                                                            </span>
                                                            {/* {" - "}Xem th??ng tin sinh vi??n */}
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
                                                                title="Xem th??ng tin c??c b??? h?????ng d???n"
                                                            >
                                                                <i class="fas fa-eye"></i>{" "}
                                                                <span className="text-bold">
                                                                    {
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .nhan_vien
                                                                    }
                                                                </span>
                                                                {/* {" - "}Xem th??ng tin c??n b??? */}
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
                                                                title="Ph??n c??ng gi???ng vi??n"
                                                            >
                                                                Ph??n c??ng ngay?
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
                                                                ???? duy???t!
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
                                                                title="Duy???t phi???u ????ng k??"
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
                                                                title="X??a phi???u ????ng k??"
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
