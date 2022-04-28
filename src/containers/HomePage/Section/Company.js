import React, { Component } from "react";
import { connect } from "react-redux";
import "./Company.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    getAllInternshipLocation, // ok
} from "../../../services/userService";
import { withRouter } from "react-router";

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrInternshipLocation: [],
        };
    }

    async componentDidMount() {
        await this.getAllFromReact();
    }

    getAllFromReact = async () => {
        let response = await getAllInternshipLocation("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrInternshipLocation: response.internship_location,
            });
        }
    };

    handleViewInternshipDetail = (internship) => {
        // console.log("check view internship ", internship);
        this.props.history.push(`/detail-internship/${internship.ma_co_quan}`);
    };

    render() {
        let arrInternshipLocation = this.state.arrInternshipLocation;
        // console.log("check arrInternshipLocation", arrInternshipLocation);

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };
        return (
            <div className="section-company">
                <div className="company-content">
                    <p className="text-title tracking-in-expand-fwd">
                        <img
                            class="emojione"
                            alt="🎉"
                            title=":tada:"
                            src="https://cdn.jsdelivr.net/emojione/assets/png/1f389.png?v=2.2.7"
                        />
                        <FormattedMessage id="company.internship-news" />
                    </p>
                    <Slider {...settings}>
                        {arrInternshipLocation &&
                            arrInternshipLocation
                                .slice(0)
                                .reverse()
                                .map((item, index) => {
                                    return (
                                        <div className="item-slick">
                                            <div
                                                className="item-content"
                                                onClick={() =>
                                                    this.handleViewInternshipDetail(
                                                        item
                                                    )
                                                }
                                            >
                                                <div className="img">
                                                    <div className="name">
                                                        <i class="fas fa-building"></i>
                                                        {
                                                            item.Coquan
                                                                .ten_co_quan
                                                        }
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <div className="properties">
                                                        <div className="property-row">
                                                            <div className="property">
                                                                <i className="fas fa-users"></i>
                                                                số lượng:{" "}
                                                                {
                                                                    item.so_luong_sv
                                                                }
                                                            </div>
                                                            <div className="property">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                                {
                                                                    item.Coquan
                                                                        .tinh_tp
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="property-row">
                                                            <div className="property">
                                                                <i class="fas fa-clock"></i>
                                                                giờ/tuần:{" "}
                                                                {item.gio_1tuan}
                                                            </div>
                                                            <div className="property">
                                                                <i class="fas fa-address-card"></i>
                                                                {
                                                                    item.Coquan
                                                                        .sdt_co_quan
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Company)
);
