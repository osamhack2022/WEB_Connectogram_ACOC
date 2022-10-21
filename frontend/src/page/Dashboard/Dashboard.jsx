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

const Dashboard = () => {
    const cy = useRef(null);

    const { state } = useLocation();
    const { LowData } = state;

    const [ConnectionsCnt, setConnectionsCnt] = useState(0);

    const setCytoscape = useCallback((ref) => {
            cy.current = ref;
        }, [cy], );

    const [StandardTime, setStandardTime] = useState("");

    // 새로고침 주기 (초)
    const interval = 17;
    const [NowTime, setNowTime] = useState(new Date().getTime() + interval * 1000);
    const [TimeLeft, setTimeLeft] = useState(interval);

    const setConnection = () => {
        const ConnectionData = LowData[0];
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
        for (let i = 0; i < ConnectionData.connection.length; i++) {
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
            }
        }
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
        console.log("LowData", LowData);
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
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>21</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%', height: '16vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                        <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>151</span>
                    </div>
                </div>
                <div style={{ width: '98%', height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{backgroundColor: 'black', height: '48px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Noto Sans KR'}}>
                        <span style={{paddingLeft: '16px', fontSize: 18}}>로그</span>
                    </div>
                    <div style={{ height: '510px', border: '1px solid black', overflow: 'auto' }}>
                        <div style={{display: 'grid', gridTemplateRows: "1fr", gridTemplateColumns: "1fr", gridAutoRows: '30px', gridAutoFlow: 'row' }}>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '48px', backgroundColor: 'yellow'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
                            <div style={{ height: '16px'}}>list</div>
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
                    <div style={{ backgroundColor: 'black', height: '32px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;