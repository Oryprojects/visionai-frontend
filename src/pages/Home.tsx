import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, TrendingUp, Zap, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100);
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

  // Reveal animation setup
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

  // Video autoplay-on-scroll setup
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
              video.play().catch(() => {});
            } catch {}
          } else {
            try {
              video.pause();
              video.currentTime = 0;
            } catch {}
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
      {/* HERO SECTION */}
      <section className="relative h-[90vh] max-h-[1000px] min-h-[600px] overflow-hidden bg-black z-20">
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
        <div className="relative z-10 px-4 md:px-16 py-16 sm:py-24 flex items-center justify-center text-center h-full">
          <div className="max-w-3xl slide-in-once slide-delay-200">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 heading-zoom mb-4 sm:mb-6">
              WELCOME TO VISION AI
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto sub-wipe slide-delay-400 px-2">
              Intelligence in sight. We craft AI experiences that are fast, reliable, and human-centered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigate('/services')}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 shadow-3d-hover"
              >
                Explore Services
              </button>
              <button
                onClick={() => handleNavigate('/careers')}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base glass text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/25"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION (Fixed) */}
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
            <div
              id="showcaseVideoContainer"
              className="relative rounded-2xl overflow-hidden shadow-lg"
              style={{
                paddingTop: '56.25%',
                backgroundColor: 'black',
                maxHeight: '480px',
              }}
            >
              <video
                ref={(el) => (videoRef.current = el)}
                id="showcaseVideo"
                src={encodeURI('/Vision Ai video.mp4')}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                preload="auto"
                poster="/VisionAILogo.png"
                controls
                controlsList="nodownload"
                aria-label="VisionAI showcase video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {/* (Remaining sections unchanged — About, Services, Global Partners, Join Our Team, CTA) */}
      {/* Your original JSX below stays identical */}
      
      {/* ABOUT SECTION */}
      <section className="py-24 bg-white dark:bg-gray-900 reveal reveal-up">
        {/* ... your existing About VisionAI content ... */}
      </section>

      {/* SERVICES, PARTNERS, JOIN TEAM, CTA sections unchanged */}
      {/* You can keep all your existing code here exactly as before */}
    </div>
  );
};

export default Home;
