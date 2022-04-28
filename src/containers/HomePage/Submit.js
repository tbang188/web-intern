import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import "../../assets/icon-diadiem-35px.png";
import LeftHomeHeader from "./LeftHomeHeader";
import axios from "axios";
import { downloadFileZip } from "../../services/userService";
import iconSubmit from "../../assets/icon-nopbaocao-35px.png";

import toast, { Toaster } from "react-hot-toast";
import { delay } from "lodash";

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            file: null,
        };
    }

    componentDidMount() {
        let { userInfo } = this.props;
        this.setState({
            name: userInfo.Nguoidung.s_id,
        });
    }

    send = (event) => {
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("file", this.state.file);
        axios
            // .post("http://quanlythuctap-cit.serveftp.com:8080/api/upload", data)
            .post("http://localhost:8080/api/upload", data)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast("Đã tải tập tin lên hệ thống", {
                        icon: <i class="fas fa-cloud-upload-alt"></i>,
                        duration: 6500,
                        style: {
                            color: "#6c5ce7",
                        },
                    });
                    setTimeout(() => {
                        toast.success("Nộp bài thành công!", {
                            duration: 6500,
                        });
                    }, 1000);
                } else {
                    toast.error("Lỗi nộp bài, thử lại nhé!", {
                        duration: 6500,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    //----------------NOTIFICATION-START-----------------
    notifyUploadSucceed = () => toast.success("Nộp bài thành công!");
    notifyUploadError4 = () => toast.error("Lỗi nộp bài, thử lại nhé!");
    notifyUploadError5 = () =>
        toast.error("Lỗi máy chủ, hãy quay lại sau ít phút!");
    //----------------NOTIFICATION-END-------------------

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <React.Fragment>
                <LeftHomeHeader />
                <Toaster position="top-right" reverseOrder={false} />
                {/* <div className="main-home-header"> */}
                <div className="home-header-container submit-header">
                    <div className="home-header-content">
                        <div className="wrap-header">
                            <div className="center-content">
                                <div className="left-item-content">
                                    <FormattedMessage id="left-header.submit" />
                                </div>
                                <div className="right-item-content">
                                    <FormattedMessage id="home-header.himyfr" />{" "}
                                    {userInfo && userInfo.Nguoidung.ho_ten
                                        ? userInfo.Nguoidung.ho_ten
                                        : ""}
                                    <i class="fas fa-user-circle"></i>
                                    {/* <i class="fas fa-caret-down"></i> */}
                                    <div
                                        className="btn btn-logout"
                                        onClick={processLogout}
                                        title="Log out"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                <div className="home-body-container">
                    <div className="home-body-content">
                        <div className="wrap-body">
                            <div className="center-body-content">
                                <div className="welcome fade-in background-image-1">
                                    <p className="text-title tracking-in-expand-fwd">
                                        {/* <i class="fas fa-cloud-upload-alt"></i>{" "} */}
                                        <img
                                            class="emojione"
                                            title=":tada:"
                                            src={iconSubmit}
                                        />{" "}
                                        <FormattedMessage id="left-header.submit" />
                                    </p>
                                    <div className="description">
                                        <div
                                            style={{
                                                border: "1px solid #e67e22",
                                                borderStyle: "dashed",
                                            }}
                                        >
                                            <center className="mt-3">
                                                <p className="text-bold">
                                                    Tải tập tin của bạn lên hệ
                                                    thống
                                                </p>

                                                <p className="red-text">
                                                    <span>
                                                        Lưu ý: Tập tin tải lên
                                                        phải được nén ở định
                                                        dạng
                                                    </span>
                                                    <span className="text-bold">
                                                        {" "}
                                                        *.zip
                                                    </span>
                                                </p>
                                                <p>
                                                    Ví dụ:
                                                    BaoCaoThucTapTT2021.zip
                                                </p>
                                                <form
                                                    action="#"
                                                    className="blue-text"
                                                >
                                                    <div>
                                                        <label htmlFor="file"></label>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            accept=".zip"
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                const file =
                                                                    event.target
                                                                        .files[0];
                                                                this.setState({
                                                                    file: file,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </form>
                                                <p></p>
                                            </center>

                                            <div className="rigister-container mb-3 mx-3">
                                                <button
                                                    class="button button-rigister"
                                                    onClick={this.send}
                                                >
                                                    Nộp báo cáo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p></p>
                                    <button onClick={this.notifyUploadError4}>
                                        Test notification
                                    </button> */}

                                    {/* api test start*/}
                                    {/* api test end*/}
                                </div>

                                <div className="footer-container">
                                    <div className="row">
                                        <div className="col-4 introduction">
                                            <div className="logo-cit-interns"></div>
                                            <div className="header">
                                                <FormattedMessage id="home-header.introduction" />
                                            </div>
                                            <div className="detail">
                                                <p>
                                                    <span className="text-bold">
                                                        CIT Interns
                                                    </span>{" "}
                                                    <FormattedMessage id="home-header.cit-interns-is" />
                                                </p>

                                                <p>
                                                    <FormattedMessage id="home-header.member-of-project" />
                                                    :
                                                </p>
                                                <ul>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.instructors" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/minhthu.ct"
                                                            target="_blank"
                                                        >
                                                            Trần Ng Minh Thư
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.student" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/anhphoang65/"
                                                            target="_blank"
                                                        >
                                                            Phan Hoàng Anh
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.student" />
                                                        </span>
                                                        &nbsp;-&nbsp;
                                                        <a
                                                            href="https://www.facebook.com/profile.php?id=100025480758295"
                                                            target="_blank"
                                                        >
                                                            Nguyễn Thanh Bằng
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-4 features">
                                            <div className="header">
                                                <FormattedMessage id="home-header.features" />
                                            </div>
                                            <div className="list">
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-diadiem"></div>
                                                    <FormattedMessage id="left-header.internship-location" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-mauphieu"></div>
                                                    <FormattedMessage id="left-header.form" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-nopbaocao"></div>
                                                    <FormattedMessage id="left-header.submit" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-huongdan"></div>
                                                    <FormattedMessage id="left-header.guide" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-forum"></div>
                                                    <FormattedMessage id="left-header.forum" />
                                                </a>
                                                <a
                                                    className="list-item"
                                                    href="#"
                                                >
                                                    <div class="icon-lienhe"></div>
                                                    <FormattedMessage id="left-header.contact" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="header">
                                                <FormattedMessage id="home-header.cit" />
                                                <br></br>
                                                <FormattedMessage id="home-header.ctu" />
                                            </div>
                                            <div className="detail">
                                                <ul>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.address" />
                                                            :{" "}
                                                        </span>
                                                        <FormattedMessage id="home-header.ctu-address" />
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            <FormattedMessage id="home-header.phone" />
                                                            :{" "}
                                                        </span>
                                                        (84) 0292 3 734713
                                                        <br></br>0292 3 831301
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Fax:{" "}
                                                        </span>
                                                        (84) 0292 3830841
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Email:{" "}
                                                        </span>
                                                        office@cit.ctu.edu.vn
                                                    </li>
                                                    <li>
                                                        <span className="text-bold">
                                                            Website:{" "}
                                                        </span>
                                                        <a href="http://www.cit.ctu.edu.vn/">
                                                            www.cit.ctu.edu.vn
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="support">
                                        <div className="left">
                                            &copy; 2021 CIT-INTERNS FROM{" "}
                                            <a
                                                href="http://www.cit.ctu.edu.vn/"
                                                target="_blank"
                                            >
                                                CIT
                                            </a>
                                        </div>
                                        <div className="right">
                                            <a href="mailto:office@cit.ctu.edu.vn?Subject=Xin Chào CIT Interns!">
                                                <i class="far fa-envelope"></i>{" "}
                                                office@cit.ctu.edu.vn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                    </div>
                </div>
                {/* </div> */}
            </React.Fragment>
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
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
