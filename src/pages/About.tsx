import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Director {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  order: number;
  isActive: boolean;
}

interface AboutData {
  _id: string;
  companyInfo: {
    mission: string;
    vision: string;
    description: string;
    foundedYear?: number;
    teamSize?: string;
    headquarters?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    mapUrl?: string;
  };
  directors: Director[];
  stats: {
    projectsCompleted: number;
    clientsServed: number;
    yearsExperience: number;
    teamMembers: number;
  };
}

const FALLBACK_ABOUT: AboutData = {
  _id: 'fallback',
  companyInfo: {
    mission:
      'To empower businesses across Asia and beyond with cutting-edge AI-driven solutions that bridge technological resource gaps, accelerate digital transformation, and deliver measurable, sustainable value.',
    vision:
      'To be the most trusted AI transformation partner in the Asia-Pacific region — enabling every organization we serve to harness the full potential of intelligent automation and data-driven decision-making.',
    description:
      'Vision AI bridges Japan\'s technological resource gap by leveraging offshore talent to deliver cutting-edge, AI-driven solutions. We help clients establish focused Global Capability Centers (GCCs) that serve as execution hubs, streamline operations, and reduce the complexity of multi-vendor management.',
    foundedYear: 2020,
    teamSize: '50+',
    headquarters: 'Tsukuba, Ibaraki, Japan',
  },
  contactInfo: {
    email: 'sales@visionai.jp',
    phone: '+81-50-8894-4567',
    address: '305-0861, Ibaraki, Tsukuba, Yatabe 1077-58',
  },
  directors: [],
  stats: {
    projectsCompleted: 500,
    clientsServed: 120,
    yearsExperience: 5,
    teamMembers: 50,
  },
};

const About: React.FC = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);
      } else {
        setApiError(true);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  // Use live data when available, fallback otherwise
  const data = aboutData ?? FALLBACK_ABOUT;

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100); // Small delay for transition to start
  };

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We stay at the forefront of AI technology to deliver cutting-edge solutions.',
    },
    {
      icon: Users,
      title: 'Client Success',
      description: 'Your success is our success. We measure our impact by your business outcomes.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code to customer service.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Mindset',
      description: 'We believe in continuous learning and adaptation in the rapidly evolving AI landscape.',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Fullscreen background video with overlay content */}
      <section className="relative min-h-screen overflow-hidden">
        <video
          src="/about.mov"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
          <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(147,197,253,0.25),transparent_60%)]"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center text-center min-h-screen px-4">
          <div className="max-w-3xl blog-hero-text slide-in-once slide-delay-200">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-6 heading-zoom">
              About VisionAI
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 leading-relaxed sub-wipe">
              {data.companyInfo.description}
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleNavigate('/careers')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {data.companyInfo.mission}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {data.companyInfo.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at VisionAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Leadership Team */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the dedicated professionals guiding our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData?.directors && aboutData.directors.length > 0 ? (
              aboutData.directors.map((director, index) => (
                <motion.div
                  key={director._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {director.image ? (
                      <img
                        src={director.image}
                        alt={director.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-lg">Photo Coming Soon</span>
                    )}
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{director.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{director.designation}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16">
                <p className="text-gray-500 text-lg">Our leadership team information will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Contact Information
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's start a conversation about your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">{aboutData.contactInfo.address}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Telephone</h3>
              <p className="text-gray-600 dark:text-gray-300">{aboutData.contactInfo.phone}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">{aboutData.contactInfo.email}</p>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => handleNavigate('/contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section> */}

      {/* Join Our Team CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented, passionate individuals to join our growing team. Explore career opportunities at VisionAI.
          </p>
          <button
            onClick={() => handleNavigate('/careers')}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300"
          >
            View Open Positions
          </button>
        </motion.div>
      </section>


      {/* Timeline
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to transform businesses through AI.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Successful Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;