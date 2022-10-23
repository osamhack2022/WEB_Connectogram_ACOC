import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState("");

  const handleToast = (msg) => {
    setToastStatus(true);
    setToastMsg(msg);
  };

  /*useEffect(() => {
        if (ToastStatus) {
            setTimeout(() => setToastStatus(false), 1000);
        }
    }, [ToastStatus]);
    */

  return (
    <div className="Admin">
      <div style={{ color: "black" }}>관리자 페이지 입니다.</div>
      {ToastStatus && <Toast msg={ToastMsg} />}
    </div>
  );
};

export default Admin;
