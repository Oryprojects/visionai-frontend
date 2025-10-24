import React from 'react';
import { useNavigate } from 'react-router-dom';

const BOTSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-600 via-blue-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
        <img src="/Bot.png" alt="BOT Setup (Build-Operate-Transfer)" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">BOT Setup (Build-Operate-Transfer)</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Our BOT Setup service provides a turnkey model to establish offshore delivery centers tailored for scalability, cost efficiency, and long-term control. This model ensures your organization gains both operational efficiency and strategic ownership.</p>
          <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
            <li><b>Build:</b> We establish your offshore center from the ground up, including infrastructure, resource hiring, training, and process documentation.</li>
            <li><b>Operate:</b> Our experienced team manages the center’s day-to-day operations, maintaining productivity, quality, and compliance.</li>
            <li><b>Transfer:</b> After stabilization, we gradually transition full control of the delivery center to your organization, providing a seamless handover with extensive knowledge transfer.</li>
          </ul>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
            <li>Reduced operational costs with improved service quality.</li>
            <li>Accelerated delivery timelines through dedicated teams.</li>
            <li>Retained intellectual property and process control.</li>
            <li>Clear transition roadmap reducing risks during handover.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
export default BOTSetup;