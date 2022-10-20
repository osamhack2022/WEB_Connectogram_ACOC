import React, { useCallback, useEffect, useRef, useState } from "react";
import ApexCharts from 'react-apexcharts';
import axios from "axios";
import dayjs from "dayjs";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import cola from 'cytoscape-cola';


//Cytoscape.use(COSEBilkent);
Cytoscape.use(cola);

const Dashboard = () => {
    const cy = useRef(null);

    const setCytoscape = useCallback((ref) => {
            cy.current = ref;
        }, [cy], );

    const NowElements = useRef([]);
    const FirstFlag = useRef(true);

    const [StandardTime, setStandardTime] = useState("");

    // 새로고침 주기 (초)
    const interval = 16;
    const [NowTime, setNowTime] = useState(new Date().getTime() + interval * 1000);
    const [TimeLeft, setTimeLeft] = useState(interval);

    const setConnection = async () => {
        await axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/connection-data", {
            params: { ip: "39.113.61.32", lastest: '1' }
        }, { withCredentials: true }).then((res) => {
            if ("err_msg" in res.data) {
                console.log("데이터 가져오기 오류");
                return null;
            }
    
            const ConnectionData = res.data[0];
            console.log(ConnectionData);
            
            // 만약 현재 데이터에 클라이언트 노드가 없다면, 클라이언트 노드 추가
            if (!(NowElements.current.includes(ConnectionData.public_ip))) {
                cy.current.add({
                    group: 'nodes', 
                    data: { id: ConnectionData.public_ip, label: 'CLIENT' }, 
                    grabbable: false, 
                    style: { } 
                });
                NowElements.current.push(ConnectionData.public_ip);
            }
            console.log(NowElements.current);

            // 이전 데이터에서 없어진 연결들 확인하기.
            let NewElements = [];
            for (let i = 0; i < NowElements.current.length; i++) {
                if (NowElements.current[i] === ConnectionData.public_ip) {
                    NewElements.push(ConnectionData.public_ip);
                    continue;
                }
                let flag = 1;
                for (let j = 0; j < ConnectionData.connection.length; j++) {
                    if (NowElements.current[i] === ConnectionData.connection[j].foreign) flag = 0;
                }
                if (flag) cy.current.elements('node[id = "' + NowElements.current[i] + '"]').remove();
                else NewElements.push(NowElements.current[i]);
            }
            NowElements.current = NewElements;
            //console.log("NEW", NowElements.current);
            
            // 이전 데이터에서 연결되지 않은 노드 연결하기.
            for (let i = 0; i < ConnectionData.connection.length; i++) {
                if (!(NowElements.current.includes(ConnectionData.connection[i].foreign))) {
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
                    NowElements.current.push(ConnectionData.connection[i].foreign);
                }
            }

            if (FirstFlag.current) {
                cy.current.layout({ name: 'cola', fit: true }).run();
                FirstFlag.current = false;
            } else cy.current.layout({ name: 'cola', fit: false }).run();

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

            // 연결된 노드들에 대해 유해성 검사.
            for (let i = 0; i < NowElements.current.length; i++) {
                if (NowElements.current[i] === ConnectionData.public_ip) continue;
                const foreignIP = NowElements.current[i].split(':')[0];
                axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/blocklistip", {
                    params: { ip: foreignIP }
                }, { withCredentials: true }).then((res) => {
                    console.log(res);
                    if ("err_msg" in res.data) return;
                    if (res.data.result === false) return;
                    // 악성 노드 색 바꾸기.
                    cy.current.elements('node[id = "' + NowElements.current[i] + '"]').style({ 'background-color': 'yellow'});
                });
            }
        });

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
        setConnection();
    }, []);

    useEffect(() => {
        if (TimeLeft < 0) {    
            setConnection();
            setTimer();
        }
    }, [TimeLeft]);

    const treemap_data = [{
        data: [
            { x: 'New Delhi', y: 218, fillColor: '#f77057' },
            { x: 'Mumbai', y: 184, fillColor: '#f79c4c' },
            { x: 'Kolkata', y: 149 },
            { x: 'Bangaluru', y: 84 },
            { x: 'Chennai', y: 70 },
            { x: 'Hyderabad', y: 68 },
            { x: 'Ahmedabad', y: 55 },
            { x: 'Surat', y: 44 },
            { x: 'Pune', y: 31 },
            { x: 'Jaipur', y: 30 },
        ]
    }]
    
    const treemap_options = {
        colors: ['#f77057'],
        legend: {
            show: false
        },
        chart: {
            type: 'treemap',
            toolbar: {
                show: false,
            },

        },
        title: {
            text: undefined,
            align: 'left',
            style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238',
            },
        }
    }

    return (
        <div style={{ position:'relative', backgroundColor: '#ffffff', height: '87vh' }}>
            <div style={{ position: 'absolute', top: '5%', left: '2%', zIndex: 1 }}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '18vw', height: '16vh', backgroundColor: 'rgb(182, 88, 255)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Connections</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>{NowElements.current.length - 1}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '18vw', height: '16vh', backgroundColor: 'rgb(255, 92, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Malicious</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>21</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '18vw', height: '16vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>151</span>
                </div>
            </div>
            <div style={{position: 'absolute', bottom: '2%', left: '2%', zIndex: 1, height: '25vh', width: '42vw', margin: '8px', backgroundColor: 'transparent'}}>
                <div style={{fontSize: '15px', fontFamily: 'Noto Sans KR', color: '#ffffff', height: '4vh', marginBottom: '-20px', backgroundColor: '#760000', marginRight: '20px', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>
                    접속량 상위
                </div>
                <ApexCharts style={{ width: '100%'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{position: 'absolute', bottom: '2%', right: '2%', zIndex: 1, height: '25vh', width: '42vw', margin: '8px', backgroundColor: 'transparent'}}>
                <div style={{fontSize: '15px', fontFamily: 'Noto Sans KR', color: '#ffffff', height: '4vh', marginBottom: '-20px', backgroundColor: '#760000', marginRight: '20px', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>
                    잦은 악성 행위 탐지
                </div>
                <ApexCharts style={{ width: '100%'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{position: 'absolute', top: '5%', right: '5%', textAlign: 'end'}}>
                <div>{StandardTime} 기준</div>
                <div>{dayjs(TimeLeft).format("ss")}초 후 새로고침</div>
            </div>
            <div style={{backgroundColor: 'white', border: '1px solid', borderRadius: '6px', position: 'absolute', top: '35%', right: '5%', width: '220px', zIndex: 1 }}>
                검색 필터
                <input placeholder="IP" />
            </div>
            <div style={{height: '100%', zIndex: 1, backgroundColor: '#ffffff' }}>
                <CytoscapeComponent
                    elements={[]}
                    cy={setCytoscape}
                    layout={{
                        name: "cola", fit: true
                    }} 
                    style={ { width: '100%', height: '100%' } }
                    stylesheet={[
                        {
                            selector: "node[label = 'CLIENT']",
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
                            selector: "node[label != 'CLIENT']",
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
            </div>
        </div>
    );
}

export default Dashboard;