import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Home, Car, Star, AlertCircle, TrendingUp } from 'lucide-react';
import { neighborhoods } from '../data/neighborhoods';

const NeighborhoodPage = () => {
  const { id } = useParams();
  const neighborhood = neighborhoods.find(n => n.id === id);

  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Neighborhood Not Found</h2>
          <p className="text-slate-600 mb-6">The neighborhood you're looking for doesn't exist.</p>
          <Link
            to="/results"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  const getMetricColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const metricLabels = {
    walkability: 'Walkability',
    safety: 'Safety',
    schools: 'Schools',
    dining: 'Dining',
    nightlife: 'Nightlife',
    outdoors: 'Outdoors',
    culture: 'Culture',
    community: 'Community',
    costOfLiving: 'Cost of Living',
    commute: 'Commute Access'
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/results"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={neighborhood.image}
              alt={neighborhood.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{neighborhood.name}</h1>
              <p className="text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {neighborhood.city}, {neighborhood.state}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Neighborhood</h2>
              <p className="text-slate-700 text-lg leading-relaxed">{neighborhood.description}</p>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Neighborhood Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(neighborhood.metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-700">
                      {metricLabels[key]}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getMetricColor(value)}`}
                          style={{ width: `${(value / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900 w-8">{value}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Highlights
                </h3>
                <ul className="space-y-2">
                  {neighborhood.highlights.map((highlight, index) => (
                    <li key={index} className="text-slate-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Challenges
                </h3>
                <ul className="space-y-2">
                  {neighborhood.challenges.map((challenge, index) => (
                    <li key={index} className="text-slate-700 flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {neighborhood.amenities.map((amenity, index) => (
                  <div key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium text-center">
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demographics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Demographics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Median Age</span>
                  <span className="font-semibold">{neighborhood.demographics.medianAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Median Income</span>
                  <span className="font-semibold">${neighborhood.demographics.medianIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Family Friendly</span>
                  <span className="font-semibold">{neighborhood.demographics.familyFriendly}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Diversity Index</span>
                  <span className="font-semibold">{neighborhood.demographics.diversity}/10</span>
                </div>
              </div>
            </div>

            {/* Housing */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Housing Types
              </h3>
              <div className="space-y-2">
                {neighborhood.housingTypes.map((type, index) => (
                  <div key={index} className="px-3 py-2 bg-slate-50 rounded-lg text-sm">
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Transportation
              </h3>
              <div className="space-y-2">
                {neighborhood.transportOptions.map((option, index) => (
                  <div key={index} className="px-3 py-2 bg-slate-50 rounded-lg text-sm">
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Interested in Living Here?
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Get personalized recommendations and compare with other neighborhoods.
              </p>
              <Link
                to="/assessment"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Find Similar Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodPage;