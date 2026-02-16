import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBot onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  );
};

export default Layout;