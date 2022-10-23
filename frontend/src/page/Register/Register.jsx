import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState("");

  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [CONFIRM, setCONFIRM] = useState("");
  const [NAME, setNAME] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [PHONE, setPHONE] = useState("");

  const [NEXT, setNEXT] = useState(false);

  const bothFieldsAreFilled = PW && CONFIRM;
  const passwordsMatch = PW === CONFIRM;

  const handleToast = (msg) => {
    setToastStatus(true);
    setToastMsg(msg);
  };

  const gotoLogin = (e) => {
    navigate("/");
  };

  /*useEffect(() => {
        if (ToastStatus) {
            setTimeout(() => setToastStatus(false), 1000);
        }
    }, [ToastStatus]);
    */
  const excuteRegister = () => {
    axios
      .get(process.env.REACT_APP_BACK_API + "/api/user/viewUserApprovalList", {
        withCredentials: true,
      })
      .then((res) => {
        if ("err_msg" in res.data) handleToast(res.data["err_msg"]);
        else {
          if (ID.length == 0) handleToast("아이디를 입력하십시오.");
          else {
            if (res.data.filter((row) => row.user_id === ID).length !== 0)
              handleToast("중복된 아이디가 존재합니다.");
            else {
              if (PW.length == 0) handleToast("비밀번호를 입력하십시오.");
              else {
                if (PW !== CONFIRM)
                  handleToast("비밀번호가 일치하지 않습니다.");
                else {
                  if (NAME.length == 0) handleToast("이름을 입력하십시오.");
                  else {
                    if (NAME.length == 0) handleToast("이름을 입력하십시오.");
                    else {
                      if (EMAIL.length == 0)
                        handleToast("이메일을 입력하십시오.");
                      else {
                        if (PHONE.length == 0)
                          handleToast("연락처를 입력하십시오.");
                        else {
                          axios
                            .post(
                              process.env.REACT_APP_BACK_API +
                                "/api/user/register",
                              {
                                user_id: ID,
                                password: PW,
                                user_name: NAME,
                                email: EMAIL,
                                phone: PHONE,
                              },
                              { withCredentials: true }
                            )
                            .then((res) => {
                              if ("err_msg" in res.data)
                                handleToast(res.data["err_msg"]);
                              else {
                                handleToast("회원가입이 완료되었습니다.");
                              }
                            });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
  };

  return (
    <div className="Register">
      <div className="subtitle">군 사이버 보안의 미래</div>
      <div className="title">Connectogram</div>
      {NEXT ? (
        <div>
          <button className="signup_button" onClick={() => gotoLogin()}>
            LOGIN
          </button>
        </div>
      ) : (
        <div>
          <div className="register_form">
            <div className="register_icon">
              <AccountCircleIcon fontSize="inherit" />
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <PersonIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  className="register_input_com"
                  onChange={(e) => setID(e.target.value)}
                  placeholder="USER ID"
                />
              </div>
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <LockIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  type="password"
                  className="register_input_com"
                  onChange={(e) => setPW(e.target.value)}
                  placeholder="PASSWORD"
                />
              </div>
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <LockIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  type="password"
                  className="register_input_com"
                  onChange={(e) => setCONFIRM(e.target.value)}
                  placeholder="PASSWORD CONFIRM"
                />
              </div>
            </div>
            <div className="register_confirmbox">
              {bothFieldsAreFilled ? (
                passwordsMatch ? (
                  <p className="green">비밀번호가 일치합니다.</p>
                ) : (
                  <p className="red">비밀번호가 일치하지 않습니다.</p>
                )
              ) : (
                <p>비밀번호를 입력해주십시오.</p>
              )}
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <PersonIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  className="register_input_com"
                  onChange={(e) => setNAME(e.target.value)}
                  placeholder="USER NAME"
                />
              </div>
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <LockIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  className="register_input_com"
                  onChange={(e) => setEMAIL(e.target.value)}
                  placeholder="EMAIL"
                />
              </div>
            </div>
            <div className="register_input">
              <div className="register_input_icon">
                <PersonIcon fontSize="medium" />
              </div>
              <div className="register_inputbox">
                <input
                  className="register_input_com"
                  onChange={(e) => setPHONE(e.target.value)}
                  placeholder="PHONE NUMBER"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="register_button"
              onClick={() => excuteRegister()}
            >
              REGISTER
            </button>
          </div>
          <div>
            <button className="login_button" onClick={() => gotoLogin()}>
              LOGIN
            </button>
          </div>
        </div>
      )}
      {ToastStatus && <Toast msg={ToastMsg} />}
    </div>
  );
};

export default Register;
