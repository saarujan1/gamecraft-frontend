import {Menu} from "antd"
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons'; 
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons/lib/icons'; 
import "../styles/App.css"
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {

  return (
    <div style={{display: "flex", flexDirection: "column", flex: 1, height:'100vh'}}>
      <Header />

      <div style={{display: "flex", flexDirection: "row", flex: 1, backgroundColor: 'white'}}>
        <NavBar />
        <Content />
      </div>

      <Footer />
    </div>
  );
}


function Header() {
  return <div className="header">
    GameCraft
  </div>
}

function Content() {
  return <div
  style={{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-100px'
  }}
>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/profile" element={<div>Profile</div>}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
  </div>
}

function NavBar() {
  const navigate = useNavigate()

  return (
  <div style={{display: "flex", flexDirection: "row"}}>
    <Menu 
      style={{ backgroundColor: '#2F2FA2' }}
      onClick={({key})=>{
      navigate(key);
      }}

      defaultSelectedKeys={[window.location.pathname]}

      items={[
        {label: "Home", key: "/", icon: <HomeOutlined />},
        {label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined />},
        {label: "Profile", key: "/profile", icon: <UserOutlined />},
        {label: "Sign in", key: "/signin", icon: <PoweroffOutlined />},
      ]}>
    </Menu>
  </div>
  )
}

function Footer() {
  return <div className="footer">
    
  </div>
}

export default App;
