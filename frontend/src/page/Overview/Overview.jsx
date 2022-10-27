import React, { useCallback, useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import dayjs from "dayjs";
import CytoscapeComponent from "react-cytoscapejs";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Card from "./Card";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import "./Overview.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import background from "../../asset/background.png"; 
import { Link, useNavigate } from "react-router-dom";


const Overview = () => {
  // 새로고침 주기 (초)
  const interval = 16;
  const [NowTime, setNowTime] = useState(
    new Date().getTime() + interval * 1000
  );
  const [TimeLeft, setTimeLeft] = useState(interval);

  const [isLoading, setisLoading] = useState(true);
  const [Clients, setClients] = useState([]);

  const [isAutoRefresh, setisAutoRefresh] = useState(false);

  const [UserName, setUserName] = useState("");

  const [InternetAlert, setInternetAlert] = useState("");
  const [InternetAlertDate, setInternetAlertDate] = useState("");
  const [TodayKeywords, setTodayKeywords] = useState("로딩 중...");
  const [Threat1Cnt, setThreat1Cnt] = useState(0);
  const [Threat1Status, setThreat1Status] = useState("상승");
  const [Threat2Cnt, setThreat2Cnt] = useState(0);
  const [Threat2Status, setThreat2Status] = useState("상승");
  const [Threat3Cnt, setThreat3Cnt] = useState(0);
  const [Threat3Status, setThreat3Status] = useState("상승");
  const [NewsData, setNewsData] = useState([]);

  const [Permission, setPermission] = useState("");

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

  const getClientList = async () => {
    await axios
      .get(
        process.env.REACT_APP_BACK_API + "/api/analyze/client-list",
        {
          params: {},
        },
        { withCredentials: true }
      )
      .then((res) => {
        setClients(res.data);
      });

    setisLoading(false);
  };

  useEffect(() => {
    sessionCheck();
    getClientList();
    getKisaData();
  }, []);

  const getKisaData = () => {
    axios
      .get(process.env.REACT_APP_BACK_API + "/api/kisa", {
        withCredentials: true,
      })
      .then((res) => {
        if ("err_msg" in res.data) return;
        console.log(res.data);

        setInternetAlert(res.data.alertLevel.state);
        setInternetAlertDate(res.data.alertLevel.todayDate);

        let Keywords = "";
        for (let i = 0; i < res.data.keywordRanking.length; i++) {
          if (i == res.data.keywordRanking.length - 1) {
            Keywords += res.data.keywordRanking[i].keyword
              .replace("<strong>", "")
              .replace("</strong>", "");
          } else {
            Keywords +=
              res.data.keywordRanking[i].keyword
                .replace("<strong>", "")
                .replace("</strong>", "") + ", ";
          }
        }
        setTodayKeywords(Keywords);

        setThreat1Cnt(res.data.cyberAttact[0].data);
        setThreat1Status(res.data.cyberAttact[0].updown);
        setThreat2Cnt(res.data.cyberAttact[1].data);
        setThreat2Status(res.data.cyberAttact[1].updown);
        setThreat3Cnt(res.data.cyberAttact[2].data);
        setThreat3Status(res.data.cyberAttact[2].updown);

        setNewsData(res.data.totalNews.splice(0, 15));
      });
  };

  useEffect(() => {
    //console.log(ClientsData.current);
    if (!isAutoRefresh) return;
    let TimerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(TimerId);
    };
  });

  const setTimer = () => {
    if (TimeLeft <= 0) {
      setTimeLeft(interval);
      setNowTime(new Date().getTime() + interval * 1000);
    }
  };

  const calculateTimeLeft = () => {
    const currTime = new Date().getTime();
    return NowTime - currTime;
  };

  useEffect(() => {
    if (isAutoRefresh && TimeLeft < 0) {
      setisLoading(true);
      getClientList();
      setTimer();
    }
  }, [TimeLeft]);

  const handleAutoRefresh = () => {
    setisAutoRefresh(!isAutoRefresh);
  };

  const handleRefresh = () => {
    setisLoading(true);
    getClientList();
    setTimeLeft(interval);
    setNowTime(new Date().getTime() + interval * 1000);
  };

  useEffect(() => {
    if (isAutoRefresh) {
      setTimeLeft(interval);
      setNowTime(new Date().getTime() + interval * 1000);
    }
    console.log(isAutoRefresh);
  }, [isAutoRefresh]);

  return (
    <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgb(7, 12, 39)', color: 'white' }}>
      <AppBar
        position="static"
        style={{ alignItems: "center", backgroundColor: "#171c36", borderBottom: '1px solid #868897' }}
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
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: grey[500] }}>
                <div style={{ color: "black", fontWeight: "bold" }}>All</div>
              </Avatar>
              <Avatar
                sx={{
                  bgcolor: grey[50],
                }}
              >
                <img src="img/roka.png" alt="육군" width={30} height={30}></img>
              </Avatar>
              <Avatar sx={{ bgcolor: grey[50] }}>
                <img src="img/rokn.png" alt="해군" width={30} height={30}></img>
              </Avatar>
              <Avatar sx={{ bgcolor: grey[50] }}>
                <img
                  src="img/rokaf.png"
                  alt="공군"
                  width={30}
                  height={30}
                ></img>
              </Avatar>
              <Avatar sx={{ bgcolor: grey[50] }}>
                <img
                  src="img/rokmc.png"
                  alt="해병대"
                  width={30}
                  height={30}
                ></img>
              </Avatar>
              <Avatar sx={{ bgcolor: grey[50] }}>
                <img src="img/skaf.png" alt="국직" width={30} height={30}></img>
              </Avatar>
            </Stack>
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
                  flexDirection: "row",
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
      <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ width: "75vw" }}>
          <div
            style={{
              width: "75vw",
              height: "8vh",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "end",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Noto Sans KR",
                display: "flex",
                fontSize: 32,
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: -1,
              }}
            >
              Device Overview
            </div>
          </div>
          <div
            style={{
              width: "75vw",
              height: "5vh",
              backgroundColor: "transparent",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0%",
                marginLeft: "90px",
                fontFamily: "Noto Sans KR",
              }}
            >
              <span>자동 새로고침</span>
              <Switch checked={isAutoRefresh} onChange={handleAutoRefresh} sx={{ color: 'white'}} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginRight: "90px",
                position: "absolute",
                right: "0%",
                fontFamily: "Noto Sans KR",
              }}
            >
              <span
                style={{
                  display: isAutoRefresh ? "flex" : "none",
                  marginRight: "6px",
                }}
              >
                <span style={{ color: "blue" }}>
                  {dayjs(TimeLeft).format("ss")}
                </span>
                초 후
              </span>
              <RefreshIcon
                onClick={handleRefresh}
                fontSize="large"
                style={{
                  animation: isLoading
                    ? "rotate_image 1s linear infinite"
                    : "none",
                  transformOrigin: "50% 50%",
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <div
              style={{
                height: "90%",
                width: "70vw",
                backgroundColor: "transparent",
                textAlign: "center",
                fontFamily: "Noto Sans KR",
                fontSize: 40,
                paddingTop: 56,
              }}
            >
              로딩 중...
            </div>
          ) : (
            <div
              style={{
                height: "78vh",
                backgroundColor: "transparent",
                paddingRight: "80px",
                paddingLeft: "40px",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                zIndex: 1,
                display: "grid",
                gridAutoFlow: "row",
                gridAutoRows: "9vw",
              }}
            >
              {Clients.map((item, key) => (
                <Card key={key} item={item} />
              ))}
              {/*<div
                style={{
                  height: "8vw",
                  width: "8vw",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",
                  margin: "8px",
                  borderRadius: "8px",
                  border: "3px",
                  borderColor: "gray",
                }}
              >
                <AddCircleOutlineIcon sx={{ fontSize: 100, color: "white" }} />
            </div>*/}
            </div>
          )}
        </div>
        <div style={{ width: "25vw", display: "flex", alignItems: "center", color: 'rgb(203, 204, 210)', marginTop: '16px', position: 'absolute', left: '75%' }}>
          <div style={{ width: "23vw", height: '89vh', backgroundColor: 'rgb(17, 22, 51)' }}>
            <div
              style={{
                height: "4vh",
                backgroundColor: "black",
                color: "white",
                fontFamily: "Noto Sans KR",
                paddingLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              주요 대외기관 동향
            </div>
            <div
              style={{
                height: "85vh",
                backgroundColor: "transparent",
                borderBottomWidth: "0px",
                borderRightWidth: "0px",
              }}
            >
              <div
                style={{
                  height: "20vh",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "4vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{ fontFamily: "Noto Sans KR", fontSize: "12px" }}
                      >
                        인터넷침해사고 경보단계
                      </span>
                      <span
                        style={{ fontFamily: "Noto Sans KR", fontSize: "12px" }}
                      >
                        {InternetAlertDate} 기준
                      </span>
                    </div>
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        border: "10px solid transparent",
                        borderRight:
                          InternetAlert == "주의"
                            ? "10px solid rgb(255, 171, 46)"
                            : InternetAlert == "정상" || InternetAlert == "관심"
                            ? "10px solid rgb(0, 140, 82)"
                            : "10px solid rgb(255, 92, 82)",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20%",
                        height: "4vh",
                        backgroundColor:
                          InternetAlert == "주의"
                            ? "rgb(255, 171, 46)"
                            : InternetAlert == "정상" || InternetAlert == "관심"
                            ? "rgb(0, 140, 82)"
                            : "rgb(255, 92, 82)",
                        textAlign: "center",
                        lineHeight: "4vh",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      {InternetAlert}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "11vh",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontFamily: "Noto Sans KR",
                      borderTop: "1px solid black",
                      paddingTop: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                        justifyContent: "center",
                        textDecoration: "underline",
                      }}
                    >
                      오늘의 주요 키워드
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        width: "85%",
                        height: "9.8vh",
                        overflow: "hidden",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {TodayKeywords}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    height: "20vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "start",
                      paddingBottom: "16px",
                      paddingLeft: "16px",
                      fontFamily: "Noto Sans KR",
                    }}
                  >
                    <span style={{ textDecoration: "underline" }}>
                      오늘의 사이버 위협
                    </span>
                  </div>
                  <div style={{ width: "93%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      <div
                        style={{
                          width: "70%",
                          backgroundColor: "#ffff2222",
                          textAlign: "center",
                          fontSize: "12px",
                          padding: "6px",
                        }}
                      >
                        악성코드 발견 홈페이지
                      </div>
                      <div
                        style={{
                          width: "30%",
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "row",
                          fontSize: "11px",
                          padding: "5px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: 'black',
                        }}
                      >
                        <div>{Threat1Cnt} (개)</div>
                        {Threat1Status == "상승" ? (
                          <ArrowDropUpIcon
                            sx={{ color: "red" }}
                            fontSize="small"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            sx={{ color: "blue" }}
                            fontSize="small"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      <div
                        style={{
                          width: "70%",
                          backgroundColor: "#ffff2222",
                          textAlign: "center",
                          fontSize: "12px",
                          padding: "6px",
                        }}
                      >
                        신종 스미싱 악성 앱
                      </div>
                      <div
                        style={{
                          width: "30%",
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "row",
                          fontSize: "11px",
                          padding: "5px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: 'black',
                        }}
                      >
                        <div>{Threat2Cnt} (개)</div>
                        {Threat2Status == "상승" ? (
                          <ArrowDropUpIcon
                            sx={{ color: "red" }}
                            fontSize="small"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            sx={{ color: "blue" }}
                            fontSize="small"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      <div
                        style={{
                          width: "70%",
                          backgroundColor: "#ffff2222",
                          textAlign: "center",
                          fontSize: "12px",
                          padding: "6px",
                        }}
                      >
                        피싱ㆍ파밍 차단 사이트
                      </div>
                      <div
                        style={{
                          width: "30%",
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "row",
                          fontSize: "11px",
                          padding: "5px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: 'black',
                        }}
                      >
                        <div>{Threat3Cnt} (개)</div>
                        {Threat3Status == "상승" ? (
                          <ArrowDropUpIcon
                            sx={{ color: "red" }}
                            fontSize="small"
                          />
                        ) : (
                          <ArrowDropDownIcon
                            sx={{ color: "blue" }}
                            fontSize="small"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid black",
                  fontFamily: "Noto Sans KR",
                }}
              >
                <div
                  style={{
                    textDecoration: "underline",
                    marginTop: "12px",
                    marginLeft: "12px",
                    fontSize: "18px",
                  }}
                >
                  최신 자료
                </div>
                {NewsData !== [] &&
                  NewsData.map((el, i) => (
                    <a
                      key={i}
                      href={el.href}
                      style={{
                        width: "100%",
                        height: "4vh",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: 'white',
                      }}
                    >
                      <div
                        style={{
                          width: "75%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          paddingLeft: "12px",
                          paddingRight: "32px",
                        }}
                      >
                        {el.title}
                      </div>
                      <div
                        style={{
                          width: "25%",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        {el.date}
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
