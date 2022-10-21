const LogAndReport = () => {
    return (
        <div style={{backgroundColor: 'transparent', height: '88vh' , display: 'flex', flexDirection: 'row' }}>
            <div style={{display: 'flex', flexDirection: 'column', width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(0, 140, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Connections</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>22</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 92, 82)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Malicious</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>0</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', height: '25vh', backgroundColor: 'rgb(255, 171, 46)', margin: '8px', borderRadius: '8px', boxShadow: '0 1px 3px 2px gray'}}>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>Warnings</span>
                    <span style={{color: '#ffffff', fontFamily: 'Noto Sans KR', fontSize: '60px'}}>0</span>
                </div>
            </div>
            <div style={{width: '50%', backgroundColor: 'red'}}></div>
            <div style={{width: '25%', backgroundColor: 'green'}}></div>
        </div>
    );
}

export default LogAndReport;