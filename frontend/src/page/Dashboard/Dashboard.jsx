import React, { useCallback, useEffect, useRef, useState } from "react";
import ApexCharts from 'react-apexcharts';
import axios from "axios";
import dayjs from "dayjs";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import cola from 'cytoscape-cola';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


//Cytoscape.use(COSEBilkent);
Cytoscape.use(cola);

const Dashboard = ( props ) => {
    const cy = useRef(null);

    const PORTDATA = {
        "443": "HTTPS",
        "80": "HTTP",
    }

    const [ConnectionsCnt, setConnectionsCnt] = useState(0);
    const [MaliciousCnt, setMaliciousCnt] = useState(0);
    const [WarningsCnt, setWarningsCnt] = useState(0);

    const setCytoscape = useCallback((ref) => {
            cy.current = ref;
        }, [cy], );

    const [StandardTime, setStandardTime] = useState("");

    // 새로고침 주기 (초)
    const interval = 17;
    const [NowTime, setNowTime] = useState(new Date().getTime() + interval * 1000);
    const [TimeLeft, setTimeLeft] = useState(interval);

    const setConnection = () => {
        const ConnectionData = props.LowData[0];
        console.log("CLIENTDATA", ConnectionData);
            
        // 클라이언트 노드 추가
        cy.current.add({
            group: 'nodes', 
            data: { id: ConnectionData.public_ip, label: ConnectionData.public_ip + '\n(' + ConnectionData.private_ip + ')', type: 'CLIENT' }, 
            grabbable: false, 
            style: { } 
        });
       
        // 연결되지 않은 노드 연결하기.
        let Nodes = [];
        let MaliciousCnt = 0;
        let WarningsCnt = 0;
        for (let i = 0; i < ConnectionData.connection.length; i++) {
            // 악성 노드 개수 세기.
            if (ConnectionData.connection[i].malicious !== false) {
                if (ConnectionData.connection[i].malicious.length >= 3) MaliciousCnt++;
                else WarningsCnt++;
            }
            if (!(Nodes.includes(ConnectionData.connection[i].foreign))) {
                cy.current.add({ 
                    group: 'nodes', 
                    data: { id: ConnectionData.connection[i].foreign, label: ConnectionData.connection[i].foreign }, 
                    grabbable: false,
                    style: { } 
                });
                cy.current.add({ 
                    group: 'edges',
                    data: { source: ConnectionData.connection[i].foreign, target: ConnectionData.public_ip } 
                });
                Nodes.push(ConnectionData.connection[i].foreign);
                // 악성 노드 색 바꾸기.
                if (ConnectionData.connection[i].malicious !== false) {
                    if (ConnectionData.connection[i].malicious.length >= 3) {
                        cy.current.elements('node[id = "' + ConnectionData.connection[i].foreign + '"]').style({ 'background-color': 'red'});
                    }
                    else {
                        cy.current.elements('node[id = "' + ConnectionData.connection[i].foreign + '"]').style({ 'background-color': 'yellow'});
                    }
                }
            }
        }
        setMaliciousCnt(MaliciousCnt);
        setWarningsCnt(WarningsCnt);
        setConnectionsCnt(Nodes.length);

        cy.current.layout({ name: 'cola', fit: true }).run();

        // 엣지 애니메이션 설정.
        let loopAnimation = eles => {
            const ani = eles.animation(
                {
                    style: {
                    "line-dash-offset": 24,
                    "line-dash-pattern": [8, 4],
                    }
                },
                {
                    duration: 1000
                }
            );
            
            ani.reverse().play().promise('complete').then(() => loopAnimation(eles));
        };
        cy.current.edges().forEach(loopAnimation);

        // 업데이트 시간 설정.
        setStandardTime(ConnectionData.time);
    }

    useEffect(() => {
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
        console.log("LowData", props.LowData);
        setConnection();
    }, []);

    useEffect(() => {
        if (TimeLeft < 0) {
            setTimer();
        }
    }, [TimeLeft]);

    return (
        <div style={{backgroundColor: 'transparent', height: '88vh' , display: 'flex', flexDirection: 'row' }}>
            <div style={{width : '50vw', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%', height: '16vh', backgroundColor: 'rgb(255, 92, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Malicious</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{MaliciousCnt}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%', height: '16vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{WarningsCnt}</span>
                    </div>
                </div>
                <div style={{ width: '98%', height: '78%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{backgroundColor: 'black', height: '56px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                        <span style={{paddingLeft: '16px', fontSize: 18}}>로그</span>
                    </div>
                    <div style={{backgroundColor: 'black', height: '32px', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Noto Sans KR', justifyContent: 'center'}}>
                        <div style={{width: '25%', textAlign: 'center', fontSize: '9px'}}>출발지 IP</div>
                        <div style={{width: '10%', textAlign: 'center', fontSize: '9px'}}>출발지 PORT</div>
                        <div style={{width: '25%', textAlign: 'center', fontSize: '9px'}}>목적지 IP</div>
                        <div style={{width: '10%', textAlign: 'center', fontSize: '9px'}}>목적지 PORT</div>
                        <div style={{width: '10%', textAlign: 'center', fontSize: '9px'}}>프로토콜</div>
                        <div style={{width: '18%', textAlign: 'center', fontSize: '9px'}}>프로세스</div>
                    </div>
                    <div style={{ height: '100%', border: '1px solid black', overflow: 'auto' }}>
                        <div style={{display: 'grid', gridTemplateRows: "1fr", gridTemplateColumns: "1fr", gridAutoRows: '32px', gridAutoFlow: 'row' }}>
                            {props.LowData[0].connection.map((item, i) => (
                                <div key={i} style={{ backgroundColor: item.malicious === false ? 'green' : (item.malicious.length >= 3 ? 'rgb(255, 92, 82)' : 'rgb(255, 171, 46)'), height: '32px', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Noto Sans KR', justifyContent: 'center'}}>
                                    <div style={{width: '25%', textAlign: 'center', fontSize: '12px'}}>{item.local.split(":")[0]}</div>
                                    <div style={{width: '10%', textAlign: 'center', fontSize: '12px'}}>{item.local.split(":")[1]}</div>
                                    <div style={{width: '25%', textAlign: 'center', fontSize: '12px'}}>{item.foreign.split(":")[0]}</div>
                                    <div style={{width: '10%', textAlign: 'center', fontSize: '12px'}}>{item.foreign.split(":")[1]}</div>
                                    <div style={{width: '10%', textAlign: 'center', fontSize: '12px'}}>{item.foreign.split(":")[1] in PORTDATA ? PORTDATA[item.foreign.split(":")[1]] : "TCP"}</div>
                                    <div style={{width: '18%', textAlign: 'center', fontSize: '10px'}}>{item.pname}</div>
                                </div>
                            ))}
                        </div>
                    </div>    
                    <div style={{ backgroundColor: 'black', height: '32px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}></div>
                </div>
            </div>
            <div style={{ width: '50%', backgroundColor: 'transparent', padding: '32px' }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{ width: '50vw', backgroundColor: 'black', height: '48px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                        <span style={{paddingLeft: '16px', fontSize: 18}}>Connecto Map</span>
                    </div>
                    <CytoscapeComponent
                        elements={[]}
                        cy={setCytoscape}
                        layout={{
                            name: "cola"
                        }} 
                        style={ { height: '100%', border: '1px solid black' } }
                        stylesheet={[
                            {
                                selector: "node[type = 'CLIENT']",
                                style: {
                                height: 60,
                                width: 60,
                                label: "data(label)",
                                "text-valign": 'bottom',
                                "text-outline-color": 'gray',
                                "text-outline-width": 1,
                                "text-margin-y": 4,
                                "font-size": 12,
                                "font-family": 'Noto Sans KR',
                                "text-wrap": "wrap",
                                "text-max-width": 50,
                                shape: 'round-rectangle',
                                "background-color": 'red',
                                }
                            },
                            {
                                selector: "node[type != 'CLIENT']",
                                style: {
                                height: 30,
                                width: 30,
                                label: "data(label)",
                                "text-valign": 'bottom',
                                "text-margin-y": 4,
                                "font-size": 7,
                                "font-family": 'Noto Sans KR',
                                "text-wrap": "wrap",
                                "text-max-width": 50,
                                }
                            },
                            {
                                selector: "edge",
                                style: {
                                width: 1,
                                "line-color": 'gray',
                                "target-arrow-shape": "triangle",
                                "target-arrow-color": "#9dbaea",
                                "line-style": "dashed",
                                "line-dash-pattern": [8, 4],
                                }
                            }
                        ]}
                    />
                    <div style={{ color: 'white', fontFamily: 'Noto Sans KR', fontSize: '12px', backgroundColor: 'black', height: '32px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '24px'}}>
                        {StandardTime.split('.')[0]} 기준
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;