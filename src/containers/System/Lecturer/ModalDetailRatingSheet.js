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
                        <span>Phiếu đánh giá sinh viên</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {/* {"(phiếu này được gửi từ Cán bộ hướng dẫn)"} */}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.subject-id" /> */}
                                Ngày lập phiếu
                            </label>
                            <DatePicker disabled value={this.state.ngaylap} />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-line">
                        <div className="input-container">
                            <span>
                                <i class="far fa-check-circle"></i> Tinh thần kỷ
                                luật (điểm 1 - 10)
                            </span>
                        </div>
                    </div>
                    <div className="sigal-input">
                        <div className="input-container"></div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Thực hiện nội quy của cơ quan</label>
                            <input
                                type="text"
                                disabled
                                value={this.state.noiquy}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.text" /> */}
                                Chấp hành giờ giấc làm việc
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
                                Thái độ giao tiếp với cán bộ trong đơn vị
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
                                Tích cực trong công việc
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
                                <i class="far fa-check-circle"></i> Khả năng
                                chuyên môn, nghiệp vụ (điểm 1 - 10)
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
                                Điểm đáp ứng yêu cầu công việc
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
                                Tinh thần học hỏi, nâng cao trình độ
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
                                Có đề xuất, sáng kiến, năng động trong công việc
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
                                <i class="far fa-check-circle"></i> Kết quả công
                                tác (điểm 1 - 10)
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
                                Báo cáo tiến độ công việc cho các bộ hướng dẫn
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
                                Hoàn thành công việc được giao
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
                                Kết quả công việc có đóng góp cho cơ quan nơi
                                thực tập
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
                                <i class="fas fa-user-edit"></i> Nhận xét khác
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
                                Nhận xét khác về sinh viên
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
                                    Đánh giá của cơ quan về trương trình đào tạo
                                    (CTĐT)
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
                                Đề xuất góp ý của cơ quan về CTĐT
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
                                <span>Tổng điểm: {tong}/100</span>
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
                        <span>Đóng</span>
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
