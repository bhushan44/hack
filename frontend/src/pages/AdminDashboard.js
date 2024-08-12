import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  {
    name: 'Retreat Admins',
    icon: '👤',
    submenu: ['Add Admin', 'View Admins', 'Admin Settings'],
  },
  {
    name: 'Users',
    icon: '👥',
    submenu: ['Add User', 'View Users', 'User Settings'],
  },
  { name: 'Dashboard', icon: '📊' },
  { name: 'Reports', icon: '📈' },
];

const SidebarContent = ({ isOpen, onClose, activeLink, setActiveLink, isCollapsed }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const filteredLinks = LinkItems.filter(link =>
    link.name.toLowerCase().includes(searchTerm) ||
    (link.submenu && link.submenu.some(sub => sub.toLowerCase().includes(searchTerm)))
  );

  const handleSubmenuToggle = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <div style={{
      width: isCollapsed ? '80px' : '250px',
      backgroundColor: '#4B2E39',
      color: 'white',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease, width 0.3s ease',
      position: 'fixed',
      height: '100%',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #6D4C41',
      }}>
        {!isCollapsed && <div style={{ fontSize: '1.5em' }}>Logo</div>}
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5em',
          cursor: 'pointer',
        }}>
          &times;
        </button>
      </div>
      {!isCollapsed && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: '1px solid #FFCC80',
            color: '#4B2E39',
            width: '80%',
          }}
        />
      )}
      <div style={{ padding: '20px' }}>
        {filteredLinks.map(link => (
          <div key={link.name}>
            <div
              onClick={() => {
                setActiveLink(link.name);
                if (link.submenu) handleSubmenuToggle(link.name);
              }}
              style={{
                padding: '10px 0',
                display: 'flex',
                alignItems: 'center',
                color: activeLink === link.name ? '#FF8A65' : '#FFCC80',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}>
              <span style={{ marginRight: isCollapsed ? '0' : '10px' }}>{link.icon}</span>
              {!isCollapsed && link.name}
            </div>
            {link.submenu && !isCollapsed && openSubmenu === link.name && (
              <div style={{
                marginLeft: '20px',
                marginTop: '10px',
              }}>
                {link.submenu.map((sub, idx) => (
                  <div key={idx} style={{ padding: '5px 0', color: '#FFD180' }}>{sub}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TopNav = ({ onMenuToggle, isCollapsed }) => (
  <div style={{
    width: '100%',
    height: '60px',
    backgroundColor: '#8E6E53',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    zIndex: 1001,
  }}>
    <button
      onClick={onMenuToggle}
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5em',
        cursor: 'pointer',
      }}
    >
      {isCollapsed ? '☰' : '←'}
    </button>
    <div style={{ fontSize: '1.5em' }}>DASHBOARD</div>
    <div>
      <button style={{
        marginRight: '10px',
        backgroundColor: '#FF8A65',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
      }}>Sign Out</button>
      <button style={{
        backgroundColor: '#FF8A65',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
      }}>Admin Signup</button>
    </div>
  </div>
);

export default function SidebarWithTopNav() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState('Retreat Admins');
  const [isCollapsed, setCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div>
      <TopNav onMenuToggle={handleMenuToggle} isCollapsed={isCollapsed} />
      <SidebarContent
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        isCollapsed={isCollapsed}
      />
      <main style={{
        padding: '80px 20px',
        marginLeft: isSidebarOpen && !isCollapsed ? '250px' : isCollapsed ? '80px' : '0',
        transition: 'margin-left 0.3s ease',
        flex: 1,
        backgroundColor: '#FFF3E0',
        minHeight: '100vh',
      }}>
        <h1>{activeLink}</h1>
        {/* Main content goes here */}
      </main>
    </div>
  );
}
