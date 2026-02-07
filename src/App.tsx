import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import RouteTransitionVideo from './components/RouteTransitionVideo';
import PageTransitionWrapper from './components/PageTransitionWrapper';


// Route-based lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const EndToEndSolutionImplementation = React.lazy(() => import('./pages/EndToEndSolutionImplementation'));
const AIPoweredBusinessIntelligence = React.lazy(() => import('./pages/AIPoweredBusinessIntelligence'));
const AgenticAISystems = React.lazy(() => import('./pages/AgenticAISystems'));
const DataDrivenAnalytics = React.lazy(() => import('./pages/DataDrivenAnalytics'));
const BOTSetup = React.lazy(() => import('./pages/BOTSetup'));
const LegacyToFutureTransformation = React.lazy(() => import('./pages/LegacyToFutureTransformation'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Contact = React.lazy(() => import('./pages/Contact'));

// Admin pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard.tsx'));
const AdminServices = React.lazy(() => import('./pages/admin/Services.tsx'));
const AdminCareers = React.lazy(() => import('./pages/admin/Careers.tsx'));
const AdminJobApplications = React.lazy(() => import('./pages/admin/JobApplications.tsx'));
const AdminContacts = React.lazy(() => import('./pages/admin/Contacts.tsx'));
const AdminAbout = React.lazy(() => import('./pages/admin/About.tsx'));
const AdminInvoices = React.lazy(() => import('./pages/admin/Invoices.tsx'));
const AdminProfile = React.lazy(() => import('./pages/admin/Profile.tsx'));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as const });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <RouteTransitionVideo />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-sm text-gray-600">Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
                <Route path="about" element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
                <Route path="services" element={<PageTransitionWrapper><Services /></PageTransitionWrapper>} />
                <Route path="/services/end-to-end-solution-implementation" element={<PageTransitionWrapper><EndToEndSolutionImplementation /></PageTransitionWrapper>} />
                <Route path="/services/ai-powered-business-intelligence" element={<PageTransitionWrapper><AIPoweredBusinessIntelligence /></PageTransitionWrapper>} />
                <Route path="/services/agentic-ai-systems" element={<PageTransitionWrapper><AgenticAISystems /></PageTransitionWrapper>} />
                <Route path="/services/data-driven-analytics" element={<PageTransitionWrapper><DataDrivenAnalytics /></PageTransitionWrapper>} />
                <Route path="/services/bot-setup" element={<PageTransitionWrapper><BOTSetup /></PageTransitionWrapper>} />
                <Route path="/services/legacy-to-future-transformation" element={<PageTransitionWrapper><LegacyToFutureTransformation /></PageTransitionWrapper>} />
                <Route path="careers" element={<PageTransitionWrapper><Careers /></PageTransitionWrapper>} />
                <Route path="contact" element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
                {/* <Route path="blog" element={<Blog />} /> */}
              </Route>
              
              {/* Admin Routes - Standalone without Layout */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/services" element={
                <ProtectedRoute>
                  <AdminServices />
                </ProtectedRoute>
              } />
              <Route path="/admin/careers" element={
                <ProtectedRoute>
                  <AdminCareers />
                </ProtectedRoute>
              } />
              <Route path="/admin/job-applications" element={
                <ProtectedRoute>
                  <AdminJobApplications />
                </ProtectedRoute>
              } />
              <Route path="/admin/contacts" element={
                <ProtectedRoute>
                  <AdminContacts />
                </ProtectedRoute>
              } />
              <Route path="/admin/about" element={
                <ProtectedRoute>
                  <AdminAbout />
                </ProtectedRoute>
              } />
              <Route path="/admin/invoices" element={
                <ProtectedRoute>
                  <AdminInvoices />
                </ProtectedRoute>
              } />
              <Route path="/admin/profile" element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;