import React from 'react';
import { useNavigate } from 'react-router-dom';
const DataDrivenAnalytics: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
        <img src="/DataDriven.png" alt="Data-Driven Analytics" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">Data-Driven Analytics</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Our Data-Driven Analytics service empowers businesses to extract maximum value from both structured and unstructured data. Using cutting-edge analytical models, we uncover hidden insights, optimize processes, and support informed strategic decisions.</p>
          <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
            <li><b>Data Preparation:</b> Cleanse and prepare data from multiple sources, including text, images, and transactional records.</li>
            <li><b>Descriptive & Predictive Analytics:</b> Provide historical insights and predict future trends using AI-powered models.</li>
            <li><b>Real-time Analytics:</b> Enable organizations to respond quickly to events through streaming data analysis.</li>
            <li><b>Custom Reports & Visualization:</b> Deliver insights through engaging visualizations and automated reports adapted to business needs.</li>
            <li><b>Operational Optimization:</b> Identify inefficiencies and recommend actionable process improvements.</li>
          </ul>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
            <li>Informed decision-making based on comprehensive data insights.</li>
            <li>Early identification of opportunities and risks.</li>
            <li>Enhanced agility through real-time monitoring.</li>
            <li>Tailored insights for all organizational levels.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
export default DataDrivenAnalytics;