import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveTreeMap } from '@nivo/treemap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


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

    const PORTDATA = {
        "80": "HTTP",
        "443": "HTTPS",
    }

    const getIPCountry = async ( IP ) => {
        await axios.get("https://ip2c.org/" + IP)
        .then((res) => {
            const CountryName = res.data.split(";")[3];
            CountryDataRef.current.push(CountryName);
        });
    };

    useEffect(() => {
        CountryDataRef.current = [];
        for (let i = 0; i < props.LowData[0].connection.length; i++) {
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
        setProtocolData(ProtocolDataRef.current);

        console.log("LOGANDREPORT", CountryDataRef.current);

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
            for (let i = 0; i < CountryDataRef.current.length; i++) {
                if (Chk.includes(CountryDataRef.current[i]) === false) {
                    Chk.push(CountryDataRef.current[i]);
                    let Cnt = CountryDataRef.current.filter(element => CountryDataRef.current[i] === element).length;
                    Temp.push({ id: CountryDataRef.current[i], value: Cnt });
                }
            }
            setCountryData(Temp);
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
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(0, 140, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Connections</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{props.LowData[0].connection.length}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 92, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Malicious</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>0</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>0</span>
                    </div>
                </div>
                <div style={{width: '50%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{ width: '100%'}}>
                        <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>프로토콜별 연결 수</div>
                        <div style={{ height: '20vh', backgroundColor: 'transparent', border: '1px solid black'}}>
                            <ResponsiveTreeMap
                                data={ProtocolData}
                                identity="name"
                                value="loc"
                                valueFormat=" >-.2s"
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
                    <div style={{ width: '100%', height: '54vh', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%'}}>
                            <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>IP별 연결 수</div>
                            <div style={{height: '50vh', backgroundColor: 'blue', border: '0.5px solid black'}}>

                            </div>
                        </div>
                        <div style={{width: '50%'}}>
                            <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>프로세스별 연결 수</div>
                            <div style={{height: '50vh', backgroundColor: 'yellow', border: '0.5px solid black'}}>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingRight: '32px', paddingLeft: '32px', width: '25%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{ width: '25vw', height: '29vh', border: '1px solid black', justifyContent: 'center', position: 'relative'}}>
                        <div style={{ height: '32px', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>국가별 연결 수</div>
                        { !PieFlag ? <div style={{fontFamily: 'Noto Sans KR', fontSize: 18, position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)'}}>로딩 중...</div> : <ResponsivePie
                            data={CountryData}   
                            margin={{ top: 20, right: 15, bottom: 50, left: 15 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        0.2
                                    ]
                                ]
                            }}
                            arcLabel="id"
                            enableArcLinkLabels={false}
                        /> }
                    </div>
                    <div style={{ width: '25vw', height: '49vh'}}>
                        <div style={{ height: '4vh', backgroundColor: 'black', color: 'white', fontFamily: 'Noto Sans KR', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>주요 대외기관 동향</div>
                        <div style={{ height: '45vh', backgroundColor: 'transparent', border: '1px solid black' }}>
                            <div style={{height: '20vh', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
                                <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
                                        <div style={{width: '60%', height: '4vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                            <span style={{ fontFamily: 'Noto Sans KR', fontSize: '12px'}}>인터넷침해사고 경보단계</span>
                                            <span style={{ fontFamily: 'Noto Sans KR', fontSize: '12px'}}>{InternetAlertDate} 기준</span>
                                        </div>
                                        <div style={{width: 0, height: 0, border: '10px solid transparent', borderRight: InternetAlert == '주의' ? '10px solid rgb(255, 171, 46)' : InternetAlert == "정상" || InternetAlert == "관심" ? '10px solid rgb(0, 140, 82)' : '10px solid rgb(255, 92, 82)'  }}></div>
                                        <div style={{ width: '20%', height: '4vh', backgroundColor: InternetAlert == '주의' ? 'rgb(255, 171, 46)' : InternetAlert == "정상" || InternetAlert == "관심" ? 'rgb(0, 140, 82)' : 'rgb(255, 92, 82)', textAlign: 'center', lineHeight: '4vh', fontFamily: 'Noto Sans KR'}}>{InternetAlert}</div>
                                    </div>
                                    <div style={{ width: '100%', height: '11vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "Noto Sans KR", borderTop: '1px solid black', paddingTop: '12px'}}>
                                        <div style={{ width: '85%', justifyContent: 'center', textDecoration: 'underline'}}>오늘의 주요 키워드</div>
                                        <div style={{ fontSize: '11px', width: '85%', height: '9.8vh', overflow: 'hidden', wordWrap: 'break-word', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                                            {TodayKeywords}    
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '50%', height: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid black'}}>
                                    <div style={{ width: '100%', textAlign: 'start', paddingBottom: '16px', paddingLeft: '16px', fontFamily: 'Noto Sans KR'}}>
                                        <span style={{textDecoration: 'underline'}}>오늘의 사이버 위협</span> <span style={{fontSize: '8px'}}>(2022.10.24)</span></div>
                                    <div style={{width: '93%'}}>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                                            <div style={{ width: '74%', backgroundColor: '#ffff2222', textAlign: 'center', fontSize: '14px', padding: '6px'}}>악성코드 발견 홈페이지</div>
                                            <div style={{ width: '26%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', fontSize: '12px', padding: '6px', alignItems: 'center', justifyContent: 'center'}}>
                                                <div>50(개)</div>
                                                <ArrowDropUpIcon sx={{color: 'red'}} fontSize="small" />
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                                            <div style={{ width: '74%', backgroundColor: '#ffff2222', textAlign: 'center', fontSize: '14px', padding: '6px'}}>신종 스미싱 악성 앱</div>
                                            <div style={{ width: '26%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', fontSize: '12px', padding: '6px', alignItems: 'center', justifyContent: 'center'}}>
                                                <div>50(개)</div>
                                                <ArrowDropUpIcon sx={{color: 'red'}} fontSize="small" />
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                                            <div style={{ width: '74%', backgroundColor: '#ffff2222', textAlign: 'center', fontSize: '14px', padding: '6px'}}>피싱ㆍ파밍 차단 사이트</div>
                                            <div style={{ width: '26%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', fontSize: '12px', padding: '6px', alignItems: 'center', justifyContent: 'center'}}>
                                                <div>50(개)</div>
                                                <ArrowDropUpIcon sx={{color: 'red'}} fontSize="small" />
                                            </div>
                                        </div> 
                                    </div>                              
                                </div>
                            </div>
                            <div style={{width: '100%', height: '25vh', borderTop: '1px solid black', fontFamily: 'Noto Sans KR'}}>
                                <div style={{textDecoration: 'underline', marginTop: '12px', marginLeft: '12px'}}>최신 자료</div>
                                <div style={{width: '100%', height: '4vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '12px', paddingRight: '32px'}}>
                                        카카오 서비스 장애 이슈를 악용한 사이버 공격에 대한 주의 권고
                                    </div>
                                    <div style={{width: '25%', fontSize: '12px', textAlign: 'center'}}>2022.10.21</div>
                                </div>
                                <div style={{width: '100%', height: '4vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '12px', paddingRight: '32px'}}>
                                        카카오 서비스 장애 이슈를 악용한 사이버 공격에 대한 주의 권고
                                    </div>
                                    <div style={{width: '25%', fontSize: '12px', textAlign: 'center'}}>2022.10.21</div>
                                </div>
                                <div style={{width: '100%', height: '4vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '12px', paddingRight: '32px'}}>
                                        카카오 서비스 장애 이슈를 악용한 사이버 공격에 대한 주의 권고
                                    </div>
                                    <div style={{width: '25%', fontSize: '12px', textAlign: 'center'}}>2022.10.21</div>
                                </div>
                                <div style={{width: '100%', height: '4vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '12px', paddingRight: '32px'}}>
                                        카카오 서비스 장애 이슈를 악용한 사이버 공격에 대한 주의 권고
                                    </div>
                                    <div style={{width: '25%', fontSize: '12px', textAlign: 'center'}}>2022.10.21</div>
                                </div>
                                <div style={{width: '100%', height: '4vh', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <div style={{width: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '12px', paddingRight: '32px'}}>
                                        카카오 서비스 장애 이슈를 악용한 사이버 공격에 대한 주의 권고
                                    </div>
                                    <div style={{width: '25%', fontSize: '12px', textAlign: 'center'}}>2022.10.21</div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogAndReport;