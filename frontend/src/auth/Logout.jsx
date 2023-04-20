import ax from "../utils/httpreq";
import { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    await this.logout();
  };
  logout = async () => {
    await ax.get("/logout");
    window.location.href = "/";
  };

  render = () => {
    return <></>;
  };
}

export default Logout;
