import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';import
DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';

const Card = ( props ) => {
    const navigate = useNavigate();

    const [TextColor, setTextColor] = useState("#ffffff");
    const [BackColor, setBackColor] = useState('gray');
    const [HoverTextColor, setHoverTextColor] = useState("gray");
    const [HoverBackColor, setHoverBackColor] = useState('#ffffff');
    
    const LowData = useRef(null);
    const [ConnectionCnt, setConnectionCnt] = useState(0);
    const [MaliciousCnt, setMaliciousCnt] = useState(0);
    const [WarningsCnt, setWarningsCnt] = useState(0);
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
        if (isLoading === true) return;
        if (MaliciousCnt >= 1) {
            setBackColor('rgb(255, 92, 82)');
            setHoverTextColor('rgb(255, 92, 82)');
        } else {
            if (WarningsCnt >= 1) {
                setBackColor('rgb(255, 171, 46)');
                setHoverTextColor('rgb(255, 171, 46)');
            } else {
                setBackColor('rgb(0, 120, 0)');
                setHoverTextColor('rgb(0, 120, 0)');
            }
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
            let MaliCnt = 0;
            let WarnCnt = 0;
            for (let i = 0; i < conData.length; i++) {
                if (conData[i].malicious !== false) {
                    if (conData[i].malicious.length >= 3) MaliCnt++;
                    else WarnCnt++;
                }
            }
            setMaliciousCnt(MaliCnt);
            setWarningsCnt(WarnCnt);
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '8vw', width: '8vw', backgroundColor: isHover ? HoverBackColor : BackColor, margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={goDetail}
        >   
            <div style={{}}>
                <DesktopWindowsTwoToneIcon sx={{ fontSize: 90, color: isHover ? HoverTextColor : TextColor }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '16px'}}>{props.item.public_ip}</span>
                <span style={{color: isHover ? HoverTextColor : TextColor, fontFamily: 'Noto Sans KR', fontSize: '12px'}}>({props.item.private_ip})</span>
            </div>  
        </div>
    );
}

export default Card;