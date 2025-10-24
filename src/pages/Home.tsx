import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, TrendingUp, Zap, CheckCircle } from 'lucide-react';

// Using native browser controls; no custom VideoControls component.

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100); // Small delay for transition to start
  };
  const services = [
    { icon: Brain, title: 'End-to-End Solution Implementation', description: 'Comprehensive delivery from strategy to execution, ensuring seamless integration across systems, processes, and teams.', link: '/services/end-to-end-solution-implementation' },
    { icon: TrendingUp, title: 'AI-Powered Business Intelligence', description: 'Transform raw data into actionable insights using advanced analytics, predictive modeling, and intelligent dashboards.', link: '/services/ai-powered-business-intelligence' },
    { icon: Zap, title: 'Agentic AI Systems', description: 'Deploy autonomous AI agents that plan, decide, and execute tasks with minimal human intervention—driving efficiency and innovation.', link: '/services/agentic-ai-systems' },
    { icon: TrendingUp, title: 'Data-Driven Analytics', description: 'Leverage structured and unstructured data to uncover trends, optimize operations, and support informed decision-making.', link: '/services/data-driven-analytics' },
    { icon: Brain, title: 'BOT Setup (Build-Operate-Transfer)', description: 'Establish offshore delivery centers with a clear path to ownership, enabling scalability, cost efficiency, and long-term control.', link: '/services/bot-setup' },
    { icon: Zap, title: 'Legacy to Future Transformation', description: 'Modernize outdated systems and processes by migrating to cloud-native, AI-enabled architectures that future-proof your business.', link: '/services/legacy-to-future-transformation' },
  ];

  const globalPartners = [
    {
      name: 'Ideal Folks',
      description: 'A leading provider of end-to-end IT services and executive search for Global companies, with a primary focus on Japan.',
      logo: '/ideal-1.png',
      link: 'https://www.idealfolks.com/'
    },
    {
      name: 'iCRO',
      description: 'A division of Ideal Folks LLC and its Tokyo-based Clinical Research Partner that provides Clinical Research services in APAC.',
      logo: '/icro_a.png',
      link: 'https://www.icro.com/'
    },
    {
      name: 'Shinka',
      description: 'A world-class IT consulting, services, and solution provider that combines business processing experience with innovative technologies.',
      logo: '/shinka_a.png',
      link: 'https://shinkas.com/'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Video play/pause when the section becomes visible (always muted autoplay)
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('showcaseVideoContainer');
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            try {
              video.muted = true;
              // attempt to play muted (browsers allow this)
              video.play().catch(() => {});
            } catch {
              // ignore play errors
            }
          } else {
            try {
              video.pause();
              video.currentTime = 0;
            } catch {
              // ignore
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    io.observe(container);
    return () => io.disconnect();
  }, []);

  return (
  <div>
      {/* --- HERO SECTION START --- */}
  <section className="relative min-h-screen overflow-hidden bg-black z-20">
        <video
          src="/home.mov"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 -z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25),transparent_60%)] -z-0"></div>
        </div>
        <div className="relative z-10 px-4 md:px-16 py-24 flex items-center justify-center text-center min-h-screen">
          <div className="max-w-3xl slide-in-once slide-delay-200">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 heading-zoom">
                WELCOME TO VISION AI
              </h1>
            </div>
            <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto sub-wipe slide-delay-400">
              Intelligence in sight. We craft AI experiences that are fast, reliable, and human‑centered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigate('/services')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 shadow-3d-hover"
              >
                Explore Services
              </button>
              <button
                onClick={() => handleNavigate('/careers')}
                className="inline-flex items-center justify-center px-8 py-4 glass text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/25"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* --- HERO SECTION END --- */}

      {/* Video Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 reveal reveal-up relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              See VisionAI in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our AI solutions are transforming businesses across industries.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
                <div id="showcaseVideoContainer" className="relative rounded-2xl overflow-hidden shadow-3d-hover holographic-overlay" style={{ paddingTop: '56.25%', maxHeight: '480px' }}>
                  <video
                    ref={(el) => (videoRef.current = el)}
                    id="showcaseVideo"
                    src={encodeURI('/Vision Ai video.mp4')}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    poster="/VisionAILogo.png"
                    controls
                    controlsList="nodownload"
                    aria-label="VisionAI showcase video"
                  />
                  {/* Overlay should not block native controls; only the CTA button should accept pointer events */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                  {/* No CTA: video will autoplay muted when in view */}
                </div>

                {/* Native browser controls are used on the video element above. */}
          </div>
        </div>
      </section>

      {/* About VisionAI Section */}
      <section className="py-24 bg-white dark:bg-gray-900 reveal reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About VisionAI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Vision AI bridges Japan's technological resource gap by leveraging offshore talent to deliver cutting-edge, AI-driven solutions. 
              We help clients establish focused Global Capability Centers (GCCs) that serve as execution hubs, streamline operations, and reduce the complexity of multi-vendor management through strategic resource transfer and centralized delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 card-3d reveal reveal-up">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Proven Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Over 500 successful AI implementations with measurable ROI improvements.
              </p>
            </div>
            
            <div className="text-center p-6 card-3d reveal reveal-up reveal-delay-2">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-300">
                World-class AI researchers and industry veterans with decades of experience.
              </p>
            </div>
            
            <div className="text-center p-6 card-3d reveal reveal-up reveal-delay-3">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cutting-Edge Tech</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Latest AI technologies and frameworks to deliver state-of-the-art solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 reveal reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-6 drop-shadow-lg">
              Our Services
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              Discover our full suite of AI-driven solutions designed to accelerate your business transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-3d-hover border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col reveal reveal-up reveal-delay-${(index % 3) + 1}`}
                style={{ minHeight: '340px' }}
              >
                <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">
                  <service.icon className="h-32 w-32" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    to={service.link}
                    className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-3d-hover text-sm font-semibold"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-3d-hover text-lg font-bold"
            >
              View all services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Partners Section */}
      <section className="py-24 bg-white dark:bg-gray-900 reveal reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Global Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We collaborate with leading technology companies to deliver world-class AI solutions 
              that drive innovation and business transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {globalPartners.map((partner, index) => (
              <div
                key={index}
                className={`relative group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-3d-hover border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col items-center justify-between reveal reveal-up reveal-delay-${(index % 3) + 1}`}
                style={{ minHeight: '340px' }}
              >
                <img src={partner.logo} alt={partner.name} className="mb-6 object-contain" style={{height:'72px', maxWidth:'180px'}} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">{partner.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{partner.description}</p>
                <div className="mt-auto pt-2">
                  <a href={partner.link} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-semibold">Learn More</a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Partnership CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Interested in partnering with VisionAI?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-3d-hover"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 reveal reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of a revolutionary team that's shaping the future of AI. 
              We're looking for passionate individuals to help us transform businesses worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-3d-hover">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation Culture</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work on cutting-edge AI projects that push the boundaries of what's possible.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-3d-hover">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accelerate your career with mentorship from industry experts and continuous learning.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-3d-hover">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make a real difference by helping businesses worldwide transform with AI.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/careers"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-3d-hover"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute top-10 left-10 float-3d opacity-20">
          <div className="w-24 h-24 bg-white/20 rounded-lg rotate-3d"></div>
        </div>
        <div className="absolute bottom-10 right-10 neural-node opacity-30">
          <div className="w-32 h-32 bg-white/20 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how AI can revolutionize your operations and drive unprecedented growth.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-3d-hover"
          >
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;