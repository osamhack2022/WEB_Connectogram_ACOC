import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Admin = () => {
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState("");

  const [UserName, setUserName] = useState("");
  const [Permission, setPermission] = useState("");

  const [ApprovalList, setApprovalList] = useState([]);

  const handleToast = (msg) => {
    setToastMsg(msg);
    setToastStatus(true);
    setTimeout(() => {
      setToastStatus(false);
    }, 1000);
  };

  useEffect(() => {
    sessionCheck();
    getApprovalList();
  }, []);

  const getApprovalList = () => {
    axios.get(process.env.REACT_APP_BACK_API + "/api/user/viewUserApprovalList", 
    {}, {withCredentials: true}).then((res) => {
      if ("err_msg" in res.data) return;
      let temp = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].approval == "승인대기") temp.push(res.data[i]);
      }
      setApprovalList(temp);
    });
  };

  const goApproval = ( idx ) => {
    console.log(idx);
    axios.get(process.env.REACT_APP_BACK_API + "/api/user/userApproval", 
    { params: { idx: idx, approval: "승인" }, }, {withCredentials: true}).then((res) => {
      if ("err_msg" in res.data) return;
      if (res.data.msg == '처리완료') {
        handleToast("승인이 완료되었습니다.");
        let temp = [];
        for (let i = 0; i < ApprovalList.length; i++) {
          if (ApprovalList[i].idx != idx) temp.push(ApprovalList[i]);
        }
        setApprovalList(temp);
      }
    });
  };

  const sessionCheck = () => {
    if (sessionStorage.getItem("session_id") === null) {
      alert("로그인해주세요.");
      window.location.replace("/");
      return;
    }
    axios
      .get(
        process.env.REACT_APP_BACK_API + "/api/session/check",
        {
          params: { session_id: sessionStorage.getItem("session_id") },
        },
        { withCredentials: true }
      )
      .then((res) => {
        if ("err_msg" in res.data) {
          alert("로그인해주세요.");
          window.location.replace("/");
          return;
        }
        console.log(res.data);
        console.log(res.data.userInfo.user_name);
        setUserName(res.data.userInfo.user_name);
        setPermission(res.data.userInfo.permission);
      });
  };

  /*useEffect(() => {
        if (ToastStatus) {
            setTimeout(() => setToastStatus(false), 1000);
        }
    }, [ToastStatus]);
    */

  const userLogout = () => {
    axios
      .get(
        process.env.REACT_APP_BACK_API + "/api/session/logout",
        {
          params: { session_id: sessionStorage.getItem("session_id") },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        console.log(typeof res.data);
        alert("로그아웃 되었습니다.");
        window.location.replace("/");
      });
  };

  return (
    <div className="root" style={{ width: '100vw', height: "100vh", backgroundColor: 'rgb(7, 12, 39)', color: 'white' }}>
      <div style={{ }}>
        <AppBar
          position="static"
          style={{
            height: "auto",
            alignItems: "center", backgroundColor: "#171c36", borderBottom: '1px solid #868897'
          }}
        >
          <Toolbar style={{ width: "100%", padding: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                left: "0%",
                marginLeft: "48px",
              }}
            >
              <Link to="/overview">
                <ArrowBackIcon sx={{ color: "white" }} />
              </Link>
            </div>
            <Typography
              variant="div"
              style={{
                fontSize: "28px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Noto Serif KR",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Connectogram
            </Typography>
            <div
              style={{
                width: "30%",
                position: "absolute",
                right: "0%",
                marginRight: "48px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <img
                    style={{ height: "5vh" }}
                    alt="iPhone_01"
                    src="img/army.png"
                  />
                  <div
                    style={{
                      marginLeft: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{ fontFamily: "Noto Sans KR", fontSize: "13px" }}
                    >
                      육군 사이버작전센터
                    </span>
                    <span style={{ fontFamily: "Noto Sans KR" }}>
                      {UserName}님
                    </span>
                  </div>
                </div>
                <div
                  style={{ marginLeft: "48px", fontFamily: "Noto Sans KR" }}
                  onClick={() => userLogout()}
                >
                  로그아웃
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ fontFamily: 'Noto Sans KR' }}>
        <div style={{ marginLeft: '100px', marginTop: '32px', fontSize: '32px'}}>
          승인 대기 중인 계정들</div>
        <div style={{ paddingLeft: '128px', paddingRight: '128px', marginTop: '48px', display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", gridAutoFlow: "row", gridAutoRows: "12vw", alignItems: 'center', justifyContent: 'center', placeItems: 'center'}}>
          {ApprovalList.map((el, i) => (
            <div key={i} style={{width: '25vw', height: '10vw', backgroundColor: '#ffffff22', borderRadius: '8px'}}>
              <div style={{ height: '8vw',}}>
                <div style={{ padding: '32px'}}>
                  <div>유저 ID : {el.idx}</div>
                  <div>유저 EMAIL : {el.email}</div>
                  <div>가입 신청 일시 : {el.reg_date}</div>
                  <div>권한 : {el.permission}</div>
                </div>
              </div>
              <div onClick={() => goApproval(el.idx)} style={{height: '2vw', width: '100%', textAlign: 'center', userSelect: 'none'}}>계정 승인</div>
            </div>
          ))}
        </div>
      </div>
      {ToastStatus && <Toast msg={ToastMsg} />}
    </div>
  );
};

export default Admin;
