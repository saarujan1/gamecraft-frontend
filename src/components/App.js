import {Menu} from "antd"
import { HomeOutlined, DashboardOutlined, BulbOutlined } from '@ant-design/icons'; 
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons/lib/icons';
import { EditOutlined } from '@ant-design/icons/lib/icons';
import "../styles/App.css"
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Discover from "../pages/Discover";
import SubmitPost from '../pages/SubmitPost';
import SignIn from "../pages/SignIn";
import TermsOfService from "../pages/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Contact from "../pages/Contact";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from 'react';
import { AuthProvider, useAuth } from '../helper/authenticator'; 

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Header />
      <div className="content-area">
        <Content />
      </div>
      <Footer />
    </div>
    </AuthProvider>
  );
}

function Header() {
  return (
    <div className="header" style={{ display: 'flex', alignItems: 'center', position: "fixed", width: '100%', marginBottom: '10%', zIndex: '1' }}>
      <div style={{ }}>GameCraft</div>
      <div style={{}}><NavBar/></div>
    </div>
  )
}

function Content() {
  return <div
  style={{
    marginTop: '10%',
    marginLeft: '10%', 
    marginRight: '10%'
  }}
>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/discover" element={<Discover/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/submit-post" element={<SubmitPost />}></Route>
      <Route path="/profile" element={<Profile />}></Route>

      // for footer
      <Route path="/terms-of-service" element={<TermsOfService />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
    </Routes>
  </div>
}

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  // Handler for menu item clicks
  const onMenuClick = (key) => {
    if (key === 'signout') {
      signOut();
      navigate('/');
    } else {
      navigate(key);
    }
  };

  // Dynamically generate menu items based on authentication status
  const menuItems = isAuthenticated
    ? [
        { label: 'Home', key: '/', icon: <HomeOutlined /> },
        { label: 'Discover', key: '/discover', icon: <BulbOutlined /> },
        { label: 'Create a game', key: '/submit-post', icon: <EditOutlined /> },
        { label: 'Profile', key: '/profile', icon: <UserOutlined /> },
        { label: 'Sign out', key: 'signout', icon: <PoweroffOutlined /> },
      ]
    : [
        { label: 'Home', key: '/', icon: <HomeOutlined /> },
        { label: 'Sign in', key: '/signin', icon: <PoweroffOutlined /> },
      ];

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu
        mode="horizontal"
        style={{ minWidth: '780px', backgroundColor: '#242582' }}
        onClick={(e) => onMenuClick(e.key)}
        defaultSelectedKeys={[window.location.pathname]}
        items={menuItems}
      />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer" style={{zIndex: '1' }}>
      <p>© {year} GameCraft - Community Driven Game Development</p>
      <p>
        <a href="/terms-of-service" style={{ color: 'white', paddingLeft: '5px' }}>
          Terms of Service
        </a>{' '}
        |{' '}
        <a href="/privacy-policy" style={{ color: 'white', paddingLeft: '5px', paddingRight: '5px'}}>
          Privacy Policy 
        </a>
      </p>
      <p>
        |{' '}
        <a href="/contact" style={{ color: 'white', paddingLeft: '5px' }}>
          Contact Us
        </a>
      </p>
    </div>
  );
}

export default App;