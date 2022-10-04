import { useState } from 'react';
import './Intro.css';

const Intro = () => {
    const [Login, setLogin] = useState(0);

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