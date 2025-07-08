import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, TrendingUp, AlertCircle, ExternalLink } from 'lucide-react';
import { neighborhoods } from '../data/neighborhoods';
import { calculateNeighborhoodMatches } from '../utils/matchingAlgorithm';

const ResultsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessmentData = localStorage.getItem('assessmentData');
    if (assessmentData) {
      const data = JSON.parse(assessmentData);
      const results = calculateNeighborhoodMatches(data, neighborhoods);
      setMatches(results);
    }
    setLoading(false);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 70) return 'Good Match';
    if (score >= 60) return 'Fair Match';
    return 'Poor Match';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Calculating your neighborhood matches...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Assessment Found</h2>
          <p className="text-slate-600 mb-6">Please complete the assessment first.</p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Neighborhood Matches</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Based on your preferences and lifestyle, here are the neighborhoods that best match your needs.
            Scores are calculated using our proprietary algorithm that weighs multiple factors.
          </p>
        </div>

        {/* Top Match Highlight */}
        {matches.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">🏆 Your Best Match</h2>
                <p className="text-slate-600">This neighborhood aligns most closely with your preferences</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-2xl ${getScoreColor(matches[0].score)}`}>
                {matches[0].score}%
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src={matches[0].neighborhood.image}
                  alt={matches[0].neighborhood.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {matches[0].neighborhood.name}
                </h3>
                <p className="text-slate-600 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {matches[0].neighborhood.city}, {matches[0].neighborhood.state}
                </p>
                <p className="text-slate-700 mb-4">{matches[0].neighborhood.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Why it's a great match:</h4>
                  <ul className="space-y-1">
                    {matches[0].matchReasons.slice(0, 3).map((reason, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-start">
                        <Star className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/neighborhood/${matches[0].neighborhood.id}`}
                    className="inline-flex items-center mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Full Profile
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Neighborhood Matches</h2>
          
          {matches.map((match, index) => (
            <div key={match.neighborhood.id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl font-bold text-slate-400">#{index + 1}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {match.neighborhood.name}
                      </h3>
                      <p className="text-slate-600 flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {match.neighborhood.city}, {match.neighborhood.state}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(match.score)}`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {match.score}% - {getScoreLabel(match.score)}
                      </div>
                    </div>
                  </div>
                  
                  <img
                    src={match.neighborhood.image}
                    alt={match.neighborhood.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                <p className="text-slate-700 mb-4">{match.neighborhood.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Match Highlights
                    </h4>
                    <ul className="space-y-1">
                      {match.matchReasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-slate-600">• {reason}</li>
                      ))}
                    </ul>
                  </div>

                  {match.concerns.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Considerations
                      </h4>
                      <ul className="space-y-1">
                        {match.concerns.map((concern, idx) => (
                          <li key={idx} className="text-sm text-slate-600">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {match.neighborhood.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/neighborhood/${match.neighborhood.id}`}
                    className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-slate-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Want Different Results?</h2>
          <p className="text-slate-600 mb-6">
            Adjust your preferences or explore our research methodology to understand how we calculate matches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Retake Assessment
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;