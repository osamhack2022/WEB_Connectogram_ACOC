import { useState } from "react";
import "./Intro.css";
import axios from "axios";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ColorButton from "../../components/ColorButton";
import Stack from "@mui/material/Stack";

const Intro = () => {
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState("");

  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const navigate = useNavigate();

  const handleToast = (msg) => {
    setToastMsg(msg);
    setToastStatus(true);
    setTimeout(() => {
      setToastStatus(false);
    }, 1000);
  };

  /*useEffect(() => {
        if (ToastStatus) {
            setTimeout(() => setToastStatus(false), 1000);
        }
    }, [ToastStatus]);
    */
  const excuteLogin = () => {
    axios
      .post(
        process.env.REACT_APP_BACK_API + "/api/session/login",
        {
          id: ID,
          password: PW,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if ("err_msg" in res.data) handleToast(res.data["err_msg"]);
        else {
          console.log(res.data.session_id);
          sessionStorage.setItem("session_id", res.data.session_id);
          //handleToast("로그인 성공");
          //navigate("/");
          window.location.replace("/");
        }
      });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      excuteLogin();
    }
  };

  const gotoRegister = (e) => {
    navigate("/register");
  };

  return (
    <div className="Intro">
      <div className="subtitle">軍 사이버 보안의 미래</div>
      <div className="title">Connectogram</div>
      <div className="signin_form">
        <div className="signin_icon">
          <AccountCircleIcon fontSize="inherit" />
        </div>
        <div className="signin_input">
          <div className="signin_input_icon">
            <PersonIcon fontSize="medium" />
          </div>
          <div className="signin_inputbox">
            <input
              className="signin_input_com"
              onChange={(e) => setID(e.target.value)}
              onKeyPress={handleOnKeyPress}
              placeholder="USER ID"
              style={{ fontFamily: "Noto Sans KR", outline: "none" }}
            />
          </div>
        </div>
        <div className="signin_input">
          <div className="signin_input_icon">
            <LockIcon fontSize="medium" />
          </div>
          <div className="signin_inputbox">
            <input
              className="signin_input_com"
              onChange={(e) => setPW(e.target.value)}
              onKeyPress={handleOnKeyPress}
              placeholder="PASSWORD"
              type={"password"}
              style={{ fontFamily: "Noto Sans KR", outline: "none" }}
            />
          </div>
        </div>
      </div>
      <Stack spacing={6} direction="row">
        <div onClick={() => excuteLogin()}>
          <ColorButton
            variant="text"
            // className="signin_button"
            size="large"
            color="primary"
          >
            LOGIN
          </ColorButton>
        </div>
        <div onClick={() => gotoRegister()}>
          <ColorButton
            variant="text"
            // className="signup_button"
            size="large"
            color="primary"
          >
            Register
          </ColorButton>
        </div>
      </Stack>
      {ToastStatus && <Toast msg={ToastMsg} />}
    </div>
  );
};

export default Intro;
