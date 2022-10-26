import "./Main.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import LogAndReport from "../LogAndReport/LogAndReport";
import Overview from "../Overview/Overview";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { LowData } = state;

  const [Menu, setMenu] = useState(0);

  const [UserName, setUserName] = useState("");
  const [Permission, setPermission] = useState("");

  useEffect(() => {
    sessionCheck();
  }, []);

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
    <div className="root" style={{ height: "100vh" }}>
      <div style={{ height: "12vh" }}>
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
                { Permission == "관리자" && <Link to="/admin" style={{textDecoration: 'none', color: 'white'}}><div style={{ marginRight: '48px', fontFamily: "Noto Sans KR"}}>계정 승인</div></Link> }
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
        <AppBar
          position="static"
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "49px",
            backgroundColor: "#171c36", borderBottom: '1px solid #868897', color: 'white',
          }}
        >
          <Toolbar
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography
              component="div"
              onClick={() => setMenu(0)}
              style={{
                color: Menu === 0 ? "#787878" : "#ffffff",
                fontFamily: "Noto Sans KR",
                userSelect: "none",
              }}
            >
              TRAFFIC MONITOR
            </Typography>
            <Typography
              component="div"
              onClick={() => setMenu(1)}
              style={{
                color: Menu === 1 ? "#787878" : "#ffffff",
                fontFamily: "Noto Sans KR",
                userSelect: "none",
              }}
            >
              THREAT ANALYSIS
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {UserName !== "" &&
        (Menu === 0 ? (
          <Dashboard LowData={LowData} />
        ) : (
          <LogAndReport LowData={LowData} />
        ))}
    </div>
  );
};

export default Main;
