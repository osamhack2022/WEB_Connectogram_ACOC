import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import ApexCharts from 'react-apexcharts';
import axios from "axios";

const Dashboard = () => {
    const [GraphData, setGraphData] = useState({ nodes: [], edges: [], });

    const AddNode = ( id, label ) => {
        const temp = { ...GraphData };
        temp.nodes.push({ id: id, label: label });
        setGraphData(temp);
    };

    const RemoveNode = ( id ) => {
        const temp = { ...GraphData };
        const idx = temp.nodes.findIndex((item) => {return item.id === id});
        if (idx > -1) temp.nodes.splice(idx, 1);
        setGraphData(temp);
    };

    const AddEdge = ( from, to ) => {
        const temp = { ...GraphData };
        temp.edges.push({ from: from, to: to });
        setGraphData(temp);
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_API + "/api/analyze/viewPacketData", {
            params: {}
        }, { withCredentials: true }).then(res => {
            if ("err_msg" in res.data) {
                console.log('Error');
                return;
            }
            let Connection = new Set();

            res.data.forEach((el, i) => {
                if (el.source > el.destination) Connection.add(el.destination + "-" + el.source);
                else Connection.add(el.source + "-" + el.destination);
            })

            console.log(Connection);
        });

        AddNode(1, 'root');
        AddNode(2, 'root2');
        AddNode(3, 'root3');
        AddEdge(1, 3);
        AddNode(4, 'root4');
        RemoveNode(3);
        AddNode(3, 'root4');
    }, []);

    const graph = {
        nodes: [
            { id: 1, label: "Root", title: "클라이언트" },
            { id: 2, label: "Node 2", title: "node 2 tootip text" },
            { id: 3, label: "Node 3", title: "node 3 tootip text" },
            { id: 4, label: "Node 4", title: "node 4 tootip text" },
            { id: 5, label: "Node 5", title: "node 5 tootip text" }
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 }
        ]
    };

    const options = {
        layout: {
          hierarchical: false,
        },
        nodes: {
            shape: 'circle',
            font: {
                face: 'Noto Sans KR',
            }
        },
        edges: {
          color: "#000000",
          arrows: {
            to:     {enabled: false},
            middle: {enabled: false},
            from:   {enabled: false}
          },
        },
    };
    
    const events = {
        select: function(event) {
          var { nodes, edges } = event;
        }
    };

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
        <div style={{ position:'relative', backgroundColor: '#fffff2', height: '85vh' }}>
            <div style={{ position: 'absolute', top: '5%', left: '2%', zIndex: 1 }}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '18vw', height: '16vh', backgroundColor: 'rgb(182, 88, 255)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Assets</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>99,999</span>
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
                <div style={{fontSize: '15px', fontFamily: 'Noto Sans KR', color: '#ffffff', height: '4vh', marginBottom: '-20px', backgroundColor: '#760000', marginRight: '20px', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>접속량 상위</div>
                <ApexCharts style={{ width: '100%'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{position: 'absolute', bottom: '2%', right: '2%', zIndex: 1, height: '25vh', width: '42vw', margin: '8px', backgroundColor: 'transparent'}}>
                <div style={{fontSize: '15px', fontFamily: 'Noto Sans KR', color: '#ffffff', height: '4vh', marginBottom: '-20px', backgroundColor: '#760000', marginRight: '20px', paddingLeft: '8px', display: 'flex', alignItems: 'center'}}>잦은 악성 행위 탐지</div>
                <ApexCharts style={{width: '100%'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{backgroundColor: 'white', border: '1px solid', borderRadius: '6px', position: 'absolute', top: '5%', right: '5%', width: '220px', zIndex: 1 }}>
                검색 필터
                <input placeholder="IP" />
            </div>
            <div style={{height: '80%', zIndex: 1, }}>
                <Graph
                    graph={GraphData}
                    options={options}
                    events={events}
                    getNetwork={network => {
                        //  if you want access to vis.js network api you can set the state in a parent component using this property
                    }}
                />
            </div>
            <div style={{height: '20%', }}>
                test
            </div>
        </div>
    );
}

export default Dashboard;