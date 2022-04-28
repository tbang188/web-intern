import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _, { filter } from "lodash";
import "./ManageJobRequirements.scss";
import {
    getAllAssignmentSheet,
    getAllRegistrationFormByEmployee,
    editAssignmentSheetService,
    getAllStudentById,
} from "../../../services/userService";
import ModalEditAssignmentSheet from "./ModalEditAssignmentSheet";
import ModalDetailStudent from "./ModalDetailStudent";
import toast, { Toaster } from "react-hot-toast";
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageJobRequirements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrAssignmentSheet: [],
            arrForm: [],
            isOpenModalEditAssignmentSheet: false,
            userEdit: {},
            isOpenModalDetailStudent: false,
            detailStudent: {},
            arrStudent: [],
            tongphieutiepnhan: 0,
        };
    }

    async componentDidMount() {
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let userInfo = this.props.userInfo;
        let response = await getAllRegistrationFormByEmployee(userInfo.s_id);
        if (response && response.errCode === 0) {
            this.setState({
                arrForm: response.registration_form,
            });
        }
        this.setState({ tongphieutiepnhan: this.state.arrForm.length });
        // console.log(this.state.arrForm);
        // this.state.arrForm.map(async (item, index) => {
        //     let response2 = await getAllStudentById(item.sinh_vien);
        //     console.log(response2.users[0].ho_ten);
        // });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditAssignmentSheet:
                !this.state.isOpenModalEditAssignmentSheet,
        });
    };

    toggleDetailStudentModal = () => {
        this.setState({
            isOpenModalDetailStudent: !this.state.isOpenModalDetailStudent,
        });
    };

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditAssignmentSheet: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let response = await editAssignmentSheetService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditAssignmentSheet: false,
                });
                await this.getAllFromReact();
                toast.success(
                    "Đã cập nhật phiếu giao việc cho sinh viên thành công!",
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

    handleDetailStudent = async (user) => {
        this.setState({
            isOpenModalDetailStudent: true,
            detailStudent: user,
        });
    };
    doDetailStudent = async (user) => {
        try {
            await this.getAllUserFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { processLogout, userInfo } = this.props;

        let arrForm = this.state.arrForm;
        let arrStudent = this.state.arrStudent;
        // console.log(arrStudent);

        return (
            <div className="manage-job-requirements-container">
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                {this.state.isOpenModalEditAssignmentSheet && (
                    <ModalEditAssignmentSheet
                        isOpen={this.state.isOpenModalEditAssignmentSheet}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}

                {this.state.isOpenModalDetailStudent && (
                    <ModalDetailStudent
                        isOpen={this.state.isOpenModalDetailStudent}
                        toggleFromParent={this.toggleDetailStudentModal}
                        currentUser={this.state.detailStudent}
                        editUser={this.doDetailStudent}
                    />
                )}

                <div className="title">
                    <FormattedMessage id="menu.admin.manage-job-requirements" />
                </div>

                <div className="mx-3 statistic-form">
                    <div className="col-sm ">
                        <p className="text-bold">Thông tin</p>
                        <p className="blue-text">
                            Tổng số sinh viên thực tập tại cơ quan:{" "}
                            {this.state.tongphieutiepnhan}
                        </p>
                    </div>
                </div>

                <div className="mx-3  input-container">
                    {/* <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        // onChange={this.searchTxt.bind(this)}
                        // value={filter}
                    /> */}
                </div>

                <CustomScrollbars
                    style={{
                        height: "520px",
                        width: "100%",
                        // border: "1px solid red",
                    }}
                >
                    <div className="users-table mx-3">
                        <table id="customers">
                            <thead>
                                <tr className="title-table">
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.company-id" /> */}
                                        Mã phiếu tiếp nhận
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.company-id" /> */}
                                        Cơ quan
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                        Sinh viên đăng ký
                                    </th>

                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phiếu giao việc
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrForm
                                    .slice(0)
                                    .reverse()
                                    .map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.phong_lam_viec}</td>
                                                <td>
                                                    <button
                                                        className="btn-view"
                                                        style={{
                                                            backgroundColor:
                                                                "#55efc4",
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
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i class="fas fa-eye"></i>{" "}
                                                        <span className="text-bold">
                                                            {item.sinh_vien}
                                                        </span>
                                                        {/* {" - "}
                                                <span className="text-bold">
                                                    {response2.users[0].ho_ten}
                                                </span> */}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-edit text-bold"
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
                                                            this.handleEditUser(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i class="fas fa-sync"></i>{" "}
                                                        Cập nhật phiếu giao việc
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

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
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageJobRequirements);
