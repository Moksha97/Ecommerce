import ax from "../utils/httpreq";

function Logout() {
  async function logout() {
    await ax.get("/logout");
    window.location.href = "/login";
  }

  logout().then();
}

export default Logout;
