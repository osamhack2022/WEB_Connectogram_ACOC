import React, { useCallback, useEffect, useRef, useState } from "react";
import ApexCharts from 'react-apexcharts';
import axios from "axios";
import dayjs from "dayjs";
import CytoscapeComponent from 'react-cytoscapejs';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from "./Card";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';


const Overview = () => {
    // 새로고침 주기 (초)
    const interval = 16;
    const [NowTime, setNowTime] = useState(new Date().getTime() + interval * 1000);
    const [TimeLeft, setTimeLeft] = useState(interval);

    const [isLoading, setisLoading] = useState(true);
    const [Clients, setClients] = useState([]);

    const [isAutoRefresh, setisAutoRefresh] = useState(false);
    
    const [UserName, setUserName] = useState("");

    const sessionCheck = () => {
        if (sessionStorage.getItem('session_id') === null) {
            alert('로그인해주세요.');
            window.location.replace('/');
            return;
        }
        axios.get(process.env.REACT_APP_BACK_API + "/api/session/check", {
            params: { session_id: sessionStorage.getItem('session_id') }
        }, { withCredentials: true }).then(res => {
            if ("err_msg" in res.data) {
                alert("로그인해주세요.");
                window.location.replace("/");
                return;
            }
            setUserName(res.data.userInfo.user_name);
        });
    };
    
    const userLogout = () => {
        axios.get(process.env.REACT_APP_BACK_API + "/api/session/logout", {
            params: { session_id: sessionStorage.getItem('session_id') }
        }, { withCredentials: true }).then(res => {
            console.log(res.data);
            console.log(typeof res.data);
            alert("로그아웃 되었습니다.");
            window.location.replace("/");
        });
    };

    const getClientList = async () => {
        await axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/client-list", {
            params: {}
        }, { withCredentials: true }).then((res) => {
            setClients(res.data);
        });

        setisLoading(false); 
    };

    useEffect(() => {
        sessionCheck();
        getClientList();
    }, []);

    useEffect(() => {
        //console.log(ClientsData.current);
        if (!isAutoRefresh) return;
        let TimerId = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        return () => {
            clearTimeout(TimerId);
        }
    });
    
    const setTimer = () => {
        if (TimeLeft <= 0) {
            setTimeLeft(interval);
            setNowTime(new Date().getTime() + interval * 1000);
        }
    }

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
    }

    useEffect(() => {
        if (isAutoRefresh) {
            setTimeLeft(interval);
            setNowTime(new Date().getTime() + interval * 1000);
        }
        console.log(isAutoRefresh);
    }, [isAutoRefresh]);

    return (
        <div>
            <AppBar position="static" style={{ alignItems: 'center', backgroundColor: '#000000' }}>
                <Toolbar style={{width: '100%', padding: 0}}>
                    <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: '0%', marginLeft: '48px' }}>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>전체</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>육군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>해군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>공군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>해병대</div>
                        <div style={{fontFamily: 'Noto Sans KR'}}>국직</div>
                    </div>
                    <Typography variant="div" style={{ fontSize: '28px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Noto Serif KR', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Connectogram
                    </Typography>
                    <div style={{ width: '20%', position: 'absolute', right: '0%', marginRight: '48px' }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <img style={{height: '5vh'}} alt="iPhone_01" src="img/army.png" />
                                <div style={{marginLeft: '8px', display: 'flex', flexDirection: 'column'}}>
                                    <span style={{fontFamily: 'Noto Sans KR', fontSize: '13px'}}>육군 사이버작전센터</span>
                                    <span style={{fontFamily: 'Noto Sans KR', }}>{UserName}님</span>
                                </div>
                            </div>
                            <div style={{marginLeft: '48px', fontFamily: 'Noto Sans KR'}} onClick={() => userLogout()}>로그아웃</div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div>
                <div style={{width: '100%', height: '8vh', backgroundColor: 'transparent', display: 'flex', alignItems: 'end' }}> 
                    <div style={{backgroundColor: 'transparent', textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Noto Sans KR', display: 'flex', fontSize: 32, alignItems: 'center', justifyContent: 'center' }}>현재 등록된 자산들</div>         
                </div>
                <div style={{width: '100%', height: '5vh', backgroundColor: 'transparent'}}>
                    <div style={{position: 'absolute', left: '0%', marginLeft: '90px', fontFamily: 'Noto Sans KR'}}>
                        <span>자동 새로고침</span>
                        <Switch checked={isAutoRefresh} onChange={handleAutoRefresh} />
                    </div>
                    <div style={{ display: isAutoRefresh ? 'flex' : 'none', justifyContent: 'end', alignItems: 'center', marginRight: '90px', position: 'absolute', right: '0%', fontFamily: 'Noto Sans KR'}}>
                        <span style={{ marginRight: '6px' }}><span style={{ color: 'blue', }}>{dayjs(TimeLeft).format("ss")}</span>초 후</span>
                        <RefreshIcon fontSize='small' />
                    </div>
                </div>
                { isLoading ? <div>로딩 중...</div> : 
                <div style={{paddingRight: '50px', paddingLeft: '50px', gridTemplateRows: "1fr ", gridTemplateColumns: "1fr 1fr 1fr 1fr", zIndex: 1, backgroundColor: '#ffffff', display: 'grid' }}>
                    {Clients.map((item, key) => (
                        <Card key={key} item={item} />
                    ))}
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '25vh', backgroundColor: 'gray', margin: '8px', borderRadius: '8px', border: '3px', borderColor: 'gray'}}>
                        <AddCircleOutlineIcon sx={{ fontSize: 100, color: "white" }} />
                    </div>
                </div> }
            </div>
        </div>
    );
}

export default Overview;