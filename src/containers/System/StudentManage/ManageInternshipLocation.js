import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageInternshipLocation.scss";
import {
    getAllInternshipLocation, // ok
    createNewInternshipLocationService, // ok
    deleteInternshipLocationService, // none
    editInternshipLocationService, // none
} from "../../../services/userService";
import ModalInternshipLocation from "./ModalInternshipLocation"; //none
import ModalEditInternshipLocation from "./ModalEditInternshipLocation"; //none
import { emitter } from "../../../utils/emitter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import toast, { Toaster } from "react-hot-toast"; // thong bao
import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CRow } from "@coreui/react";
import { CCol } from "@coreui/react";
import { CCardImage } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import CardImg from "../../../assets/card-img.png";
import * as XLSX from "xlsx";
import CustomScrollbars from "../../../components/CustomScrollbars";

class ManageInternshipLocation extends Component {
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
            arrInternshipLocation: [],
            isOpenModalInternshipLocation: false,
            isOpenModalEditInternshipLocation: false,
            userEdit: {},
            tongdiadiem: 0,
        };
    }

    async componentDidMount() {
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let response = await getAllInternshipLocation("All");
        this.setState({
            arrInternshipLocation: response.internship_location,
        });
        this.setState({
            tongdiadiem: this.state.arrInternshipLocation.length,
        });
    };

    handleAddNewInternshipLocation = () => {
        this.setState({
            isOpenModalInternshipLocation: true,
        });
    };

    toggleInternshipLocationModal = () => {
        this.setState({
            isOpenModalInternshipLocation:
                !this.state.isOpenModalInternshipLocation,
        });
    };

    toggleInternshipLocationEditModal = () => {
        this.setState({
            isOpenModalEditInternshipLocation:
                !this.state.isOpenModalEditInternshipLocation,
        });
    };

    createNewInternshipLocation = async (data) => {
        try {
            let response = await createNewInternshipLocationService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllFromReact();
                this.setState({
                    isOpenModalInternshipLocation: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
                toast.success(
                    "???? th??m ?????a ??i???m th???c t???p t???i " +
                        data.tencoquan +
                        " th??nh c??ng!",
                    { duration: 6500 }
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteInternshipLocation = async (data) => {
        try {
            let response = await deleteInternshipLocationService(
                data.ma_co_quan
            );
            if (response && response.errCode === 0) {
                await this.getAllFromReact();
                toast.success(
                    "???? x??a ?????a ??i???m th???c t???p t???i " + data.Coquan.ten_co_quan,
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

    handleEditInternshipLocation = async (data) => {
        this.setState({
            isOpenModalEditInternshipLocation: true,
            userEdit: data,
        });
    };
    doEditInternshipLocation = async (data) => {
        try {
            let response = await editInternshipLocationService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditInternshipLocation: false,
                });
                await this.getAllFromReact();
                toast.success(
                    "???? thay ?????i th??ng tin ?????a ??i???m th???c t???p t???i " +
                        data.tencoquan +
                        " th??nh c??ng!",
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
                    // console.log("check data: ", item);
                    this.createNewInternshipLocation(item);
                });
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    render() {
        let { filter, arrInternshipLocation } = this.state;
        let dataSearch = arrInternshipLocation.filter((item) => {
            return Object.keys(item.Coquan).some((key) =>
                item.Coquan[key].toLowerCase().includes(filter.toLowerCase())
            );
        });

        return (
            <React.Fragment>
                <div className="manage-intership-location-container">
                    {/* thong bao - start */}
                    <Toaster position="top-right" reverseOrder={false} />
                    {/* thong bao - end */}

                    <ModalInternshipLocation
                        isOpen={this.state.isOpenModalInternshipLocation}
                        toggleFromParent={this.toggleInternshipLocationModal}
                        createNewInternshipLocation={
                            this.createNewInternshipLocation
                        }
                    />

                    {this.state.isOpenModalEditInternshipLocation && (
                        <ModalEditInternshipLocation
                            isOpen={
                                this.state.isOpenModalEditInternshipLocation
                            }
                            toggleFromParent={
                                this.toggleInternshipLocationEditModal
                            }
                            currentUser={this.state.userEdit}
                            editUser={this.doEditInternshipLocation}
                        />
                    )}

                    <div className="title">
                        <FormattedMessage id="menu.admin.manage-internship-location" />
                    </div>

                    {/* them sv - start */}

                    {/* <div class="row input-file"> */}
                    <div className="col-sm add-new-student-left mb-3">
                        <button
                            className="btn btn-third px-3"
                            onClick={() =>
                                this.handleAddNewInternshipLocation()
                            }
                        >
                            <i className="fas fa-plus"></i>{" "}
                            <FormattedMessage id="menu.admin.add-new-internship-location" />
                        </button>
                    </div>

                    <div className="row mx-3 add-new-student-right">
                        <div className="col-sm">
                            <span className="text-bold">
                                Th??m m???i ?????a ??i???m h??ng lo???t -
                            </span>{" "}
                            <span>
                                s??? d???ng t???p Excel (.xlsx) theo ?????nh d???ng c?? s???n.
                            </span>
                            <br></br>
                            <a
                                href={
                                    // "http://quanlythuctap-cit.serveftp.com:8080/files/xlsx/thong_tin_dia_diem_thuc_tap.xlsx"
                                    "http://localhost:8080/files/xlsx/thong_tin_dia_diem_thuc_tap.xlsx"
                                }
                                download
                                style={{
                                    textDecoration: "none",
                                }}
                                title="T???i v??? t???p .xlsx"
                            >
                                <button className="btn-download-xlsx px-2 mt-2 mb-2">
                                    <i class="fas fa-cloud-download-alt"></i>{" "}
                                    t???i v??? t???p Excel m???u (.xlsx)
                                </button>
                            </a>
                            <br></br>
                            <div className="btn-upload-xlsx px-2">
                                <span>
                                    <i class="fas fa-cloud-upload-alt"></i> t???i
                                    l??n t???p Excel (???? c?? th??ng tin)
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
                            <p className="text-bold">Th??ng tin</p>
                            <p className="blue-text">
                                T???ng s??? ?????a ??i???m th???c t???p:{" "}
                                {this.state.tongdiadiem}
                            </p>
                        </div>
                    </div>
                    {/* </div> */}

                    {/* them sv - start */}

                    <div className="mx-1 input-container">
                        <input
                            type="text"
                            placeholder="T??m ki???m..."
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
                        {/* card UI - start */}
                        <div className="users-table mx-3">
                            <CRow
                                xs={{ cols: 1 }}
                                md={{ cols: 5 }}
                                className="g-4"
                            >
                                {dataSearch &&
                                    dataSearch
                                        .slice(0)
                                        .reverse()
                                        .map((item, index) => {
                                            return (
                                                <CCol
                                                    xs
                                                    title={
                                                        item.Coquan.ten_co_quan
                                                    }
                                                >
                                                    <CCard
                                                        className="h-100 card-data"
                                                        //click xem chi tiet
                                                        // onClick={() =>
                                                        //     this.handleViewInternshipDetail(
                                                        //         item
                                                        //     )
                                                        // }
                                                    >
                                                        <div>
                                                            <CCardImage
                                                                orientation="top"
                                                                src={CardImg}
                                                            />
                                                        </div>
                                                        <CCardBody>
                                                            <CCardTitle
                                                                className="text-truncate"
                                                                style={{
                                                                    fontWeight:
                                                                        "600",
                                                                    color: "#6c5ce7",
                                                                }}
                                                            >
                                                                {
                                                                    item.Coquan
                                                                        .ten_co_quan
                                                                }
                                                            </CCardTitle>
                                                            <CCardText>
                                                                <i class="fas fa-map-marker-alt"></i>{" "}
                                                                <span
                                                                    style={{
                                                                        color: "#636e72",
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .Coquan
                                                                            .tinh_tp
                                                                    }
                                                                </span>
                                                            </CCardText>
                                                            <CCardText className="text-truncate">
                                                                <i class="fas fa-thumbtack"></i>{" "}
                                                                <span
                                                                    style={{
                                                                        color: "#636e72",
                                                                    }}
                                                                >
                                                                    {
                                                                        item.noi_dung_cv
                                                                    }
                                                                </span>
                                                            </CCardText>
                                                            <CCardText>
                                                                <i class="fas fa-users"></i>{" "}
                                                                <span
                                                                    style={{
                                                                        color: "#636e72",
                                                                    }}
                                                                >
                                                                    S??? l?????ng:{" "}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: "#ff7675",
                                                                    }}
                                                                >
                                                                    {
                                                                        item.so_luong_sv
                                                                    }
                                                                </span>
                                                            </CCardText>
                                                        </CCardBody>
                                                        <div>
                                                            <button
                                                                className="btn-edit"
                                                                onClick={() =>
                                                                    this.handleEditInternshipLocation(
                                                                        item
                                                                    )
                                                                }
                                                                title="Thay ?????i th??ng tin"
                                                            >
                                                                <i className="fas fa-pencil-alt"></i>
                                                            </button>
                                                            <button
                                                                className="btn-delete"
                                                                onClick={() =>
                                                                    this.handleDeleteInternshipLocation(
                                                                        item
                                                                    )
                                                                }
                                                                title="X??a ?????a ??i???m th???c t???p"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </CCard>
                                                </CCol>
                                            );
                                        })}
                            </CRow>
                        </div>
                        {/* card UI - end */}
                    </CustomScrollbars>

                    <div
                        className="users-table mt-3 mx-3"
                        style={{ display: "none" }}
                    >
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.company-id" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.company-name" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.company-city" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.company-phone" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.company-email" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.work-content" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.max-student" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.skill-requirements" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.student-rights" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="menu.internship-location.note" />
                                    </th>
                                    <th className="action-colum">
                                        <FormattedMessage id="menu.admin.action" />
                                    </th>
                                </tr>

                                {dataSearch.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.Coquan.ma_co_quan}</td>
                                            <td>{item.Coquan.ten_co_quan}</td>
                                            <td>{item.Coquan.tinh_tp}</td>
                                            <td>{item.Coquan.sdt_co_quan}</td>
                                            <td>{item.Coquan.email_co_quan}</td>
                                            <td>{item.noi_dung_cv}</td>
                                            <td>{item.so_luong_sv}</td>
                                            <td>{item.yeu_cau_sv}</td>
                                            <td>{item.quyen_loi_sv}</td>
                                            <td>{item.ghi_chu}</td>

                                            <td className="action-row">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditInternshipLocation(
                                                            item
                                                        )
                                                    }
                                                    title="Thay ?????i th??ng tin"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteInternshipLocation(
                                                            item
                                                        )
                                                    }
                                                    title="X??a ?????a ??i???m th???c t???p"
                                                >
                                                    <i className="fas fa-trash"></i>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageInternshipLocation);
