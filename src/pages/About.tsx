import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    window.dispatchEvent(new Event('force-route-transition'));
    setTimeout(() => navigate(path), 100); // Small delay for transition to start
  };
  // const milestones = [
  //   { year: '2020', title: 'Company Founded', description: 'VisionAI was established with a mission to democratize AI for businesses.' },
  //   { year: '2021', title: 'First 100 Clients', description: 'Reached our first major milestone serving 100+ businesses across various industries.' },
  //   { year: '2022', title: 'Series A Funding', description: 'Secured $10M in Series A funding to expand our AI capabilities and team.' },
  //   { year: '2023', title: 'Global Expansion', description: 'Opened offices in London, Singapore, and Toronto to serve clients worldwide.' },
  //   { year: '2024', title: 'AI Innovation Award', description: 'Recognized as the leading AI consulting firm by Tech Innovation Awards.' },
  // ];

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
              We're pioneering the future of business intelligence through advanced AI solutions.
              Our mission is to make artificial intelligence accessible, practical, and transformative
              for businesses of all sizes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigate('/contact')}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => handleNavigate('/careers')}
                className="inline-flex items-center justify-center px-6 py-3 glass text-white rounded-lg hover:bg-white/20 transition-colors"
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
                To lead in technological innovation and set new industry standards by empowering Japan's digital transformation through scalable, AI-driven solutions and strategic global collaboration
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Through our expertise in machine learning, data science, and business strategy, 
                we help our clients navigate the complexities of AI adoption and achieve measurable results.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To be the global leader in AI-powered business transformation, creating a world where 
                intelligent systems and human expertise work together to solve the most complex challenges.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We envision a future where AI is seamlessly integrated into every aspect of business 
                operations, driving unprecedented levels of efficiency, innovation, and growth.
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
            {[
              {
                name: 'Demo',
                title: 'Managing Director',
                image: '',
              },
              {
                name: 'Demo',
                title: 'Executive Director',
                image: '',
              },
              {
                name: 'Demo',
                title: 'Director',
                image: '',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-lg">Photo Coming Soon</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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