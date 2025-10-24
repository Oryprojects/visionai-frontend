import React from 'react';
import { useNavigate } from 'react-router-dom';
const AIPoweredBusinessIntelligence: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
  };

  return (
  <div>
    {/* Hero Section */}
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
  <img src="/AI-powered.png" alt="AI-Powered Business Intelligence" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">AI-Powered Business Intelligence</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Unlock actionable insights, predictive analytics, and automated reporting with our AI-powered Business Intelligence solutions. Make smarter decisions, faster, and drive your business forward with confidence.</p>
        <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
      </div>
    </section>

    {/* Main Content Section */}
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
          <li><b>Predictive Analytics:</b> Forecast trends and outcomes using advanced AI models tailored to your business needs.</li>
          <li><b>Automated Dashboards & Reporting:</b> Deliver real-time, interactive dashboards and scheduled reports for all stakeholders.</li>
          <li><b>Natural Language Query:</b> Empower users to ask questions and get insights using simple, conversational language.</li>
          <li><b>Data Integration:</b> Seamlessly connect to all your business data sources for a unified view.</li>
          <li><b>Custom AI Models:</b> Build and deploy AI models that track and optimize your unique business KPIs.</li>
        </ul>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
          <li>Faster, data-driven decision-making at every level.</li>
          <li>Proactive identification of opportunities and risks.</li>
          <li>Personalized insights for every department.</li>
        </ul>
      </div>
    </section>
  </div>
);
}

export default AIPoweredBusinessIntelligence;