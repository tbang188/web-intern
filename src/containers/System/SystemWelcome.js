import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./SystemWelcome.scss";
import toast, { Toaster } from "react-hot-toast"; // thong bao

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        let { userInfo } = this.props;
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    notification() {
        let { userInfo } = this.props;
        // console.log("check userInfo", userInfo.loai_tai_khoan);
        if (userInfo.loai_tai_khoan === "R5") {
            toast.success("Đăng nhập thành công!", {
                duration: 4000,
            });
            setTimeout(() => {
                toast("Đây là hệ thống dành cho Cán bộ hướng dẫn!", {
                    duration: 4000,
                    style: {
                        color: "#0984e3",
                    },
                });
            }, 500);
        }
        if (userInfo.loai_tai_khoan === "R4") {
            toast.success("Đăng nhập thành công!", {
                duration: 4000,
            });
            setTimeout(() => {
                toast("Đây là hệ thống dành cho Giáo vụ khoa!", {
                    duration: 4000,
                    style: {
                        color: "#0984e3",
                    },
                });
            }, 500);
        }
        if (userInfo.loai_tai_khoan === "R3") {
            toast.success("Đăng nhập thành công!", {
                duration: 4000,
            });
            setTimeout(() => {
                toast("Đây là hệ thống dành cho Giảng viên hướng dẫn!", {
                    duration: 4000,
                    style: {
                        color: "#0984e3",
                    },
                });
            }, 500);
        }
        if (userInfo.loai_tai_khoan === "R1") {
            toast.success("Đăng nhập thành công!", {
                duration: 4000,
            });
            setTimeout(() => {
                toast("Đây là hệ thống dành cho Quản trị viên!", {
                    duration: 4000,
                    style: {
                        color: "#0984e3",
                    },
                });
            }, 500);
        }
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="welcome-container">
                {/* thong bao - start */}
                <Toaster position="top-center" reverseOrder={false} />
                {/* thong bao - end */}
                {this.notification()}
                <div className="title text-center">
                    Wellcome to CIT Interns System Manager!
                </div>
                {/* <div className="welcome-content">
                    <div>Welcome to CIT Intenrs system manager!</div>
                    <div className="logo"></div>
                    <div className="logo-cit"></div>
                    <div className="logo-ctu"></div>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
