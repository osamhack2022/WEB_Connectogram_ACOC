console.log("running extension...........")
console.log(location.href)
console.log(document.title)

var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
var performanceData = performance.getEntries().map(item => {
    return {
        initiatorType : item.initiatorType,
        responseEnd : item.responseEnd,
        name : item.name,
    }
})

chrome.runtime.sendMessage({msg : "sendPerformanceData", payload : performanceData}, (res)=>{console.log(res);})
chrome.runtime.sendMessage({msg : "backgroundText"}, (res)=>{console.log(res);})