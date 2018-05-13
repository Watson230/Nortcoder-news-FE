import React, { Component } from "react";
import {NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
class Navbar extends Component {

    state = {
      [this.props.tab]: "is-active",

    }

    tabHandler = (tab) => {
      this.setState({
        [tab]: "is-active"
      });
    }

    render() {
      return (
        <div>
          <Link to={"/"}><section className="hero is-danger">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                                NorthCoder News
                </h1>
                <h2 className="subtitle">
                                News for Northcoders in the North
                </h2>
              </div>
            </div>
          </section></Link>
          <div className="tabs" style={{ "marginBottom": "20px" }}>
            <ul>
              <li className={this.state.latest}><NavLink to={"/"}>Latest</NavLink></li>
              <li className={this.state.topics}><NavLink to={"/topics"}>Topics</NavLink></li>
              <li className={this.state.articles} ><NavLink to={"/articles"}>Articles</NavLink></li>
              <li className={this.state.users}><NavLink to={"/users"}>Users</NavLink></li>
            </ul>
          </div>
        </div>
      );
    }
}
Navbar.propTypes ={
  tab:PropTypes.string
};



export default Navbar;