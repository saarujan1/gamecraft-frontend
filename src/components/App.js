import {Menu} from "antd"
import { HomeOutlined, DashboardOutlined, BulbOutlined } from '@ant-design/icons'; 
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons/lib/icons';
import { EditOutlined } from '@ant-design/icons/lib/icons';
import "../styles/App.css"
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import SubmitPost from '../pages/SubmitPost';
import SignIn from "../pages/SignIn";
import TermsOfService from "../pages/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Contact from "../pages/Contact";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", flex: 1, height:'100vh'}}>
      <Header />

      <div style={{display: "flex", flexDirection: "row", flex: 1, backgroundColor: 'white'}}>
        
        <Content />
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
   <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ marginLeft: '10%' }}>GameCraft</div>
      <div style={{ marginRight: '10%' }}><NavBar/></div>
    </div>
  )
}

function Content() {
  return <div
  style={{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto', 
  }}
>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/profile" element={<div>Profile</div>}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/submit-post" element={<SubmitPost />}></Route>

      // for footer
      <Route path="/terms-of-service" element={<TermsOfService />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
    </Routes>
  </div>
}

function NavBar() {
  const navigate = useNavigate()

  return (
  <div >
    <Menu 
      mode="horizontal"
      style={{minWidth: "680px", backgroundColor: "#242582"}}
      onClick={({key})=>{
        navigate(key);
      }}

      defaultSelectedKeys={[window.location.pathname]}

      items={[
        {label: "Home", key: "/", icon: <HomeOutlined />},
        {label: "Discover", key: "/discover", icon: <BulbOutlined />},
        {label: "Start a game", key: "/submit-post", icon: <EditOutlined /> },
        {label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined />},
        {label: "Profile", key: "/profile", icon: <UserOutlined />},
        {label: "Sign in", key: "/signin", icon: <PoweroffOutlined />},
      ]}>
    </Menu>
  </div>
  )
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p>© {year} GameCraft - Community Driven Game Development</p>
      <p>
        <a href="/terms-of-service" style={{ color: 'white' }}>
          Terms of Service
        </a>{' '}
        |{' '}
        <a href="/privacy-policy" style={{ color: 'white' }}>
          Privacy Policy 
        </a>
      </p>
      <p>
        <a href="/contact" style={{ color: 'white' }}>
          Contact Us
        </a>
      </p>
    </div>
  );
}


export default App;
