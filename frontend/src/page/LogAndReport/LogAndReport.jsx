import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveTreeMap } from '@nivo/treemap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveChoropleth } from '@nivo/geo';
import WorldCountires from './world_countries.json';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Bars } from 'react-loading-icons';


const LogAndReport = ( props ) => {
    // 새로고침 주기 (초)
    const interval = 2;
    const [NowTime, setNowTime] = useState(new Date().getTime() + interval * 1000);
    const [TimeLeft, setTimeLeft] = useState(interval);

    const [PieFlag, setPieFlag] = useState(0);
    const [CountryData, setCountryData] = useState([]);
    const CountryDataRef = useRef([]);

    const [ProtocolData, setProtocolData] = useState({children: []});
    const ProtocolDataRef = useRef({children: []});

    const [InternetAlert, setInternetAlert] = useState("");
    const [InternetAlertDate, setInternetAlertDate] = useState("");

    const [TodayKeywords, setTodayKeywords] = useState("로딩 중...");

    const [ThreatDate, setThreatDate] = useState("");
    const [Threat1Cnt, setThreat1Cnt] = useState(0);
    const [Threat1Status, setThreat1Status] = useState("상승");
    const [Threat2Cnt, setThreat2Cnt] = useState(0);
    const [Threat2Status, setThreat2Status] = useState("상승");
    const [Threat3Cnt, setThreat3Cnt] = useState(0);
    const [Threat3Status, setThreat3Status] = useState("상승");

    const [NewsData, setNewsData] = useState([]);

    const [IPsCnt, setIPsCnt] = useState([]);
    const [ProcessesCnt, setProcessesCnt] = useState([]);
    
    const [MaliciousCnt, setMaliciousCnt] = useState(0);
    const [WarningsCnt, setWarningsCnt] = useState(0);

    const [ChoroplethData, setChoroplethData] = useState([]);
    const [MaxGeoData, setMaxGeoData] = useState(0);

    const [MalIP, setMalIP] = useState(null);
    const [MalProcess, setMalProcess] = useState(null);

    const [ClientPercent, setClientPercent] = useState(100);

    const PORTDATA = {
        "80": "HTTP",
        "443": "HTTPS",
    }

    const getIPCountry = async ( IP ) => {
        await axios.get("https://ip2c.org/" + IP)
        .then((res) => {
            const CountryName = res.data.split(";")[2];
            CountryDataRef.current.push(CountryName);
        });
    };

    useEffect(() => {      
        let MaliciousCnt = 0;
        let WarningsCnt = 0;

        CountryDataRef.current = [];
        let MalIPTemp = [];
        let MalProcessTemp = [];
        let MalPercent = 100;
        for (let i = 0; i < props.LowData[0].connection.length; i++) {
            
            // 악성 노드 개수 세기.
            if (props.LowData[0].connection[i].malicious !== false) {
                if (props.LowData[0].connection[i].malicious.length >= 3) {
                    MaliciousCnt++;
                }
                else WarningsCnt++;
                MalPercent -= props.LowData[0].connection[i].malicious.length * 3;
                MalIPTemp.push(props.LowData[0].connection[i].foreign.split(":")[0]);
                if (!MalProcessTemp.includes(props.LowData[0].connection[i].pname)) MalProcessTemp.push(props.LowData[0].connection[i].pname);
            }
            if (MalPercent <= 0) setClientPercent(7);
            else setClientPercent(MalPercent);

            getIPCountry(props.LowData[0].connection[i].foreign.split(":")[0]);
            
            let PORT = props.LowData[0].connection[i].foreign.split(":")[1];
            let PROTOCOL = "";
            if (PORT in PORTDATA) PROTOCOL = PORTDATA[PORT];
            else PROTOCOL = "TCP";

            let flag = 0;
            for (let j = 0; j < ProtocolDataRef.current.children.length; j++) {
                if (ProtocolDataRef.current.children[j].name === PROTOCOL) {
                    ProtocolDataRef.current.children[j].loc++;
                    flag = 1;
                }
            }
            if (!flag) ProtocolDataRef.current.children.push({name: PROTOCOL, loc: 1});
        }
        setMalIP(MalIPTemp);
        setMalProcess(MalProcessTemp);

        setMaliciousCnt(MaliciousCnt);
        setWarningsCnt(WarningsCnt);

        setProtocolData(ProtocolDataRef.current);

        console.log("LOGANDREPORT", CountryDataRef.current);

        let IPsTemp = [];
        let ProcessesTemp = [];
        axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/connection-data", {
            params: { ip: props.LowData[0].public_ip, lastest: '50' }
        }, { withCredentials: true }).then((res) => {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                let ConData = res.data[i].connection;
                for (let j = 0; j < ConData.length; j++) {
                    let ForeignIP = ConData[j].foreign.split(":")[0];
                    let flag = 0;
                    let isBlock = 0;
                    if (ConData[j].malicious !== false) isBlock = 1;
                    for (let k = 0; k < IPsTemp.length; k++) {
                        if (IPsTemp[k].IP === ForeignIP) {
                            flag = 1;
                            if (isBlock) IPsTemp[k].block++;
                            else IPsTemp[k].data++;
                            break;
                        }
                    }
                    if (!flag) {
                        if (isBlock) IPsTemp.push({ IP: ForeignIP, data: 0, block: 1 });
                        else IPsTemp.push({ IP: ForeignIP, data: 1, block: 0 });
                    }

                    let ProcessName = ConData[j].pname;
                    flag = 0;
                    for (let k = 0; k < ProcessesTemp.length; k++) {
                        if (ProcessesTemp[k].Name === ProcessName) {
                            flag = 1;
                            if (isBlock) ProcessesTemp[k].block++;
                            else ProcessesTemp[k].data++;
                            break;
                        }
                    }
                    if (!flag) {
                        if (isBlock) ProcessesTemp.push({ Name: ProcessName, data: 0, block: 1 });
                        else ProcessesTemp.push({ Name: ProcessName, data: 1, block: 0 });
                    }
                }
            }
            IPsTemp = IPsTemp.sort((a, b) => {
                return a.data - b.data;
            })
            ProcessesTemp = ProcessesTemp.sort((a, b) => {
                return a.data - b.data;
            })
            setIPsCnt(IPsTemp);
            setProcessesCnt(ProcessesTemp);
        });

        axios.get(process.env.REACT_APP_BACK_API + "/api/kisa",
        { withCredentials: true }).then((res) => {
            if ("err_msg" in res.data) return;
            console.log(res.data);

            setInternetAlert(res.data.alertLevel.state);
            setInternetAlertDate(res.data.alertLevel.todayDate);

            let Keywords = "";
            for (let i = 0; i < res.data.keywordRanking.length; i++) {
                if (i == res.data.keywordRanking.length - 1) {
                    Keywords += res.data.keywordRanking[i].keyword.replace("<strong>", "").replace("</strong>", "");
                } else {
                    Keywords += res.data.keywordRanking[i].keyword.replace("<strong>", "").replace("</strong>", "") + ", ";
                }
            }
            setTodayKeywords(Keywords);

            setThreat1Cnt(res.data.cyberAttact[0].data);
            setThreat1Status(res.data.cyberAttact[0].updown);
            setThreat2Cnt(res.data.cyberAttact[1].data);
            setThreat2Status(res.data.cyberAttact[1].updown);
            setThreat3Cnt(res.data.cyberAttact[2].data);
            setThreat3Status(res.data.cyberAttact[2].updown);

            setNewsData(res.data.totalNews.splice(0, 5));
        });
    }, []);

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
        // 국가별 그래프 나타내기.
        if (CountryDataRef.current.length === props.LowData[0].connection.length && !PieFlag) {
            let Temp = [];
            let Chk = [];
            let Maxx = 0;
            for (let i = 0; i < CountryDataRef.current.length; i++) {
                if (Chk.includes(CountryDataRef.current[i]) === false) {
                    Chk.push(CountryDataRef.current[i]);
                    let Cnt = CountryDataRef.current.filter(element => CountryDataRef.current[i] === element).length;
                    if (Cnt > Maxx) Maxx = Cnt;
                    Temp.push({ id: CountryDataRef.current[i], value: Cnt });
                }
            }
            setChoroplethData(Temp);
            setMaxGeoData(Maxx);
            setPieFlag(1);
        }
        
        if (TimeLeft < 0) {
            setTimer();
        }
    }, [TimeLeft]);

    useEffect(() => {
        //console.log(ClientsData.current);
        let TimerId = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(TimerId);
        }
    });

    return (
        <div style={{backgroundColor: 'transparent', height: '88vh' , display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '5vh', width: '100%', backgroundColor: 'transparent', paddingLeft: 60, paddingTop: 4, fontFamily: 'Noto Sans KR', display: 'flex', alignItems: 'flex-end'}}>
                <span style={{ fontSize: 32}}>Client #1 위협 분석 보고서</span>
                <span style={{ paddingLeft: 16}}>{props.LowData[0].time.split('.')[0]} 기준</span>
                </div>
            {PieFlag ? 
            <div style={{ display: 'flex', flexDirection: 'row', paddingRight: 60}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(0, 140, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Connections</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{props.LowData[0].connection.length}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 92, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Malicious</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{MaliciousCnt}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{WarningsCnt}</span>
                    </div>
                </div>
                <div style={{width: '50%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{ width: '100%'}}>
                        <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>국가별 위험</div>
                        <div style={{ height: '30vh', backgroundColor: 'transparent', border: '1px solid black', position: 'relative'}}>
                            { !PieFlag ? <div style={{fontFamily: 'Noto Sans KR', fontSize: 18, position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)'}}>로딩 중...</div> : 
                            <ResponsiveChoropleth
                                data={ChoroplethData}
                                features={WorldCountires.features}
                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                colors="nivo"
                                domain={[ 0, MaxGeoData ]}
                                unknownColor="#666666"
                                label="properties.name"
                                valueFormat="0.0s"
                                projectionScale={100}
                                projectionTranslation={[ 0.47, 0.7 ]}
                                projectionRotation={[ 200, 0, 0 ]}
                                graticuleLineColor="#dddddd"
                                borderWidth={0.5}
                                borderColor="#152538"
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: -25,
                                        translateY: -30,
                                        itemsSpacing: 0,
                                        itemWidth: 94,
                                        itemHeight: 18,
                                        itemDirection: 'left-to-right',
                                        itemTextColor: '#444444',
                                        itemOpacity: 0.85,
                                        symbolSize: 18,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemTextColor: '#000000',
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            /> }
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '44vh', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%'}}>
                            <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>IP별 연결 현황</div>
                            <div style={{height: '40vh', border: '0.25px solid black', borderRightWidth: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <ResponsiveBar
                                    data={IPsCnt}
                                    indexBy="IP"
                                    keys={['data', 'block']}
                                    margin={{ top: 5, right: 50, bottom: 5, left: 100 }}
                                    layout="horizontal"
                                    axisLeft={{
                                        tickSize: 0,
                                        tickPadding: 10,
                                        tickRotation: 0,
                                        legendPosition: 'left',
                                    }}
                                    axisBottom={null}
                                    enableLabel={false}
                                />
                            </div>
                        </div>
                        <div style={{width: '50%'}}>
                            <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>프로세스별 연결 현황</div>
                            <div style={{height: '40vh', border: '0.5px solid black', borderRightWidth: '0px'}}>
                                <ResponsiveBar
                                    data={ProcessesCnt}
                                    indexBy="Name"
                                    keys={['data', 'block']}
                                    margin={{ top: 5, right: 50, bottom: 5, left: 170 }}
                                    layout="horizontal"
                                    axisLeft={{
                                        tickSize: 0,
                                        tickPadding: 30,
                                        tickRotation: 0,
                                        legendPosition: 'left',
                                    }}
                                    axisBottom={null}
                                    enableLabel={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '25vw', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{ width: '100%',  height: '34vh', border: '1px solid black', justifyContent: 'center', position: 'relative'}}>
                        <div style={{height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>프로토콜별 연결 현황</div>
                        <div style={{height: '30vh'}}>
                            <ResponsiveTreeMap
                                data={ProtocolData}
                                identity="name"
                                value="loc"
                                tile="binary"
                                label="id"
                                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                labelSkipSize={12}
                                parentLabelSize={0}
                                labelTextColor={{
                                    from: 'color',
                                    modifiers: [
                                        [
                                            'darker',
                                            1.2
                                        ]
                                    ]
                                }}
                                orientLabel={false}
                                parentLabelTextColor={{
                                    from: 'color',
                                    modifiers: [
                                        [
                                            'darker',
                                            2
                                        ]
                                    ]
                                }}
                                colors={{ scheme: 'nivo' }}
                                borderColor={{
                                    from: 'color',
                                    modifiers: [
                                        [
                                            'darker',
                                            0.1
                                        ]
                                    ]
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '44vh'}}>
                        <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>현재 클라이언트의 위험도</div>
                        <div style={{ height: '40vh', backgroundColor: 'transparent', border: '1px solid black' }}>
                            
                            <div style={{position: 'relative', zIndex: 1}}>
                                <div style={{height: '25vh', paddingTop: '12px'}}>
                                <ResponsiveRadialBar
                                    data={[{id: 'percent', data: [{x:'x', y: 100, color: '#ffffffff'}]}, {id: 'value', data: [{x:'x', y: ClientPercent, color: ClientPercent > 75 ? 'rgb(0, 140, 82)' : ClientPercent > 50 ? 'yellow' : 'red'}]}]}
                                    startAngle={-90}
                                    endAngle={90}
                                    padding={0.1}
                                    radialAxisStart={null}
                                    circularAxisOuter={null}
                                    enableRadialGrid={false}
                                    enableCircularGrid={false}
                                    cornerRadius={2}
                                    isInteractive={false}
                                    colors={(dat) => dat.data.color}
                                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                />
                            </div>
                            <div style={{fontFamily: 'Noto Sans KR', marginTop: '-160px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',  zIndex: 2}}>
                                <div style={{ fontSize: '32px'}}>{ClientPercent}<span style={{fontSize: '24px'}}>%</span></div>
                                <div style={{ marginTop: '8px'}}>현재 클라이언트의 상태는 <span style={{fontSize: '22px', color: ClientPercent > 75 ? "green" : ClientPercent > 50 ? "yellow" : "red"}}>{ClientPercent > 75 ? "양호" : ClientPercent > 50 ? "주의" : "취약"}</span> 입니다.</div>
                                <div style={{ marginTop: '8px'}}>Client #1 분석 결과 유해하다고 생각되는 연결 {MaliciousCnt}건, <br /> 의심해봐야할 연결 {WarningsCnt}건이 발견되었습니다.</div>
                                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    {MalIP === null ? null : <div>주의해야 할 IP : {MalIP.length === 0 ? '없음' : MalIP[0]}{MalIP.length >= 1 && ' 등 ' + MalIP.length + '건'}</div>}
                                    {MalProcess === null ? null : <div>주의해야 할 프로세스 : {MalProcess.length === 0 ? '없음' : MalProcess[0]}{MalProcess.length > 1 && ' 등 ' + MalProcess.length + '건'}</div>}
                                </div>
                                <div style={{ width: '80%', height: '24px', display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                                    <div style={{backgroundColor: 'red', width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>취약</div>
                                    <div style={{backgroundColor: 'yellow', width: '25%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black'}}>주의</div>
                                    <div style={{backgroundColor: 'green', width: '25%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>양호</div>
                                </div>
                                <div style={{ width: '80%', position: 'relative'}}>
                                    <div style={{position: 'absolute', left: '0%', transform: 'translateX(-50%)'}}>0%</div>
                                    <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>50%</div>
                                    <div style={{position: 'absolute', left: '75%', transform: 'translateX(-50%)'}}>75%</div>
                                    <div style={{position: 'absolute', left: '100%', transform: 'translateX(-50%)'}}>100%</div>
                                </div>
                            </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingBottom: '60px'}}><Bars fill="#000000" height='3rem' /><span style={{ marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>보고서 생성 중...</span></div> }
        </div>
    );
}

export default LogAndReport;