import React, { Component } from "react";

export default class Logout extends Component {
  componentDidMount() {
    window.localStorage.setItem("isLogin", false);
    this.props.history.push("/login");
  }
  render() {
    return <div> Logging you out </div>;
  }
}
