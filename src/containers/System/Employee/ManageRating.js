import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _, { filter } from "lodash";
import "./ManageRating.scss";
import {
    getAllAssignmentSheet,
    getAllRegistrationFormByEmployee,
    editAssignmentSheetService,
    createNewRatingSheetService,
    getAllRatingSheet,
} from "../../../services/userService";
import ModalDetailAssignmentSheet from "./ModalDetailAssignmentSheet";
import ModalDetailStudent from "./ModalDetailStudent";
import ModalEditRating from "./ModalEditRating";
import ModalDetailRatingSheet from "../Lecturer/ModalDetailRatingSheet";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrAssignmentSheet: [],
            arrForm: [],
            isOpenModalEditAssignmentSheet: false,
            userEdit: {},
            isOpenModalDetailStudent: false,
            detailStudent: {},
            isOpenModalEditRating: false,
            ratingEdit: {},
            isOpenModalDetailRatingSheet: false,
            detailRatingSheet: {},
            tongphieutiepnhan: 0,
            tongphieudanhgiadatao: 0,
            tongphieudanhgiachuatao: 0,
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
        let count = 0;
        this.state.arrForm.map((item, index) => {
            if (item.ngay_1tuan > 0) {
                count++;
            }
        });
        this.setState({
            tongphieudanhgiadatao: count,
        });
        this.setState({
            tongphieudanhgiachuatao:
                this.state.arrForm.length - this.state.tongphieudanhgiadatao,
        });
        this.setState({ tongphieutiepnhan: this.state.arrForm.length });
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

    toggleRatingModal = () => {
        this.setState({
            isOpenModalEditRating: !this.state.isOpenModalEditRating,
        });
    };

    toggleDetailRatingSheetModal = () => {
        this.setState({
            isOpenModalDetailRatingSheet:
                !this.state.isOpenModalDetailRatingSheet,
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
            await this.getAllFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    handleEditRating = async (data) => {
        this.setState({
            isOpenModalEditRating: true,
            ratingEdit: data,
        });
    };
    doEditRating = async (data) => {
        try {
            let response = await createNewRatingSheetService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditRating: false,
                });
                await this.getAllFromReact();
                toast.success(
                    "Đã gửi phiếu đánh giá cho giảng viên hướng dẫn thành công!",
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

    handleDetailRatingSheet = async (user) => {
        this.setState({
            isOpenModalDetailRatingSheet: true,
            detailRatingSheet: user,
        });
    };
    doDetailRatingSheet = async (user) => {
        try {
            await this.getAllFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    // searchTxt(e) {
    //     this.setState({ filter: e.target.value });
    // }

    render() {
        const { processLogout, userInfo } = this.props;

        let arrForm = this.state.arrForm;

        return (
            <div className="manage-rating-container">
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}

                {this.state.isOpenModalEditAssignmentSheet && (
                    <ModalDetailAssignmentSheet
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

                {this.state.isOpenModalEditRating && (
                    <ModalEditRating
                        isOpen={this.state.isOpenModalEditRating}
                        toggleFromParent={this.toggleRatingModal}
                        currentUser={this.state.ratingEdit}
                        editUser={this.doEditRating}
                    />
                )}

                {this.state.isOpenModalDetailRatingSheet && (
                    <ModalDetailRatingSheet
                        isOpen={this.state.isOpenModalDetailRatingSheet}
                        toggleFromParent={this.toggleDetailRatingSheetModal}
                        currentUser={this.state.detailRatingSheet}
                        editUser={this.doDetailRatingSheet}
                    />
                )}

                <div className="title">
                    <FormattedMessage id="menu.admin.manage-rating" />
                </div>

                <div className="row mx-3 statistic-form">
                    <div className="col-sm ">
                        <p className="text-bold">Thông tin</p>
                        <p className="blue-text">
                            Tổng số sinh viên thực tập tại cơ quan:{" "}
                            {this.state.tongphieutiepnhan}
                        </p>
                    </div>
                    <div className="col-sm border-1px">
                        <p className="text-bold">Phiếu đánh giá</p>
                        <p className="green-text">
                            Phiếu đánh giá đã tạo:{" "}
                            {this.state.tongphieudanhgiadatao}
                        </p>
                        <p className="orange-text">
                            Phiếu đánh giá chưa tạo:{" "}
                            {this.state.tongphieudanhgiachuatao}
                        </p>
                    </div>
                </div>

                <div className="mx-3 input-container">
                    {/* <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        // onChange={this.searchTxt.bind(this)}
                        // value={filter}
                    /> */}
                </div>

                <CustomScrollbars
                    style={{
                        height: "480px",
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
                                        Cơ quan
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.company-id" /> */}
                                        Mã phiếu tiếp nhận
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                        Sinh viên đăng ký
                                    </th>

                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phiếu giao việc
                                    </th>
                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phiếu đánh giá
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
                                                <td className="coquan">
                                                    {item.phong_lam_viec}
                                                </td>
                                                <td>{item.id}</td>
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
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i class="fas fa-eye"></i>{" "}
                                                        <span className="text-bold">
                                                            {item.sinh_vien}
                                                        </span>
                                                        {/* {" - "}Xem thông tin sinh viên */}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-form text-bold"
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
                                                        <i class="fas fa-eye"></i>{" "}
                                                        Phiếu giao việc
                                                    </button>
                                                </td>
                                                <td>
                                                    {item.ngay_1tuan > 0 ? (
                                                        <button
                                                            className="btn-view text-bold"
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
                                                                this.handleDetailRatingSheet(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i class="fas fa-eye"></i>{" "}
                                                            Phiếu đánh giá
                                                        </button>
                                                    ) : (
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
                                                                this.handleEditRating(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i class="fas fa-plus-circle"></i>{" "}
                                                            Tạo phiếu đánh giá
                                                        </button>
                                                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageRating);
