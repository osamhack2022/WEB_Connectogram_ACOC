import './Main.css';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = () => {

    return (
        <div className='root' style={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ alignItems: 'center', backgroundColor: '#000000' }}>
                <Toolbar style={{width: '95%'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', left: '0%' }}>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>전체</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>육군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>해군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>공군</div>
                        <div style={{ marginRight: '8px', fontFamily: 'Noto Sans KR' }}>해병대</div>
                        <div style={{fontFamily: 'Noto Sans KR'}}>국직</div>
                    </div>
                    <Typography variant="h4" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Noto Serif KR' }}>
                        Connectogram
                    </Typography>
                    <div style={{ position: 'absolute', right: '0%', transform: 'translateX(-50%)', }}>
                        사용자 정보
                    </div>
                </Toolbar>
            </AppBar>
            <AppBar position="static" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', height: '50px' }}>
                <Toolbar style={{width: '60%', display: 'flex', justifyContent: 'space-around',}}>
                    <Typography component='div' style={{color: '#000000', fontFamily: 'Noto Sans KR'}}>
                        DASHBOARD
                    </Typography>
                    <Typography component='div' style={{color: '#000000', fontFamily: 'Noto Sans KR'}}>
                        ASSET MANAGEMENT
                    </Typography>
                    <Typography component='div' style={{color: '#000000', fontFamily: 'Noto Sans KR'}}>
                        CONNECTO-MAP
                    </Typography>
                    <Typography component='div' style={{color: '#000000', fontFamily: 'Noto Sans KR'}}>
                        LOG & REPORT
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>
    );
}

export default Main;