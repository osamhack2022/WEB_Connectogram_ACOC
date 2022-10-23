import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';import
DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';

const Card = ( props ) => {
    const navigate = useNavigate();

    const [TextColor, setTextColor] = useState("#ffffff");
    const [BackColor, setBackColor] = useState('rgb(0, 120, 0)');
    const [HoverTextColor, setHoverTextColor] = useState("rgb(0, 120, 0)");
    const [HoverBackColor, setHoverBackColor] = useState('#ffffff');
    
    const LowData = useRef(null);
    const [ConnectionCnt, setConnectionCnt] = useState(0);
    const [MaliciousCnt, setMaliciousCnt] = useState(0);
    const [StandardTime, setStandardTime] = useState("");
    const [isLoading, setisLoading] = useState(true);

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     
     const handleMouseLeave = () => {
        setIsHover(false);
     };

    useEffect(() => {
        if (MaliciousCnt > 10) {
            setBackColor('rgb(255, 92, 82)');
            setHoverTextColor('rgb(255, 92, 82)');
        } else if (MaliciousCnt > 5) {
            setBackColor('rgb(255, 171, 46)');
            setHoverTextColor('rgb(255, 171, 46)');
        }
    }, [isLoading]);

    const getClientsData = async () => {
        await axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/connection-data", {
            params: { ip: props.item.public_ip, lastest: '1' }
        }, { withCredentials: true }).then((res) => {
            LowData.current = res.data;
            let conData = res.data[0].connection;
            setStandardTime(res.data[0].time);
            setConnectionCnt(conData.length);
            for (let i = 0; i < conData.length; i++) {
                if (conData[i].malicious) setMaliciousCnt(MaliciousCnt + 1);
            }
            setisLoading(false);
        });
    };

    useEffect(() => {
        getClientsData();
    }, []);

    const goDetail = () => {
        navigate('/dashboard', { state: { LowData: LowData.current } });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: '32px', paddingRight: '32px', height: '25vh', backgroundColor: isHover ? HoverBackColor : BackColor, margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={goDetail}
        >
            <DesktopWindowsTwoToneIcon sx={{ fontSize: 120, color: isHover ? HoverTextColor : TextColor }} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>공인 IP : {props.item.public_ip}</span>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>사설 IP : {props.item.private_ip}</span>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>현재 연결 수 : {isLoading ? "로딩 중..." : ConnectionCnt}</span>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>현재 악성 연결 수 : {isLoading ? "로딩 중..." : MaliciousCnt}</span>
                {isLoading ? null : <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>{StandardTime.split(".")[0]} 기준</span>}
            </div>  
        </div>
    );
}

export default Card;