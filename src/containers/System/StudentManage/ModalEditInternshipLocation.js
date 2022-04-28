import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditInternshipLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            macoquan: "",
            tencoquan: "",
            tendaydu: "", // co the null
            tinhtp: "",
            diachi: "",
            website: "",
            sdtcoquan: "",
            emailcoquan: "",
            manhanvien: "",
            noidungcv: "",
            gio1tuan: "",
            moitruonglamviec: "",
            soluongsv: "",
            yeucausv: "",
            quyenloisv: "",
            ghichu: "", // co the null
        };
    }

    async componentDidMount() {
        let internship_location = this.props.currentUser;
        if (internship_location && !_.isEmpty(internship_location)) {
            this.setState({
                macoquan: internship_location.Coquan.ma_co_quan,
                tencoquan: internship_location.Coquan.ten_co_quan,
                tendaydu: internship_location.Coquan.ten_day_du, // co the null
                tinhtp: internship_location.Coquan.tinh_tp,
                diachi: internship_location.Coquan.dia_chi,
                website: internship_location.Coquan.website,
                sdtcoquan: internship_location.Coquan.sdt_co_quan,
                emailcoquan: internship_location.Coquan.email_co_quan,
                manhanvien: internship_location.ma_nhan_vien,
                noidungcv: internship_location.noi_dung_cv,
                gio1tuan: internship_location.gio_1tuan,
                moitruonglamviec: internship_location.moi_truong_lam_viec,
                soluongsv: internship_location.so_luong_sv,
                yeucausv: internship_location.yeu_cau_sv,
                quyenloisv: internship_location.quyen_loi_sv,
                ghichu: internship_location.ghi_chu, // co the null
            });
        }

        await this.getAllFromReact();
    }

    getAllFromReact = async () => {};

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleonChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "macoquan",
            "tencoquan",
            "tinhtp",
            "diachi",
            "sdtcoquan",
            "emailcoquan",
            "noidungcv",
            "gio1tuan",
            "soluongsv",
            "yeucausv",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error("Hãy điền đầy đủ thông tin để hoàn thành!", {
                    duration: 6500,
                });
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    };

    render() {
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
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <div>
                        {/* <i class="far fa-address-card"> </i> */}
                        {/* <i class="fas fa-map-marker-alt"></i> */}
                        <i class="far fa-building"></i>
                        {/* <FormattedMessage id="menu.admin.edit-info" />:{" "} */}
                        {this.state.tencoquan} - {this.state.tinhtp}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-id" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company ID"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "macoquan");
                                }}
                                value={this.state.macoquan}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-name" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company name"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "tencoquan"
                                    );
                                }}
                                value={this.state.tencoquan}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-city" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter City"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "tinhtp");
                                }}
                                value={this.state.tinhtp}
                            />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-website" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company website"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "website");
                                }}
                                value={this.state.website}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-phone" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company phone"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "sdtcoquan"
                                    );
                                }}
                                value={this.state.sdtcoquan}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-email" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company email"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "emailcoquan"
                                    );
                                }}
                                value={this.state.emailcoquan}
                            />
                        </div>
                    </div>

                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.company-address" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company address"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "diachi");
                                }}
                                value={this.state.diachi}
                            />
                        </div>
                    </div>

                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.work-content" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Work content"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "noidungcv"
                                    );
                                }}
                                value={this.state.noidungcv}
                            />
                        </div>
                    </div>

                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.skill-requirements" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Skill requirements"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "yeucausv");
                                }}
                                value={this.state.yeucausv}
                            />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.student-rights" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Student rights"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "quyenloisv"
                                    );
                                }}
                                value={this.state.quyenloisv}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.work-environment" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Work environment"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "moitruonglamviec"
                                    );
                                }}
                                value={this.state.moitruonglamviec}
                            />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.hours/week" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Hours/week"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "gio1tuan");
                                }}
                                value={this.state.gio1tuan}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.max-student" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Max student"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "soluongsv"
                                    );
                                }}
                                value={this.state.soluongsv}
                            />
                        </div>
                    </div>

                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="menu.internship-location.note" />
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Note"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "ghichu");
                                }}
                                value={this.state.ghichu}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-primary px-3"
                        onClick={() => {
                            this.handleSaveUser();
                        }}
                    >
                        <i class="fas fa-check"></i>
                        <FormattedMessage id="menu.admin.confirm" />
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className="btn-secondary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        <i class="fas fa-times"></i>
                        <FormattedMessage id="menu.admin.close" />
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
)(ModalEditInternshipLocation);
