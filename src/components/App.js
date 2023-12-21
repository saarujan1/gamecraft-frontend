import {Menu} from "antd"
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons'; 
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons/lib/icons'; 
import "../styles/App.css"
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard"
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {

  return (
    <div style={{display: "flex", flexDirection: "column", flex: 1, height:'100vh'}}>
      <Header />

      <div style={{display: "flex", flexDirection: "row", flex: 1, backgroundColor: '#2F2FA2'}}>
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
  return <div>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<div><Dashboard/></div>}></Route>
      <Route path="/profile" element={<div>Profile</div>}></Route>
      <Route path="/signin" element={<div>Sign in</div>}></Route>
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
    Footer
  </div>
}

export default App;
