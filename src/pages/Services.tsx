import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, Zap } from 'lucide-react';

interface ServiceData {
  _id: string;
  title: string;
  description: string;
  slug: string;
  features: string[];
  category: string;
  status: string;
  featured: boolean;
  order: number;
  icon?: string;
}

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  slug: string;
  features: string[];
  color: string;
};

const FALLBACK_SERVICES: ServiceData[] = [
  {
    _id: '1', title: 'End-to-End Solution Implementation', slug: 'end-to-end-solution-implementation',
    description: 'Comprehensive AI integration from strategy to deployment, ensuring seamless adoption across your entire organization with minimal disruption.',
    features: ['Full lifecycle management', 'Custom AI model development', 'Legacy system integration', 'Post-deployment support'],
    category: 'Implementation', status: 'ACTIVE', featured: true, order: 1, icon: 'Brain',
  },
  {
    _id: '2', title: 'AI-Powered Business Intelligence', slug: 'ai-powered-business-intelligence',
    description: 'Transform raw data into actionable insights with our advanced AI analytics platform that drives smarter, faster decision-making.',
    features: ['Real-time dashboards', 'Predictive analytics', 'Automated reporting', 'Multi-source data integration'],
    category: 'Analytics', status: 'ACTIVE', featured: true, order: 2, icon: 'TrendingUp',
  },
  {
    _id: '3', title: 'Agentic AI Systems', slug: 'agentic-ai-systems',
    description: 'Deploy autonomous AI agents that can plan, reason, and execute complex multi-step tasks with minimal human intervention.',
    features: ['Multi-agent orchestration', 'Task automation', 'Natural language interfaces', 'Continuous learning'],
    category: 'AI Systems', status: 'ACTIVE', featured: true, order: 3, icon: 'Zap',
  },
  {
    _id: '4', title: 'Data-Driven Analytics', slug: 'data-driven-analytics',
    description: 'Unlock the full potential of your data with our advanced analytics services, turning complex datasets into clear strategic advantages.',
    features: ['Data pipeline setup', 'Statistical modeling', 'Visualization & reporting', 'Performance tracking'],
    category: 'Transformation', status: 'ACTIVE', featured: true, order: 4, icon: 'Brain',
  },
  {
    _id: '5', title: 'BOT Setup (Build-Operate-Transfer)', slug: 'bot-setup',
    description: 'Establish, operate, and seamlessly transfer AI-powered business units to your organization with zero knowledge loss.',
    features: ['Dedicated offshore team setup', 'Knowledge transfer protocols', 'Operational handover', 'SLA-backed services'],
    category: 'Setup', status: 'ACTIVE', featured: true, order: 5, icon: 'Zap',
  },
  {
    _id: '6', title: 'Legacy to Future Transformation', slug: 'legacy-to-future-transformation',
    description: 'Modernize your legacy systems with AI-powered migration strategies that minimize risk and maximize business continuity.',
    features: ['System audit & assessment', 'Phased migration planning', 'AI-enhanced modernization', 'Zero-downtime transitions'],
    category: 'Transformation', status: 'ACTIVE', featured: true, order: 6, icon: 'TrendingUp',
  },
];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero video rotation state (hoisted to top-level to satisfy hooks rules)
  const heroVideos = ['/service.mov'].filter(Boolean);
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (heroVideos.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroVideos.length]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?status=ACTIVE');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setServicesData(data);
        }
        // If API returns empty array, we keep servicesData empty and use fallback below
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100); // Small delay for transition to start
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'TrendingUp':
        return TrendingUp;
      case 'Zap':
        return Zap;
      default:
        return Brain; // Default icon
    }
  };

  const getColorClasses = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Implementation': 'from-blue-500 to-blue-600',
      'Analytics': 'from-purple-500 to-purple-600',
      'AI Systems': 'from-green-500 to-green-600',
      'Setup': 'from-teal-500 to-teal-600',
      'Transformation': 'from-cyan-500 to-cyan-600',
    };
    return colorMap[category] || 'from-blue-500 to-blue-600';
  };

  // Use live data from API if available, otherwise fall back to static services
  const sourceData = servicesData.length > 0 ? servicesData : FALLBACK_SERVICES;

  // Transform service data to match ServiceCard component expectations
  const services: Service[] = sourceData.map(service => ({
    icon: getIconComponent(service.icon),
    title: service.title,
    description: service.description,
    slug: service.slug,
    features: service.features,
    color: getColorClasses(service.category)
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Fullscreen background video with clean overlay */}
      <section className="relative min-h-screen overflow-hidden">
        <div ref={sectionRef} className="absolute inset-0">
          {heroVideos.map((src, idx) => (
            <video
              key={`${src}-${idx}`}
              src={src}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              muted
              loop
              playsInline
            />
          ))}

          {/* Subtle readability overlay only */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
            <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_60%)]"></div>
          </div>

          {/* Centered content overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl blog-hero-text slide-in-once slide-delay-200">
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 mb-4 heading-zoom">
                Our Services
              </h1>
              <p className="text-lg md:text-2xl text-blue-100 leading-relaxed sub-wipe">
                Comprehensive AI solutions designed to transform your operations, drive growth,
                and unlock new opportunities in the digital age.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => handleNavigate('/contact')} className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">Get a Consultation</button>
                <button onClick={() => handleNavigate('/about')} className="inline-flex items-center justify-center px-6 py-3 glass text-white rounded-lg hover:bg-white/20 transition-colors">Learn About Us</button>
              </div>
            </div>
          </div>

          {/* Dots */}
          {heroVideos.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroVideos.map((_, idx) => (
                <span key={idx} className={`h-2 w-2 rounded-full ${idx === current ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology to deliver successful AI implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your business needs and identify AI opportunities.' },
              { step: '02', title: 'Strategy', description: 'Develop a comprehensive AI strategy aligned with your goals.' },
              { step: '03', title: 'Implementation', description: 'Execute the solution with our expert team of AI engineers.' },
              { step: '04', title: 'Optimization', description: 'Continuously monitor and optimize for maximum performance.' },
            ].map((process, index) => (
              <div key={index} className="text-center card-3d">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-3d">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute top-10 left-10 float-3d opacity-20">
          <div className="w-24 h-24 bg-white/20 rounded-lg rotate-3d"></div>
        </div>
        <div className="absolute bottom-10 right-10 sphere-3d opacity-30">
          <div className="w-32 h-32 bg-white/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our AI services can transform your business and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-3d-hover"
            >
              Contact Us Today
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-8 py-4 glass text-white rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative service-card rounded-2xl p-8 shadow-3d-hover border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* cursor glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(220px at ${cursor.x}px ${cursor.y}px, rgba(59,130,246,0.18), transparent 60%)` }}
      />

      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 pulse-3d relative z-10`}>
        <service.icon className="h-8 w-8 text-white" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
        {service.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10">
        {service.description}
      </p>

      <div className="space-y-3 relative z-10">
        <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
        <ul className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 relative z-10">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Services;