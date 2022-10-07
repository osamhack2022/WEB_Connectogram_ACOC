import { useState } from 'react';
import './Intro.css';
import axios from "axios";
import { useEffect } from "react";

const Intro = () => {
    const [Login, setLogin] = useState(0);

    useEffect(() => {
        axios.post("/api/session/login", {
            key: process.env.REACT_APP_APIKEY,
            id: 'admin_test',
            password: 'test',
        }, { withCredentials: true }).then(res => {
            console.log(res.data);
        });
    }, []);

    return (
        <div className="Intro">
            <div className="subtitle">군 사이버 보안의 미래</div>
            <div className="title">Connectogram</div>
            <div className="signin_button" onClick={() => setLogin(!Login)}>
                LOGIN
            </div>
            {Login ? <div>HI</div> : <div>HELLO</div>}
            <div className='signup_button'>계정 신청</div>
        </div>
    );
}

export default Intro;