import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
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
    }

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
            "id",
            "sinhvien",
            "format",
            "trinhbay",
            "lichlamviec",
            "sobuoithuctap",
            "kehoachcongtac",
            "kehoachcongtac",
            "hieubietcoquan",
            "ppthuchien",
            "cungcolythuyet",
            "kynangthuchanh",
            "kinhnghiemthuctien",
            "donggopcoquan",
            "khongsinhhoat",
            "khongphieugiaoviec",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error("H??y ??i???n ?????y ????? th??ng tin ????? ho??n th??nh!", {
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
                {/* thong bao - start */}
                <Toaster position="top-right" reverseOrder={false} />
                {/* thong bao - end */}
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <div>
                        <i class="fas fa-tasks"></i>
                        {"   "}
                        {/* <FormattedMessage id="menu.admin.edit-info" /> */}
                        <span>Phi???u ch???m ??i???m</span>
                        {" | "}
                        {this.state.id}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "format");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "trinhbay");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "lichlamviec"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "sobuoithuctap"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kehoachcongtac"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "hieubietcoquan"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "ppthuchien"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "cungcolythuyet"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kynangthuchanh"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "kinhnghiemthuctien"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "donggopcoquan"
                                    );
                                }}
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
                            <select
                                id="mySelect"
                                type="text"
                                // placeholder="Nh???p v??o ????nh gi??"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "khongsinhhoat"
                                    );
                                }}
                                value={this.state.khongsinhhoat}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Ch???n
                                </option>
                                <option className="option" value="0">
                                    C?? D??? H???P
                                </option>
                                <option className="option" value="1">
                                    KH??NG D??? H???P
                                </option>
                            </select>
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
                            <select
                                id="mySelect"
                                type="text"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "khongphieugiaoviec"
                                    );
                                }}
                                value={this.state.khongphieugiaoviec}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Ch???n
                                </option>
                                <option className="option" value="0">
                                    G???I ????NG H???N
                                </option>
                                <option className="option" value="1">
                                    KH??NG G???I/G???I KH??NG ????NG H???N
                                </option>
                            </select>
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
                    {/* ----------------------------------------------------------------- */}
                    <div className="sigal-input">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.admin.address" /> */}
                                <span
                                    style={{
                                        color: "#e74c3c",
                                    }}
                                >
                                    * Ch?? ??: Ki???m tra k??? th??ng tin, phi???u s???
                                    ???????c L??U v?? KH??NG TH??? S???A ?????I!
                                </span>
                            </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditScore);
