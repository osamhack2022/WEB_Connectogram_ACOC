import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import sx from "./TestKsPark.module.css";

export default function TestKspark() {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        axios.post("/api/testdata", {
            key: "198b6b314a05412512fcc4d2a2b10386e48850c6ea65c21e38ed32fb1a0d3f3a",
            org: "사이버작전대"
        }, { withCredentials: true }).then(res => {
            setTestData(res.data);
            console.log(res.data);
        });
    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>idx</th>
                        <th>grade</th>
                        <th>name</th>
                        <th>org</th>
                        <th>position</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testData.map((item, idx) => {
                            return (
                                <tr>
                                    <td>{item.idx}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.name}</td>
                                    <td>{item.org}</td>
                                    <td>{item.grade}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
        </table>
        </>
    );
}