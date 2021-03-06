import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import {
    getAllRatingSheet,
    getAllScoreSheet,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ModalDetailScoreSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            arrDetail: [],
            sinhvien: "",
            format: "",
            trinhbay: "",
            lichlamviec: "",
            sobuoithuctap: "",
            kehoachcongtac: "",
            kehoachcongtac: "",
            hieubietcoquan: "",
            ppthuchien: "",
            cungcolythuyet: "",
            kynangthuchanh: "",
            kinhnghiemthuctien: "",
            donggopcoquan: "",
            khongsinhhoat: "",
            khongphieugiaoviec: "",
        };
    }

    async componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                sinhvien: user.sinh_vien,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let user = this.props.currentUser;
        let response = await getAllScoreSheet(user.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrDetail: response.score_sheet, // using for review
                format: response.score_sheet[0].format,
                trinhbay: response.score_sheet[0].trinh_bay,
                lichlamviec: response.score_sheet[0].lich_lam_viec,
                sobuoithuctap: response.score_sheet[0].so_buoi_thuc_tap,
                kehoachcongtac: response.score_sheet[0].ke_hoach_cong_tac,
                kehoachcongtac: response.score_sheet[0].ke_hoach_cong_tac,
                hieubietcoquan: response.score_sheet[0].hieu_biet_co_quan,
                ppthuchien: response.score_sheet[0].pp_thuc_hien,
                cungcolythuyet: response.score_sheet[0].cung_co_ly_thuyet,
                kynangthuchanh: response.score_sheet[0].ky_nang_thuc_hanh,
                kinhnghiemthuctien:
                    response.score_sheet[0].kinh_nghiem_thuc_tien,
                donggopcoquan: response.score_sheet[0].dong_gop_co_quan,
                khongsinhhoat: response.score_sheet[0].khong_sinh_hoat,
                khongphieugiaoviec:
                    response.score_sheet[0].khong_phieu_giao_viec,
            });
        }
    };

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        let arrDetail = this.state.arrDetail;
        let tongdiem =
            Number(this.state.format) +
            Number(this.state.trinhbay) +
            Number(this.state.lichlamviec) +
            Number(this.state.sobuoithuctap) +
            Number(this.state.kehoachcongtac) +
            Number(this.state.hieubietcoquan) +
            Number(this.state.ppthuchien) +
            Number(this.state.cungcolythuyet) +
            Number(this.state.kynangthuchanh) +
            Number(this.state.kinhnghiemthuctien) +
            Number(this.state.donggopcoquan);

        let diemtru =
            Number(this.state.khongsinhhoat) +
            Number(this.state.khongphieugiaoviec);

        let diemconlai =
            tongdiem -
            Number(this.state.khongsinhhoat) -
            Number(this.state.khongphieugiaoviec);

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
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <div>
                        <i class="fas fa-tasks"></i>{" "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        <span>Phi???u ch???m ??i???m</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {/* {"(phi???u n??y ???????c g???i t??? C??n b??? h?????ng d???n)"} */}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> H??nh th???c
                                tr??nh b??y (??i???m t???i ??a 1.0)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                <span>????ng format c???a khoa</span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.format}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                <span>Tr??nh b??y m???ch l???c, ch??nh t???</span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.trinhbay}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i>
                                <span> Phi???u theo d??i</span>
                                <span> (??i???m t???i ??a 4.75)</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>C?? l???ch l??m vi???c ?????y ????? cho 8 tu???n</span>
                                <span className="red-text"> (t???i ??a 0.25)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.lichlamviec}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    S??? bu???i th???c t???p t???i c?? quan trong 1 tu???n ???
                                    6
                                </span>
                                <span className="red-text">
                                    {" "}
                                    (t???i ??a 1.0, ??t h??n 6 bu???i 0.0 ??i???m)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.sobuoithuctap}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Ho??n th??nh t???t k??? ho???ch c??ng t??c ghi trong
                                    l???ch l??m vi???c. C??ch t??nh ??i???m = (??i???m c???ng
                                    c???a c??n b??? h?????ng d???n/100) x 3.5
                                </span>
                                <span className="red-text"> (t???i ??a 3.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kehoachcongtac}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> N???i dung
                                th???c t???p - quy???n b??o c??o (??i???m t???i ??a 4.25)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    C?? ???????c s??? hi???u bi???t t???t v??? c?? quan n??i th???c
                                    t???p
                                </span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.hieubietcoquan}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    Ph????ng ph??p th???c hi???n ph?? h???p v???i n???i dung
                                    c??ng vi???c ???????c giao
                                </span>
                                <span className="red-text"> (t???i ??a 1.0)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.ppthuchien}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>K???t qu??? c???ng c??? l?? thuy???t</span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.cungcolythuyet}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>K???t qu??? r??n luy???n k??? n??ng th???c h??nh</span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kynangthuchanh}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>Kinh nghi???m th???c ti???n thu nh???n ???????c</span>
                                <span className="red-text"> (t???i ??a 0.5)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.kinhnghiemthuctien}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    K???t qu??? c??ng vi???c c?? ????ng g??p cho c?? quan
                                    n??i th???c t???p
                                </span>
                                <span className="red-text"> (t???i ??a 1.25)</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.donggopcoquan}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#6c5ce7",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-star"></i>{" "}
                                <span>T???ng ??i???m: {tongdiem}/10</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#d63031",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-exclamation-circle"></i> ??i???m
                                tr???: {diemtru}
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>D??? h???p ????? nghe ph??? bi???n TTTT </span>
                                <span className="red-text">
                                    {" "}
                                    (KH??NG D??? H???P: tr??? 1 ??i???m)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.khongsinhhoat}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>G???i phi???u giao vi???c v??? khoa</span>
                                <span className="red-text">
                                    {" "}
                                    (KH??NG ????NG H???N: tr??? 1 ??i???m)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.khongphieugiaoviec}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#6c5ce7",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-star"></i>{" "}
                                <span>??i???m c??n l???i: {diemconlai}/10</span>
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        className="btn-secondary px-3"
                        onClick={() => {
                            this.toggle();
                        }}
                    >
                        <i class="fas fa-times"></i>
                        {/* <FormattedMessage id="menu.admin.close" /> */}
                        <span>????ng</span>
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
)(ModalDetailScoreSheet);
