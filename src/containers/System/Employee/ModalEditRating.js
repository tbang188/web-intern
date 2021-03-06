import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash"; //xu ly mang ~ jquery
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class ModalEditRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            sinhvien: "",
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
            "noiquy",
            "giogiac",
            "giaotiep",
            "tichcuc",
            "dapungyccv",
            "tthoctap",
            "dexuatsangtao",
            "baocaotiendo",
            "donggop",
            "hoanthanh",
            "nhanxetkhac",
            "ctdt",
            "gopyctdt",
            "ngaylap",
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

    handleonChangeDatePicker = (date) => {
        this.setState({
            ngaylap: date[0],
        });
    };

    render() {
        let tongdiem =
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
                        <span>Phi???u ????nh gi??</span>
                        {" | "}
                        {this.state.id}
                        {"  "}
                        {"(phi???u s??? ???????c g???i cho Gi???ng vi??n h?????ng d???n)"}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>
                                {/* <FormattedMessage id="menu.lecturer.subject-id" /> */}
                                Ng??y l???p phi???u
                            </label>
                            <DatePicker
                                placeholder="dd/mm/yyyy"
                                onChange={this.handleonChangeDatePicker}
                                value={this.state.ngaylap}
                            />
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "noiquy");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "giogiac");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "giaotiep");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "tichcuc");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "dapungyccv"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "tthoctap");
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "dexuatsangtao"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "baocaotiendo"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "hoanthanh"
                                    );
                                }}
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
                                placeholder="Nh???p v??o ??i???m"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "donggop");
                                }}
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
                                placeholder="Nh???p v??o nh???n x??t"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "nhanxetkhac"
                                    );
                                }}
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
                            {/* <input
                                type="text"
                                placeholder="Nh???p v??o ????nh gi??"
                                onChange={(event) => {
                                    this.handleonChangeInput(
                                        event,
                                        "nhanxetkhac"
                                    );
                                }}
                                value={this.state.nhanxetkhac}
                            /> */}
                            <select
                                id="mySelect"
                                type="text"
                                placeholder="Nh???p v??o ????nh gi??"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "ctdt");
                                }}
                                value={this.state.ctdt}
                            >
                                <option
                                    className="option"
                                    value=""
                                    disabled
                                    selected
                                >
                                    Ch???n ????nh gi??
                                </option>
                                <option className="option">
                                    Ph?? h???p v???i th???c t???
                                </option>
                                <option className="option">
                                    Kh??ng ph?? h???p v???i th???c t???
                                </option>
                            </select>
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
                                placeholder="Nh???p v??o ????? xu???t g??p ??"
                                onChange={(event) => {
                                    this.handleonChangeInput(event, "gopyctdt");
                                }}
                                value={this.state.gopyctdt}
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
                                <span>T???ng ??i???m: {tongdiem}/100</span>
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
                                    ???????c g???i ??i v?? kh??ng th??? quay l???i
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditRating);
