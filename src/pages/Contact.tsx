import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject,
          message: data.message,
        })
      });
      if (!res.ok) throw new Error('Failed to submit contact form');
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section - Fullscreen background video with overlay */}
      <section className="relative min-h-screen overflow-hidden">
        <video
          src="/contact.mov"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
          <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.22),transparent_60%)]"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center text-center min-h-screen px-4">
          <div className="max-w-3xl blog-hero-text slide-in-once slide-delay-200">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-6 heading-zoom">Get In Touch</h1>
            <p className="text-lg md:text-2xl text-emerald-100 leading-relaxed sub-wipe">
              Ready to transform your business with AI? Let's start a conversation about your goals and 
              how we can help you achieve them.
            </p>
            <div className="mt-8">
              <a href="#contact-form" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">Send a Message</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Let's Connect
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We're here to help you navigate your AI journey. Whether you have questions about our services, 
                want to discuss a specific project, or just want to learn more about how AI can benefit your business, 
                we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vision AI Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      305-0861, Ibaraki, Tsukuba, Yatabe 1077-58
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tel</h3>
                    <p className="text-gray-600 dark:text-gray-300">+81-50-8894-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">sales@visionai.jp</p>
                  </div>
                </div>
              </div>
              

            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 id="contact-form" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a message
                </h2>
                
                {submitSuccess ? (
                  <div className="text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      Thank you for contacting VisionAI. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        {...register('subject', { required: 'Subject is required' })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="consulting">AI Consulting Services</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tell us about your project or how we can help you..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section with Google Map */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Find Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Visit our office to discuss your AI initiatives in person. We're centrally located and easy to reach.
              </p>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Vision AI Location</div>
                    <div>305-0861, Ibaraki, Tsukuba, Yatabe 1077-58</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Hours</div>
                  <div>Mon–Fri: 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
                <div className="w-full h-[380px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                  <iframe
                    title="Vision AI Japan Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=305-0861%2C%20Ibaraki%2C%20Tsukuba%2C%20Yatabe%201077-58%2C%20Japan&output=embed"
                  />
                </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;