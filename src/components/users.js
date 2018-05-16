import React, { Component } from "react";
import {Link } from "react-router-dom";
import NavBar from "./navbar";
import {getUsers} from "../api";
import propTypes from "prop-types";

class Users extends Component {

    state = {
      users: []
    }

    componentWillMount() {
      getUsers()
        .then(body => {
          this.setState({
            users: body
          });
        })
        .catch(() => {
          this.props.history.push("/404");
        });
    }

    render() {

      return (
        <div>
          <NavBar tab={"users"}/>
          <div className="container" style={{ "marginBottom": "20px" }}>
            <div className="notification" style={{ "textAline": "center" }}>
              <p className="title is-3 ">Northcoder News Users</p>
            </div>
          </div>
          <div className="box" style={{"margins":"0 auto"}}>
            <div className="columns"  >
              {this.state.users.map((user,i) => {
                return (
                  <div className="column" key={i}>
                    <ul>
                      <li><Link to={`/users/${user.username}`}>{user.username}</Link></li>
                      <li><Link to={`/users/${user.username}`}><img src={`${user.avatar_url}`} alt=''/></Link></li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
}

Users.propTypes ={
  match:propTypes.object,
  history:propTypes.object
};



export default Users;