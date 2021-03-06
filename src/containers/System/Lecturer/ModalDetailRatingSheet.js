import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import { getAllRatingSheet } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ModalDetailRatingSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            arrDetail: [],
            hoten: "",
            noiquy: "",
            giogiac: "",
            giaotiep: "",
            tichcuc: "",
            dapungyccv: "",
            tthoctap: "",
            dexuatsangtao: "",
            baocaotiendo: "",
            donggop: "",
            hoanthanh: "",
            nhanxetkhac: "",
            ctdt: "",
            gopyctdt: "",
            ngaylap: "",
        };
    }

    async componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
            });
        }
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let user = this.props.currentUser;
        let response = await getAllRatingSheet(user.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrDetail: response.rating_sheet, // using for review
                noiquy: response.rating_sheet[0].noi_quy,
                giogiac: response.rating_sheet[0].gio_giac,
                giaotiep: response.rating_sheet[0].giao_tiep,
                tichcuc: response.rating_sheet[0].tich_cuc,
                dapungyccv: response.rating_sheet[0].dap_ung_yccv,
                tthoctap: response.rating_sheet[0].tt_hoc_tap,
                dexuatsangtao: response.rating_sheet[0].de_xuat_sang_tao,
                baocaotiendo: response.rating_sheet[0].bao_cao_tien_do,
                donggop: response.rating_sheet[0].dong_gop,
                hoanthanh: response.rating_sheet[0].hoan_thanh,
                nhanxetkhac: response.rating_sheet[0].nhan_xet_khac,
                ctdt: response.rating_sheet[0].ctdt,
                gopyctdt: response.rating_sheet[0].gop_y_ctdt,
                ngaylap: response.rating_sheet[0].ngay_lap,
            });
        }
    };

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        let arrDetail = this.state.arrDetail;
        let tong =
            Number(this.state.noiquy) +
            Number(this.state.giogiac) +
            Number(this.state.giaotiep) +
            Number(this.state.tichcuc) +
            Number(this.state.dapungyccv) +
            Number(this.state.tthoctap) +
            Number(this.state.dexuatsangtao) +
            Number(this.state.baocaotiendo) +
            Number(this.state.donggop) +
            Number(this.state.hoanthanh);

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
                        <span>Phi???u ????nh gi?? sinh vi??n</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {/* {"(phi???u n??y ???????c g???i t??? C??n b??? h?????ng d???n)"} */}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.subject-id" /> */}
                                Ng??y l???p phi???u
                            </label>
                            <DatePicker disabled value={this.state.ngaylap} />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Tinh th???n k???
                                lu???t (??i???m 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Th???c hi???n n???i quy c???a c?? quan</label>
                            <input
                                type="text"
                                disabled
                                value={this.state.noiquy}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Ch???p h??nh gi??? gi???c l??m vi???c
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.giogiac}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Th??i ????? giao ti???p v???i c??n b??? trong ????n v???
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.giaotiep}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                T??ch c???c trong c??ng vi???c
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.tichcuc}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Kh??? n??ng
                                chuy??n m??n, nghi???p v??? (??i???m 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                ??i???m ????p ???ng y??u c???u c??ng vi???c
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.dapungyccv}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Tinh th???n h???c h???i, n??ng cao tr??nh ?????
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.tthoctap}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                C?? ????? xu???t, s??ng ki???n, n??ng ?????ng trong c??ng vi???c
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.dexuatsangtao}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> K???t qu??? c??ng
                                t??c (??i???m 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                B??o c??o ti???n ????? c??ng vi???c cho c??c b??? h?????ng d???n
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.baocaotiendo}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                Ho??n th??nh c??ng vi???c ???????c giao
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.hoanthanh}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                K???t qu??? c??ng vi???c c?? ????ng g??p cho c?? quan n??i
                                th???c t???p
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.donggop}
                            />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="fas fa-user-edit"></i> Nh???n x??t kh??c
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
                                Nh???n x??t kh??c v??? sinh vi??n
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.nhanxetkhac}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span>
                                    ????nh gi?? c???a c?? quan v??? tr????ng tr??nh ????o t???o
                                    (CT??T)
                                </span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.ctdt}
                            />
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                ????? xu???t g??p ?? c???a c?? quan v??? CT??T
                            </label>
                            <input
                                type="text"
                                disabled
                                value={this.state.gopyctdt}
                            />
                        </div>
                    </div>
                    <div
                        className="sigal-line"
                        style={{
                            backgroundColor: "#6c5ce7",
                        }}
                    >
                        <div className="input-container">
                            <span>
                                <i class="fas fa-star"></i>{" "}
                                <span>T???ng ??i???m: {tong}/100</span>
                            </span>
                        </div>
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
)(ModalDetailRatingSheet);
