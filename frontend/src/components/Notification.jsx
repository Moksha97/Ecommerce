import { notification } from "antd";

function Notification() {
  const [api, contextHolder] = notification.useNotification();
  api.error({
    message: this.props.message,
    description: response.data.error,
    placement: "topRight",
  });
  return <>{contextHolder}</>;
}

export default Notification;
