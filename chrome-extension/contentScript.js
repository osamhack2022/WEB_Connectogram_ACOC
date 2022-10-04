console.log("running Connectogram extension...........by. Team ACOC")

var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
var performanceData = performance.getEntries().map(item => {
    return {
        initiatorType : item.initiatorType,
        responseEnd : item.responseEnd,
        name : item.name,
    }
})

chrome.runtime.sendMessage({msg : "sendPerformanceData", payload : performanceData}, (res)=>{})