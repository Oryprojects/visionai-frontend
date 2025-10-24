import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, DollarSign, Users, Upload, CheckCircle, ChevronDown, Briefcase, Cpu } from 'lucide-react';

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume: FileList;
}

const HeroVideos: React.FC = () => {
  const heroVideos = ['/careers.mov'];
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroVideos.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroVideos.length]);

  return (
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
          <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25),transparent_60%)]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 mb-4">
              Join Our Team
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 leading-relaxed mb-6">
              Be part of a revolutionary team shaping the future of AI. We're looking for
              passionate individuals to help transform businesses worldwide.
            </p>
            <a href="#open-roles" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-3d-hover pointer-events-auto">
              View Open Roles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Careers: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ApplicationForm>();

  const jobs = [
    {
      title: 'General Affairs Representative',
      category: 'General Affairs',
      icon: <Users className="h-8 w-8" />,
      location: 'Japan',
      type: 'Full time',
      salary: 'JPY 3M',
      description: 'Support company operations and administration. Requires Japanese language skills and organizational ability.',
      requirements: [
        'Fluent in Japanese and English',
        'Strong organizational and communication skills',
        'Experience in general affairs or administration preferred',
      ],
    },
    {
      title: 'Bilingual Generative AI Developer',
      category: 'Engineering',
      icon: <Cpu className="h-8 w-8" />,
      location: 'Japan',
      type: 'Full time',
      salary: 'JPY 6M',
      description: 'Develop and deploy generative AI models. Requires bilingual (Japanese/English) skills.',
      requirements: [
        'Experience with AI/ML and generative models',
        'Fluent in Japanese and English',
        'Strong programming skills (Python preferred)',
      ],
    },
    {
      title: 'Bilingual Program Manager',
      category: 'Management',
      icon: <Briefcase className="h-8 w-8" />,
      location: 'Japan',
      type: 'Full time',
      salary: 'JPY 8M to 10M',
      description: 'Lead AI projects and manage cross-functional teams. Requires bilingual (Japanese/English) skills.',
      requirements: [
        'Project management experience',
        'Fluent in Japanese and English',
        'Strong leadership and communication skills',
      ],
    },
  ];

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name.trim());
      formData.append('email', data.email.trim());
      if (data.phone) formData.append('phone', data.phone.trim());
      formData.append('position', data.position);
      if (data.message) formData.append('message', data.message);
      if (data.resume && data.resume[0]) formData.append('resume', data.resume[0]);

      const res = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to submit application');
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1800);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeroVideos />

      {/* Why Work With Us */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why VisionAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We offer more than just a job - we provide a platform to shape the future of AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">World-Class Team</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work alongside industry experts and researchers from top universities and companies.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Competitive Package</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Excellent compensation, equity, benefits, and flexible work arrangements.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Impact & Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make a real impact on businesses worldwide while growing your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-roles" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find your next opportunity to make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {jobs.map((job, index) => {
              const isOpen = expandedIndex === index;
              return (
                <div key={index} className={`bg-white dark:bg-gray-900 rounded-2xl shadow border ${isOpen ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'}`}>
                  <button
                    onClick={() => setExpandedIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                        {job.icon}
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 mb-1">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{job.category}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <div className="mt-2 flex items-center flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="inline-flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                          <span className="inline-flex items-center"><Clock className="h-4 w-4 mr-1" />{job.type}</span>
                          <span className="inline-flex items-center"><DollarSign className="h-4 w-4 mr-1" />{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 mt-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h4>
                      <ul className="space-y-1 mb-6">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setValue('position', job.title);
                          setIsModalOpen(true);
                        }}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Apply for this role
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Didn't find a match CTA */}
          <div className="text-center mt-10">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Don't see a position that matches your skills?</p>
            <button
              onClick={() => {
                setValue('position', 'General Application');
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Your Resume
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Apply to VisionAI</h3>
                <p className="text-gray-600 dark:text-gray-300">Fill in your details and upload your resume.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            {submitSuccess ? (
              <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Application Submitted!</h4>
                <p className="text-green-700 dark:text-green-300">We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                    <input {...register('name', { required: 'Name is required' })} type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                    <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} type="email" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="your.email@example.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input {...register('phone')} type="tel" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position *</label>
                    <select {...register('position', { required: 'Position is required' })} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="">Select a position</option>
                      {jobs.map((job, index) => (
                        <option key={index} value={job.title}>{job.title}</option>
                      ))}
                      <option value="General Application">General Application</option>
                    </select>
                    {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume *</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="resume" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input id="resume" {...register('resume', { required: 'Resume is required' })} type="file" accept=".pdf,.doc,.docx" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                    {watch('resume') && watch('resume')[0] && (
                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Selected: {watch('resume')[0].name}</p>
                    )}
                  </div>
                  {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Letter / Message</label>
                  <textarea {...register('message')} rows={5} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Tell us why you're interested in joining VisionAI..." />
                </div>
                <div className="text-center">
                  <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;