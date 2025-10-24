import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgenticAISystems: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path, { replace: true }), 100);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
        <img src="/AgenticAI.png" alt="Agentic AI Systems" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">Agentic AI Systems</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Our Agentic AI Systems are designed to autonomously perceive, reason, and act to achieve your business goals. These intelligent agents operate with minimal human intervention, orchestrating complex tasks and adapting to dynamic environments.</p>
          <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
            <li><b>Multi-Agent Orchestration:</b> Deploy and coordinate multiple AI agents to handle complex, interdependent business processes.</li>
            <li><b>Goal-Driven Automation:</b> Automate tasks based on high-level objectives, reducing manual effort and increasing efficiency.</li>
            <li><b>Context-Aware Decision Making:</b> Enable agents to make informed decisions by understanding business context and adapting to new information.</li>
            <li><b>System Integration:</b> Seamlessly connect AI agents with your existing business systems and workflows.</li>
            <li><b>Continuous Learning:</b> Ensure agents evolve and improve through ongoing learning and adaptation.</li>
          </ul>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
            <li>Autonomous operation with minimal human oversight.</li>
            <li>Rapid adaptation to changing business needs.</li>
            <li>Improved efficiency and reduced operational costs.</li>
            <li>Scalable solutions for complex, multi-step processes.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
export default AgenticAISystems;