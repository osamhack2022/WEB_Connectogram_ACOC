import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function TestKspark() {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        let getData = async () => {
            return await axios.post("http://144.24.89.242:8810/api/testdata", {
                key: "198b6b314a05412512fcc4d2a2b10386e48850c6ea65c21e38ed32fb1a0d3f3a",
                org: "사이버작전대"
            }, { withCredentials: true });
        }

        setTestData(getData);
    }, [])

    return (
        <>
            {
                testData.length > 0 && testData.map((item, idx) => {
                    <div>
                        {item}
                    </div>

                })
            }
        </>
    );
}