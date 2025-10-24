import React from 'react';
import { useNavigate } from 'react-router-dom';
const LegacyToFutureTransformation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
  };

  return (
  <div>
    {/* Hero Section */}
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-24">
  <img src="/LegacytoFuture.png" alt="Legacy to Future Transformation" className="absolute inset-0 w-full h-full object-cover opacity-75 brightness-110 z-0" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-10" />
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-5">Legacy to Future Transformation</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-5 font-medium max-w-2xl mx-auto">Our Legacy to Future Transformation service modernizes outdated systems through migration to cloud-native, AI-enabled architectures, future-proofing your technology landscape.</p>
        <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg text-base mt-4">Get Started</button>
      </div>
    </section>

    {/* Main Content Section */}
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What We Do</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 mb-8 space-y-2">
          <li><b>Assessment & roadmap:</b> Evaluate legacy infrastructure and develop a phased modernization plan aligned with business priorities.</li>
          <li><b>Cloud-Native Migration:</b> Migrate legacy applications to scalable, flexible cloud platforms using microservices and containerization technologies.</li>
          <li><b>AI-Enabled Enhancement:</b> Incorporate AI to automate processes, enhance analytics, and create intelligent workflows within the new architecture.</li>
          <li><b>Security & Compliance:</b> Implement robust security frameworks meeting industry standards to protect data and applications.</li>
          <li><b>Continuous Innovation:</b> Support ongoing upgrades and AI model retraining to maintain competitive edge.</li>
        </ul>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Benefits</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-200 space-y-2">
          <li>Increased agility and scalability.</li>
          <li>Reduced maintenance and operational costs.</li>
          <li>Enhanced user experiences with AI-driven capabilities.</li>
          <li>Greater resilience and disaster recovery readiness.</li>
        </ul>
      </div>
    </section>
  </div>
);
}
export default LegacyToFutureTransformation;