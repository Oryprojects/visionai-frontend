import React from 'react';
import { useNavigate } from 'react-router-dom';
const EndToEndSolutionImplementation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
  };

  return (
  <div>
    {/* Hero Section */}
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
  <img src="/EndtoEnd.png" alt="End-to-End Solution Implementation" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">End-to-End Solution Implementation</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Our End-to-End Solution Implementation service offers a comprehensive, seamless approach to transforming your business challenges into operational success. From strategic planning to final execution, we ensure every phase of your project is meticulously managed for maximum impact.</p>
        <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
      </div>
    </section>

    {/* Main Content Section */}
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
          <li><b>Strategic Planning:</b> We begin by defining clear business goals and objectives, aligning stakeholders on a unified vision and expected outcomes. This includes assessing current processes and determining what success looks like for your organization.</li>
          <li><b>Role and Responsibility Assignment:</b> The right people on the right tasks is critical. We identify and assign clear roles and responsibilities within your teams to ensure smooth collaboration and accountability throughout the project lifecycle.</li>
          <li><b>Process Documentation:</b> Every step of the implementation is thoroughly documented to provide transparency, facilitate communication, and serve as a reference to track progress and identify potential bottlenecks.</li>
          <li><b>Design and Development:</b> We design tailored solutions that fit your unique business requirements, whether it’s system integration, workflow automation, or digital transformation initiatives. Our experts develop and configure the solution to ensure a perfect fit.</li>
          <li><b>Testing & Quality Assurance:</b> Rigorous testing phases guarantee that the solution functions as expected. We perform end-to-end testing, troubleshoot issues, and refine the solution to meet quality standards.</li>
          <li><b>Execution & Deployment:</b> We implement the solution with precision, adhering to project timelines and budgets. Our approach minimizes disruption, ensuring a smooth transition to the new system or process.</li>
          <li><b>Monitoring & Optimization:</b> After deployment, continuous monitoring helps us quickly spot and resolve issues. We analyze performance data to optimize the solution, making adjustments as needed to maximize benefits.</li>
          <li><b>Training & Support:</b> We empower your teams through training and detailed documentation, ensuring they gain confidence in using the new systems. Ongoing support helps sustain improvements and facilitates future growth.</li>
        </ul>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
          <li>Seamless integration across systems, processes, and teams.</li>
          <li>Reduced operational risks through structured methodology.</li>
          <li>Enhanced collaboration and communication.</li>
          <li>Scalability and sustainability for long-term success.</li>
        </ul>
      </div>
    </section>
  </div>
);
}
export default EndToEndSolutionImplementation;