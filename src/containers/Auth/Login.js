import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { reject } from "lodash";
import { userLoginSuccess } from "../../store/actions";
import { history } from "./../../redux";
import { withRouter } from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            // errUsernameMessage: '',
            // errPasswordMessage: '',
            errMessage: "",
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    };

    handleLogin = async () => {
        this.setState({
            errMessage: "",
            // errUsernameMessage: '',
            // errPasswordMessage: ''
        });

        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            // console.log('quan ly thuc tap', data)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login succeeds: ", data.user.loai_tai_khoan);
                let role = data.user.loai_tai_khoan;
                if (role === "R2") {
                    this.props.history.push(`/home`);
                } else {
                    this.props.history.push(`/system/welcome`);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                        //     errUsernameMessage: error.response.data.missUsernameMessage,
                        //     errPasswordMessage: error.response.data.missPasswordMessage
                    });
                }
            }
            console.log("quan ly thuc tap ", error.response);
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="logo-wrapper">
                            <div className="logo"></div>
                            <div className="logo-cit"></div>
                            <div className="logo-ctu"></div>
                        </div>
                        {/* <div className="col-12 text-login">Login</div> */}
                        <div className="col-12 text-login">Đăng nhập</div>
                        <div className="col-12 description">
                            {/* <span>Using Can Tho University account</span> */}
                            <span>Sử dụng tài khoản Đại Học Cần Thơ.</span>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>
                                <i className="fas fa-user"></i> Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                // placeholder="Enter your Email"
                                placeholder="Nhập Email"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnChangeUsername(event)
                                }
                            />
                            {/* <div className="col-12 err-message">
                                {this.state.errUsernameMessage}
                            </div> */}
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>
                                {/* <i class="fas fa-lock"></i> Password */}
                                <i class="fas fa-lock"></i> Mật khẩu
                            </label>
                            <div className="custom-input-password">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    // placeholder="Enter your Password"
                                    placeholder="Nhập Mật khẩu"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnChangePassword(event)
                                    }
                                    onKeyDown={(event) =>
                                        this.handleKeyDown(event)
                                    }
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    <i
                                        class={
                                            this.state.isShowPassword
                                                ? "fas fa-eye"
                                                : "fas fa-eye-slash"
                                        }
                                    ></i>
                                </span>
                            </div>
                            {/* <div className="col-12 err-message">
                                {this.state.errPasswordMessage}
                            </div> */}
                        </div>
                        <div className="col-12 err-message">
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                type="submit"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                {/* Login */}
                                Đăng nhập
                            </button>
                        </div>
                        <div className="col-12 forgot-password">
                            {/* <span>Forgot your password? Contact your</span>{" "}
                            <span className="text-bold text-decoration">
                                Academic advisor!
                            </span> */}
                            <span>Bạn quên mật khẩu? Hãy liên hệ với</span>{" "}
                            <a
                                href="http://www.cit.ctu.edu.vn/index.php/cac-don-v/van-phong-khoa"
                                className="text-bold text-decoration"
                            >
                                Cố vấn học tập!
                            </a>
                        </div>
                        {/*<div className="col-12 email-contact">
                            <i className="fab fa-google-plus google"></i>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
