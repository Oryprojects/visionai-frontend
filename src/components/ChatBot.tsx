import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronRight, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    options?: { label: string; action: string }[];
}

interface Job {
    _id: string;
    role: string;
    location: string;
    type: string;
    department: string;
    salary: string;
    status: string;
}

interface AboutData {
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
}

interface ChatBotProps {
    onNavigate: (page: string) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch current jobs and about data when component mounts
    useEffect(() => {
        fetchCurrentJobs();
        fetchAboutData();
    }, []);

    const fetchCurrentJobs = async () => {
        try {
            const response = await fetch('/api/jobs?status=OPEN');
            if (response.ok) {
                const data = await response.json();
                setJobs(data.slice(0, 3)); // Show only first 3 jobs to keep chat concise
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchAboutData = async () => {
        try {
            const response = await fetch('/api/about');
            if (response.ok) {
                const data = await response.json();
                setAboutData(data);
            }
        } catch (error) {
            console.error('Error fetching about data:', error);
        }
    };

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    sender: 'bot',
                    text: 'Hello 👋\nWelcome to VisionAI.\nHow can I help you today?',
                    options: [
                        { label: 'Our Services', action: 'services' },
                        { label: 'Contact Us', action: 'contact' },
                        { label: 'Careers', action: 'careers' },
                        { label: 'About VisionAI', action: 'about' }
                    ]
                }
            ]);
        }
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: text
        };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const response = generateResponse(text);
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 1000);
    };

    const handleOptionClick = (action: string, label: string) => {
        // Add user selection as message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: label
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            let response: ChatMessage;

            switch (action) {
                case 'services':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Here are our key AI services:\n\n• End-to-End Solution Implementation\n• AI-Powered Business Intelligence\n• Agentic AI Systems\n• Data-Driven Analytics\n• BOT Setup (Build-Operate-Transfer)\n• Legacy to Future Transformation\n\nWould you like more details on a specific service, navigate to the services page?',
                        options: [
                            // { label: 'AI Business Intelligence', action: 'service_bi' },
                            // { label: 'Agentic AI Systems', action: 'service_agentic' },
                            // { label: 'Data Analytics', action: 'service_analytics' },
                            { label: 'Go to Services Page', action: 'navigate_services' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'contact':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: '📍 VisionAI Location\n305-0861, Ibaraki, Tsukuba, Yatabe 1077-58\n\n📞 Telephone\n+81-50-8894-4567\n\n📧 Email\nsales@visionai.jp\n\nWould you like to navigate to our contact page?',
                        options: [
                            { label: 'Go to Contact Page', action: 'navigate_contact' },
                            //{ label: 'Send a Message', action: 'contact_form' }, // Placeholder for future interactivity
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'careers':
                    const jobsList = jobs.length > 0 
                        ? jobs.map(job => `• ${job.role} - ${job.location} (${job.type})`).join('\n')
                        : 'No current openings available';
                    
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: `We are always looking for top talent! Here are our current openings:\n\n${jobsList}\n\nWould you like to navigate to our careers page?`,
                        options: [
                            { label: 'Go to Careers Page', action: 'navigate_career' },
                           // { label: 'View Openings', action: 'career_openings' }, // Placeholder
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'about':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: aboutData?.companyInfo 
                            ? `VisionAI is ${aboutData.companyInfo.description.toLowerCase()}\n\nWould you like to learn more about us?`
                            : 'VisionAI is a leading AI solutions provider specializing in cutting-edge artificial intelligence and machine learning technologies. Would you like to learn more about us?',
                        options: [
                            { label: 'Go to About Page', action: 'navigate_about' },
                            { label: 'Our Mission', action: 'about_mission' },
                            { label: 'Our Vision', action: 'about_vision' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'about_mission':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: aboutData?.companyInfo?.mission 
                            ? `Our Mission:\n\n${aboutData.companyInfo.mission}\n\nWould you like to know more?`
                            : 'Our mission focuses on delivering cutting-edge AI solutions that drive business success and innovation.',
                        options: [
                            { label: 'Our Vision', action: 'about_vision' },
                            { label: 'Go to About Page', action: 'navigate_about' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'about_vision':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: aboutData?.companyInfo?.vision 
                            ? `Our Vision:\n\n${aboutData.companyInfo.vision}\n\nWould you like to know more?`
                            : 'Our vision is to create a future where AI seamlessly integrates into every aspect of business operations, driving unprecedented efficiency and growth.',
                        options: [
                            { label: 'Our Mission', action: 'about_mission' },
                            { label: 'Go to About Page', action: 'navigate_about' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'navigate_services':
                    onNavigate('services');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Navigating to Services page...',
                        options: [
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'navigate_contact':
                    onNavigate('contact');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Navigating to Contact page...',
                        options: [
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'navigate_career':
                    onNavigate('careers');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Navigating to Careers page...',
                        options: [
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'navigate_about':
                    onNavigate('about');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Navigating to About page...',
                        options: [
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'menu':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'How else can I assist you?',
                        options: [
                            { label: 'Our Services', action: 'services' },
                            { label: 'Contact Us', action: 'contact' },
                            { label: 'Careers', action: 'careers' },
                            { label: 'About VisionAI', action: 'about' }
                        ]
                    };
                    break;
                default:
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'I can help you navigate our site. Please choose an option below.',
                        options: [
                            { label: 'Our Services', action: 'services' },
                            { label: 'Contact Us', action: 'contact' },
                            { label: 'Careers', action: 'careers' },
                            { label: 'About VisionAI', action: 'about' }
                        ]
                    };
            }
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 800);
    };

    const generateResponse = (input: string): ChatMessage => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('service') || lowerInput.includes('offer')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'We offer comprehensive AI solutions from business intelligence to agentic AI systems. Would you like to see the full list?',
                options: [{ label: 'View Services', action: 'services' }]
            };
        }
        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'You can find our contact details and a form on the Contact page.',
                options: [{ label: 'Go to Contact', action: 'contact' }]
            };
        }
        if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('work') || lowerInput.includes('hiring')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'Yes, we are hiring! Please check our Careers page for open positions.',
                options: [{ label: 'View Careers', action: 'careers' }]
            };
        }
        if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('company')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'VisionAI is a leading AI solutions provider specializing in cutting-edge artificial intelligence and machine learning technologies.',
                options: [{ label: 'Learn More', action: 'about' }]
            };
        }

        return {
            id: Date.now().toString(),
            sender: 'bot',
            text: "I'm an AI assistant for VisionAI. How can I help you navigate our site?",
            options: [
                { label: 'Our Services', action: 'services' },
                { label: 'Contact Us', action: 'contact' },
                { label: 'Careers', action: 'careers' },
                { label: 'About VisionAI', action: 'about' }
            ]
        };
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-2 sm:p-2.5 md:p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                ) : (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full overflow-hidden relative">
                        <BackgroundVideo
                            src="/aibot.mp4"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[85vw] sm:w-[90vw] md:w-[380px] h-[60vh] sm:h-[70vh] max-h-[500px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right sm:origin-bottom sm:origin-right transform ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3 shadow-md">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative overflow-hidden">
                        <BackgroundVideo
                            src="/aibot.mp4"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-blue-600 rounded-full z-10"></span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">VisionAI Assistant</h3>
                        <p className="text-blue-200 text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-900/40 custom-scrollbar">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                                } mb-3 sm:mb-4`}
                        >
                            <div
                                className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.sender === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>

                            {/* Quick Options */}
                            {msg.options && (
                                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3 max-w-[90%] sm:max-w-[85%]">
                                    {msg.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(opt.action, opt.label)}
                                            className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 border border-white/20 rounded-full text-xs sm:text-xs text-white transition-colors flex items-center gap-1 text-xs sm:text-xs"
                                        >
                                            {opt.label} <ChevronRight className="w-3 h-3 sm:w-3 sm:h-3" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start mb-3 sm:mb-4">
                            <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-none text-gray-800 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 sm:p-4 bg-white/10 border-t border-white/20 backdrop-blur-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(inputText);
                        }}
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/90 border border-gray-300 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm sm:text-base"
                            style={{ 
                                color: 'black',
                                WebkitTextFillColor: 'black',
                                WebkitAppearance: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
