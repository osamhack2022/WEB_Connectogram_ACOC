import { useState } from 'react';
import './Intro.css';
import axios from "axios";
import { useEffect } from "react";
import Toast from '../../components/Toast/Toast';
import PersonIcon from '@mui/icons-material/Person';


const Intro = () => {
    const [ToastStatus, setToastStatus] = useState(false);
    const [ToastMsg, setToastMsg] = useState("");

    const handleToast = (msg) => {
        setToastStatus(true);
        setToastMsg(msg);
    };

    useEffect(() => {
        if (ToastStatus) {
            setTimeout(() => setToastStatus(false), 1000);
        }
    }, [ToastStatus]);

    useEffect(() => {
        axios.get("/api/session/check", {
            key: process.env.REACT_APP_APIKEY,
        }, { withCredentials: true }).then(res => {
            console.log(res.data);
            if (typeof res.data == 'object') console.log("로그인 성공");
            else console.log("로그인 안돼있음");
        });
    }, []);

    const excuteLogin = () => {
        axios.post("/api/session/login", {
            key: process.env.REACT_APP_APIKEY,
            id: 'test',
            password: 'test',
        }, { withCredentials: true }).then(res => {
            console.log(res.data);
        });
        handleToast("cancel");
    };

    return (
        <div className="Intro">
            <div className="subtitle">군 사이버 보안의 미래</div>
            <div className="title">Connectogram</div>
            <div className="signin_form" style={{alignItems: 'center'}}>
                <div className="signin_input">
                    <PersonIcon />
                </div>
                <div className="signin_input">

                </div>
                <div style={{}}>
                    <div style={{borderBottom: '4px #ffffff solid', display: 'flex', alignItems: 'stretch'}}>ID <input style={{height: 'auto', backgroundColor: 'transparent', border: 0, color: '#ffffff'}} /></div>
                    <div>PW : <input /></div>
                </div>
            </div>
            <div className="signin_button" onClick={() => excuteLogin()}>
                LOGIN
            </div>
            <div className='signup_button'>계정 신청</div>
            {ToastStatus && <Toast msg={ToastMsg} />}
        </div>
    );
}

export default Intro;