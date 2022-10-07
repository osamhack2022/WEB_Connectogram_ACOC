import { useState } from 'react';
import './Intro.css';
import axios from "axios";
import { useEffect } from "react";
import Toast from '../../components/Toast/Toast';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Intro = () => {
    const [ToastStatus, setToastStatus] = useState(false);
    const [ToastMsg, setToastMsg] = useState("");

    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");

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
            id: ID,
            password: PW,
        }, { withCredentials: true }).then(res => {
            console.log(res.data);
            if ("err_msg" in res.data) handleToast(res.data['err_msg']);
            else handleToast("로그인 성공");
        });
    };

    return (
        <div className="Intro">
            <div className="subtitle">군 사이버 보안의 미래</div>
            <div className="title">Connectogram</div>
            <div className="signin_form">
                <div className="signin_icon">
                    <AccountCircleIcon fontSize='inherit' />
                </div>
                <div className="signin_input">
                    <div className="signin_input_icon">
                        <PersonIcon fontSize='medium' />
                    </div>
                    <div className="signin_inputbox">
                        <input className="signin_input_com" onChange={(e) => setID(e.target.value)} placeholder="USER ID" />
                    </div>
                </div>
                <div className="signin_input">
                    <div className="signin_input_icon">
                        <LockIcon fontSize='medium' />
                    </div>
                    <div className="signin_inputbox">
                        <input className="signin_input_com" onChange={(e) => setPW(e.target.value)} placeholder="PASSWORD" />
                    </div>
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