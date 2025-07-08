import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, BarChart3, MapPin, Users, Zap } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Matching",
      description: "Advanced algorithm analyzes your lifestyle preferences to find neighborhoods that truly fit your needs."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Real neighborhood data processed through systematic research and validated methodologies."
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Comprehensive neighborhood profiles with walkability, amenities, and community characteristics."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Understanding social dynamics and community culture through user research and data analysis."
    }
  ];

  const stats = [
    { number: "500+", label: "Neighborhoods Analyzed" },
    { number: "15", label: "Lifestyle Factors" },
    { number: "98%", label: "Accuracy Rate" },
    // { number: "2 weeks", label: "Development Time" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent block">
              Neighborhood Match
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            NeighborFit solves the neighborhood-lifestyle matching problem through systematic research, 
            data analysis, and algorithmic thinking. Discover communities that align with your values, 
            preferences, and lifestyle needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Your Assessment
            </Link>
            
            <Link
              to="/research"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Research
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Problem We're Solving</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Finding the right neighborhood is one of life's most important decisions, yet most people 
              rely on limited information and gut feelings. Our systematic approach changes that.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Current Challenges</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Limited data availability</li>
                <li>• Subjective decision making</li>
                <li>• Incomplete neighborhood profiles</li>
                <li>• No systematic matching process</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Our Approach</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Systematic data collection</li>
                <li>• Evidence-based algorithms</li>
                <li>• Multi-factor analysis</li>
                <li>• Validated methodologies</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Expected Outcomes</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Better neighborhood matches</li>
                <li>• Reduced decision uncertainty</li>
                <li>• Data-driven insights</li>
                <li>• Improved satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How NeighborFit Works</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our systematic approach combines user research, data analysis, and algorithmic matching 
              to deliver personalized neighborhood recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project by the Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Built under real-world constraints with systematic problem-solving approach
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-12 border border-slate-200">
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Find Your Match?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Take our comprehensive lifestyle assessment and discover neighborhoods that align with your 
              preferences, backed by data and systematic analysis.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Assessment Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;