import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _, { filter } from "lodash";
import "./ManageScore.scss";
import {
    getAllAssignmentSheet,
    getAllRegistrationFormByEmployee,
    editAssignmentSheetService,
    createNewRatingSheetService,
    getAllRatingSheet,
    getAllRegistrationFormByLecturer,
    createNewScoreSheetService,
} from "../../../services/userService";
import ModalDetailAssignmentSheet from "../Employee/ModalDetailAssignmentSheet";
import ModalDetailStudent from "../Employee/ModalDetailStudent";
// import ModalEditRating from "./ModalEditRating";
import ModalDetailEmployee from "./ModalDetailEmployee";
import ModalDetailRatingSheet from "./ModalDetailRatingSheet";
import ModalEditScore from "./ModalEditScore";
import ModalDetailScoreSheet from "./ModalDetailScoreSheet";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageScore extends Component {
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
            isOpenModalDetailEmployee: false,
            detailEmployee: {},
            isOpenModalDetailRatingSheet: false,
            detailRatingSheet: {},
            isOpenModalEditScore: false,
            scoreEdit: {},
            isOpenModalDetailScoreSheet: false,
            detailScoreSheet: {},
            filename: "",
            file_scan: [],
            tongphieutiepnhan: 0,
            phieudanhgiadanhan: 0,
            phieudanhgiachuanhan: 0,
            filedanop: 0,
            filechuanop: 0,
            dachamdiem: 0,
            chuachamdiem: 0,
        };
    }

    async componentDidMount() {
        fetch(`http://quanlythuctap-cit.serveftp.com:8080/files`)
            .then((result) => result.json())
            .then((file) => this.setState({ file_scan: file }));
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let userInfo = this.props.userInfo;
        let response = await getAllRegistrationFormByLecturer(userInfo.s_id);
        if (response && response.errCode === 0) {
            this.setState({
                arrForm: response.registration_form,
            });
        }

        this.setState({ tongphieutiepnhan: this.state.arrForm.length });

        let countPhieuDanhGia = 0;
        this.state.arrForm.map((item, index) => {
            if (item.Phieutiepnhan.ngay_1tuan < 1) {
                countPhieuDanhGia++;
            }
        });
        this.setState({ phieudanhgiachuanhan: countPhieuDanhGia });
        this.setState({
            phieudanhgiadanhan: this.state.arrForm.length - countPhieuDanhGia,
        });

        let countPhieuChamDiem = 0;
        this.state.arrForm.map((item, index) => {
            if (item.Phieutiepnhan.ngay_1tuan > 1) {
                countPhieuChamDiem++;
            }
        });
        this.setState({ dachamdiem: countPhieuChamDiem });
        this.setState({
            chuachamdiem: this.state.arrForm.length - countPhieuChamDiem,
        });

        fetch(`http://quanlythuctap-cit.serveftp.com:8080/files`)
            .then((result) => result.json())
            .then((file) => {
                let countFile = 0;
                this.state.arrForm.map((item, index) => {
                    // console.log(item.Phieutiepnhan.sinh_vien);
                    let checkFile = 0;
                    file.map((itemfile, indexfile) => {
                        // console.log(itemfile.name);
                        if (
                            item.Phieutiepnhan.sinh_vien + ".zip" ===
                            itemfile.name
                        ) {
                            checkFile = 1;
                        }
                    });
                    if (checkFile === 1) {
                        countFile++;
                    }
                });
                this.setState({ filedanop: countFile });
                this.setState({
                    filechuanop: this.state.arrForm.length - countFile,
                });
            });
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

    toggleDetailEmployeeModal = () => {
        this.setState({
            isOpenModalDetailEmployee: !this.state.isOpenModalDetailEmployee,
        });
    };

    toggleDetailRatingSheetModal = () => {
        this.setState({
            isOpenModalDetailRatingSheet:
                !this.state.isOpenModalDetailRatingSheet,
        });
    };

    toggleScoreModal = () => {
        this.setState({
            isOpenModalEditScore: !this.state.isOpenModalEditScore,
        });
    };

    toggleDetailScoreSheetModal = () => {
        this.setState({
            isOpenModalDetailScoreSheet:
                !this.state.isOpenModalDetailScoreSheet,
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

    handleEditScore = async (data) => {
        this.setState({
            isOpenModalEditScore: true,
            scoreEdit: data,
        });
    };
    doEditScore = async (data) => {
        try {
            let response = await createNewScoreSheetService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditScore: false,
                });
                await this.getAllFromReact();
                toast.success(
                    "???? c???p nh???t phi???u ch???m ??i???m cho sinh vi??n th??nh c??ng!",
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

    handleDetailScoreSheet = async (user) => {
        this.setState({
            isOpenModalDetailScoreSheet: true,
            detailScoreSheet: user,
        });
    };
    doDetailScoreSheet = async (user) => {
        try {
            await this.getAllFromReact();
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { processLogout, userInfo } = this.props;

        let arrForm = this.state.arrForm;

        let file_scan = this.state.file_scan;

        return (
            <div className="manage-score-container">
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

                {this.state.isOpenModalDetailEmployee && (
                    <ModalDetailEmployee
                        isOpen={this.state.isOpenModalDetailEmployee}
                        toggleFromParent={this.toggleDetailEmployeeModal}
                        currentUser={this.state.detailEmployee}
                        editUser={this.doDetailEmployee}
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

                {this.state.isOpenModalEditScore && (
                    <ModalEditScore
                        isOpen={this.state.isOpenModalEditScore}
                        toggleFromParent={this.toggleScoreModal}
                        currentUser={this.state.scoreEdit}
                        editUser={this.doEditScore}
                    />
                )}

                {this.state.isOpenModalDetailScoreSheet && (
                    <ModalDetailScoreSheet
                        isOpen={this.state.isOpenModalDetailScoreSheet}
                        toggleFromParent={this.toggleDetailScoreSheetModal}
                        currentUser={this.state.detailScoreSheet}
                        editUser={this.doDetailScoreSheet}
                    />
                )}

                <div className="title">
                    <FormattedMessage id="menu.admin.manage-score" />
                </div>

                <div className="row mx-3 statistic-form">
                    <div className="col-sm">
                        <p className="text-bold">Th??ng tin</p>
                        <p className="blue-text">
                            T???ng s??? phi???u ti???p nh???n:{" "}
                            {this.state.tongphieutiepnhan}
                        </p>
                    </div>
                    <div className="col-sm border-1px">
                        <p className="text-bold">File b??o c??o</p>
                        <p className="blue-text">
                            ???? n???p: {this.state.filedanop}
                        </p>
                        <p className="red-text">
                            Ch??a n???p: {this.state.filechuanop}
                        </p>
                    </div>
                    <div className="col-sm border-1px">
                        <p className="text-bold">Phi???u ????nh gi?? (CBHD)</p>
                        <p className="green-text">
                            ???? nh???n ???????c: {this.state.phieudanhgiadanhan}
                        </p>
                        <p className="red-text">
                            Ch??a nh???n ???????c: {this.state.phieudanhgiachuanhan}
                        </p>
                    </div>
                    <div className="col-sm border-1px">
                        <p className="text-bold">Phi???u ch???m ??i???m</p>
                        <p className="green-text">
                            ???? ch???m ??i???m: {this.state.dachamdiem}
                        </p>
                        <p className="orange-text">
                            Ch??a ch???m ??i???m: {this.state.chuachamdiem}
                        </p>
                    </div>
                </div>

                <div className="mx-3 input-container">
                    {/* <input
                        type="text"
                        placeholder="T??m ki???m..."
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
                                        M?? phi???u ti???p nh???n
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.company-id" /> */}
                                        C?? quan th???c t???p
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                        Sinh vi??n ????ng k??
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                        File b??o c??o
                                    </th>
                                    <th>
                                        {/* <FormattedMessage id="menu.internship-location.work-content" /> */}
                                        C??n b??? h?????ng d???n
                                    </th>
                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phi???u giao vi???c
                                    </th>
                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phi???u ????nh gi??
                                    </th>
                                    <th className="action-colum">
                                        {/* <FormattedMessage id="menu.admin.status" /> */}
                                        Phi???u ch???m ??i???m
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrForm
                                    .slice(0)
                                    .reverse()
                                    .map((item, index) => {
                                        let checkFile = 0;
                                        file_scan.map((itemfile, index) => {
                                            if (
                                                item.Phieutiepnhan.sinh_vien +
                                                    ".zip" ===
                                                itemfile.name
                                            ) {
                                                checkFile = 1;
                                            }
                                        });

                                        return (
                                            <tr>
                                                <td>{item.Phieutiepnhan.id}</td>
                                                <td className="coquan">
                                                    {
                                                        item.Phieutiepnhan
                                                            .phong_lam_viec
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-view text-nowrap"
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
                                                        <span className="text-bold ">
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
                                                    {checkFile === 1 ? (
                                                        <a
                                                            href={
                                                                // "http://quanlythuctap-cit.serveftp.com:8080/files/" +
                                                                "http://localhost:8080/files/" +
                                                                this.state
                                                                    .filename
                                                            }
                                                            download
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            onClick={() =>
                                                                this.setState({
                                                                    filename:
                                                                        item
                                                                            .Phieutiepnhan
                                                                            .sinh_vien +
                                                                        ".zip",
                                                                })
                                                            }
                                                            title="T???i v??? file b??o c??o"
                                                        >
                                                            <button
                                                                className="btn-download text-nowrap"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#0984e3",
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
                                                                <i class="fas fa-cloud-download-alt"></i>{" "}
                                                                T???i v???
                                                            </button>
                                                        </a>
                                                    ) : (
                                                        <button
                                                            className="btn-red text-nowrap text-bold"
                                                            style={{
                                                                backgroundColor:
                                                                    "#0984e3",
                                                                width: "100%",
                                                                height: "100%",
                                                                border: "none",
                                                                outline: "none",
                                                                color: "#fff",
                                                                padding: "5px",
                                                            }}
                                                            title="Ch??a n???p b??o c??o"
                                                            onClick={() =>
                                                                toast.error(
                                                                    "Sinh vi??n ch??a n???p file b??o c??o l??n h??? th???ng!"
                                                                )
                                                            }
                                                        >
                                                            <i class="fas fa-times-circle"></i>{" "}
                                                            Ch??a n???p
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-view text-nowrap"
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
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-form text-bold text-nowrap"
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
                                                                item.Phieutiepnhan
                                                            )
                                                        }
                                                        title="Xem th??ng tin phi???u giao vi???c"
                                                    >
                                                        <i class="fas fa-eye"></i>{" "}
                                                        Phi???u giao vi???c
                                                    </button>
                                                </td>
                                                <td>
                                                    {item.Phieutiepnhan
                                                        .ngay_1tuan < 1 ? (
                                                        <button
                                                            className="btn-red text-nowrap text-bold"
                                                            style={{
                                                                backgroundColor:
                                                                    "#0984e3",
                                                                width: "100%",
                                                                height: "100%",
                                                                border: "none",
                                                                outline: "none",
                                                                color: "#fff",
                                                                padding: "5px",
                                                            }}
                                                            title="Ch??a c?? phi???u ????nh gi??"
                                                            onClick={() =>
                                                                toast.error(
                                                                    "C??n b??? h?????ng d???n ch??a g???i phi???u ????nh gi??!"
                                                                )
                                                            }
                                                        >
                                                            <i class="fas fa-times-circle"></i>{" "}
                                                            Ch??a c??
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-form text-bold text-nowrap"
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
                                                                    item.Phieutiepnhan
                                                                )
                                                            }
                                                            title="Xem th??ng tin phi???u ????nh gi??"
                                                        >
                                                            <i class="fas fa-eye"></i>{" "}
                                                            Phi???u ????nh gi??
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    {item.Phieutiepnhan
                                                        .ngay_1tuan > 1 ? (
                                                        <button
                                                            className="btn-view text-bold text-nowrap"
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
                                                                this.handleDetailScoreSheet(
                                                                    item.Phieutiepnhan
                                                                )
                                                            }
                                                            title="Xem th??ng tin phi???u ch???m ??i???m"
                                                        >
                                                            <i class="fas fa-eye"></i>{" "}
                                                            Phi???u ch???m ??i???m
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-edit text-bold text-nowrap"
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
                                                                this.handleEditScore(
                                                                    item.Phieutiepnhan
                                                                )
                                                            }
                                                            title="C???p nh???t phi???u ch???m ??i???m"
                                                        >
                                                            <i class="fas fa-stopwatch"></i>{" "}
                                                            C???p nh???t phi???u ch???m
                                                            ??i???m
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageScore);
