import React from "react";
import Graph from "react-graph-vis";
import ApexCharts from 'react-apexcharts';

const Dashboard = () => {
    const graph = {
        nodes: [
            { id: 1, label: "Node 1", title: "node 1 tootip text" },
            { id: 2, label: "Node 2", title: "node 2 tootip text" },
            { id: 3, label: "Node 3", title: "node 3 tootip text" },
            { id: 4, label: "Node 4", title: "node 4 tootip text" },
            { id: 5, label: "Node 5", title: "node 5 tootip text" }
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
        ]
    };

    const options = {
        layout: {
          hierarchical: true,
        },
        edges: {
          color: "#000000"
        },
    };
    
    const events = {
        select: function(event) {
          var { nodes, edges } = event;
        }
    };

    const treemap_data = [{
        data: [
            { x: 'New Delhi', y: 218 },
            { x: 'Kolkata', y: 149 },
            {
                x: 'Mumbai',
                y: 184
            },
            {
                x: 'Ahmedabad',
                y: 55
            },
            {
                x: 'Bangaluru',
                y: 84
            },
            {
                x: 'Pune',
                y: 31
            },
            {
                x: 'Chennai',
                y: 70
            },
            {
                x: 'Jaipur',
                y: 30
            },
            {
                x: 'Surat',
                y: 44
            },
            {
                x: 'Hyderabad',
                y: 68
            },
            {
                x: 'Lucknow',
                y: 28
            },
            {
                x: 'Indore',
                y: 19
            },
            {
                x: 'Kanpur',
                y: 29
            }
        ]
    }]
    

    const treemap_options = {
        legend: {
            show: false
        },
        chart: {
            height: 350,
            type: 'treemap'
        },
        title: {
            text: 'Basic Treemap'
        }
    }

    return (
        <div style={{ position:'relative', backgroundColor: '#fffff2', height: '87vh' }}>
            <div style={{ position: 'absolute', top: '5%', left: '5%', zIndex: 1 }}>
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
            <div style={{position: 'absolute', bottom: '5%', left: '5%', zIndex: 1, height: '25vh'}}>
                <ApexCharts style={{ width: '42vw'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{position: 'absolute', bottom: '5%', right: '5%', zIndex: 1, height: '25vh'}}>
                <ApexCharts style={{ width: '42vw'}} options={treemap_options} series={treemap_data} type="treemap" height={'100%'} />
            </div>
            <div style={{backgroundColor: 'white', border: '1px solid', borderRadius: '6px', position: 'absolute', top: '5%', right: '5%', width: '220px', zIndex: 1 }}>
                검색 필터
                <input></input>
            </div>
            <div style={{height: '80%', }}>
                <Graph
                    graph={graph}
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