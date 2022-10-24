chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
    console.log(req)
    let apiKey = "198b6b314a05412512fcc4d2a2b10386e48850c6ea65c21e38ed32fb1a0d3f3a"
    let apiServerAddr = "http://144.24.89.242:8810"
    if(req.msg == "sendPerformanceData"){
        fetch(`${apiServerAddr}/api/extension/pushPerformance?key=${apiKey}`, {
            method: "POST",
            body: new URLSearchParams({
                payload : JSON.stringify(req.payload),
            })
        })
    }

    sendResponse({response : "OK"});
})

console.log("test");