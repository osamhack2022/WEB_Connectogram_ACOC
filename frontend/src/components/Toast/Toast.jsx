import "./Toast.css";

const Toast = ({ msg = "메세지 없음" }) => {
  return <div className="toast">{msg}</div>;
};

export default Toast;
