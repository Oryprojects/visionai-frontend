import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
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
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;