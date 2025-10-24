import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import RouteTransitionVideo from './components/RouteTransitionVideo';

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
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="/services/end-to-end-solution-implementation" element={<EndToEndSolutionImplementation />} />
              <Route path="/services/ai-powered-business-intelligence" element={<AIPoweredBusinessIntelligence />} />
              <Route path="/services/agentic-ai-systems" element={<AgenticAISystems />} />
              <Route path="/services/data-driven-analytics" element={<DataDrivenAnalytics />} />
              <Route path="/services/bot-setup" element={<BOTSetup />} />
              <Route path="/services/legacy-to-future-transformation" element={<LegacyToFutureTransformation />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              {/* <Route path="blog" element={<Blog />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;