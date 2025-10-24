import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: 'The Future of AI in Business: Trends to Watch in 2024',
      excerpt: 'Explore the latest AI trends that will reshape industries and create new opportunities for businesses worldwide.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI Trends',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      title: 'Implementing AI Ethics: A Practical Guide for Businesses',
      excerpt: 'Learn how to build ethical AI systems that protect user privacy while delivering maximum business value.',
      author: 'Michael Chen',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'AI Ethics',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      title: 'ROI of AI: Measuring Success in Digital Transformation',
      excerpt: 'Discover key metrics and strategies to measure the return on investment of your AI initiatives.',
      author: 'Emma Davis',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Business Strategy',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      title: 'Machine Learning vs Deep Learning: Which is Right for You?',
      excerpt: 'A comprehensive comparison of ML and DL approaches to help you choose the best solution for your business.',
      author: 'David Wilson',
      date: '2024-01-01',
      readTime: '12 min read',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      title: 'AI in Healthcare: Transforming Patient Care',
      excerpt: 'How artificial intelligence is revolutionizing healthcare delivery and improving patient outcomes.',
      author: 'Dr. Lisa Rodriguez',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Healthcare',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      title: 'Building Your First AI Model: A Step-by-Step Guide',
      excerpt: 'A beginner-friendly guide to creating your first machine learning model from data preparation to deployment.',
      author: 'Alex Thompson',
      date: '2023-12-25',
      readTime: '15 min read',
      category: 'Tutorial',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const categories = ['All', 'AI Trends', 'AI Ethics', 'Business Strategy', 'Technology', 'Healthcare', 'Tutorial'];

  const heroVideos = ['/blog.mov'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroVideos.length]);

  // mouse cursor tracking removed (unused)

  return (
    <div>
      {/* Hero Section - Fullscreen background video with clean overlay */}
  <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroVideos.map((src, idx) => (
            <video
              key={src}
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
            <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.25),transparent_60%)]"></div>
          </div>

          {/* Content overlay - plain text with glow, centered */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4" style={{ zIndex: 10 }}>
            <div className="max-w-3xl blog-hero-text slide-in-once slide-delay-200" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-300 to-blue-300 mb-4 heading-zoom">AI Insights</h1>
              <p className="text-lg md:text-2xl text-purple-100 leading-relaxed sub-wipe">
                Stay ahead of the curve with expert insights, trends, and practical advice on
                artificial intelligence and business transformation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#latest" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">Read Latest</a>
                <a href="/contact" className="inline-flex items-center px-6 py-3 glass text-white rounded-lg hover:bg-white/20 transition-colors">Talk to Experts</a>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 12 }}>
            {heroVideos.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${idx === current ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Title & Intro removed, now overlaid on hero */}

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-400"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Featured Post
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {posts[0].title}
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 text-blue-100 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {posts[0].author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(posts[0].date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {posts[0].readTime}
                </div>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
                Read More
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Expert insights and practical advice from our AI specialists.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for the latest AI insights and industry updates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;