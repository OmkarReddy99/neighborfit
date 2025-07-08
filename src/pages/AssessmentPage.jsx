import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    demographics: {
      age: '',
      income: '',
      familyStatus: '',
      workLocation: ''
    },
    preferences: {
      commutePriority: 5,
      walkabilityPriority: 5,
      nightlifePriority: 5,
      costOfLivingPriority: 5,
      safetyPriority: 5,
      schoolsPriority: 5,
      diningPriority: 5,
      outdoorsPriority: 5,
      culturePriority: 5,
      communityPriority: 5
    },
    lifestyle: {
      transportMode: '',
      socialPreference: '',
      housingType: '',
      priorities: []
    }
  });

  const steps = [
    { id: 1, title: 'Demographics', description: 'Basic information about you' },
    { id: 2, title: 'Preferences', description: 'Rate importance of factors' },
    { id: 3, title: 'Lifestyle', description: 'Your daily patterns and values' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Store assessment data and navigate to results
      localStorage.setItem('assessmentData', JSON.stringify(formData));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateDemographics = (field, value) => {
    setFormData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [field]: value
      }
    }));
  };

  const updatePreference = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const updateLifestyle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [field]: value
      }
    }));
  };

  const togglePriority = (priority) => {
    const currentPriorities = formData.lifestyle.priorities;
    const updatedPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];
    updateLifestyle('priorities', updatedPriorities);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return Object.values(formData.demographics).every(val => val !== '');
      case 2:
        return true; // Preferences have default values
      case 3:
        return formData.lifestyle.transportMode && formData.lifestyle.socialPreference && 
               formData.lifestyle.housingType && formData.lifestyle.priorities.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 text-slate-400'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <div className="ml-3 text-left">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px mx-6 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell us about yourself</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age Group</label>
                <select 
                  value={formData.demographics.age}
                  onChange={(e) => updateDemographics('age', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select age group</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Income Range</label>
                <select 
                  value={formData.demographics.income}
                  onChange={(e) => updateDemographics('income', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select income range</option>
                  <option value="<₹500k">Less than ₹5,00,000 </option>
                  <option value="₹500k-₹750k">₹5,00,000 - ₹7,50,000</option>
                  <option value="₹750k-₹1000k">₹7,50,000 - ₹10,00,000</option>
                  <option value="₹100k-₹1500k">₹10,00,000 - ₹15,00,000</option>
                  <option value="₹1500k+">₹15,00,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Family Status</label>
                <select 
                  value={formData.demographics.familyStatus}
                  onChange={(e) => updateDemographics('familyStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select family status</option>
                  <option value="single">Single</option>
                  <option value="couple">Couple (no children)</option>
                  <option value="young-family">Young family (children under 12)</option>
                  <option value="established-family">Established family (teenagers)</option>
                  <option value="empty-nesters">Empty nesters</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Work Location</label>
                <select 
                  value={formData.demographics.workLocation}
                  onChange={(e) => updateDemographics('workLocation', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select work arrangement</option>
                  <option value="downtown">Downtown/City Center</option>
                  <option value="suburban">Suburban Office Park</option>
                  <option value="remote">Remote/Work from Home</option>
                  <option value="hybrid">Hybrid (2-3 days in office)</option>
                  <option value="multiple">Multiple locations</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Rate your priorities</h2>
              <p className="text-slate-600 mb-8">
                How important are these factors to you? (1 = Not important, 10 = Very important)
              </p>

              {Object.entries(formData.preferences).map(([key, value]) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace('Priority', '').trim()}
                    </label>
                    <span className="text-lg font-semibold text-blue-600">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => updatePreference(key, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Not Important</span>
                    <span>Very Important</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your lifestyle preferences</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Transportation</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Car', 'Public Transit', 'Walking/Biking', 'Mixed'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => updateLifestyle('transportMode', mode)}
                      className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                        formData.lifestyle.transportMode === mode
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Social Preference</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Quiet & Private', 'Moderately Social', 'Very Social', 'Community Focused'].map(pref => (
                    <button
                      key={pref}
                      onClick={() => updateLifestyle('socialPreference', pref)}
                      className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                        formData.lifestyle.socialPreference === pref
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Housing Preference</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Apartment/Condo', 'Townhouse', 'Single Family Home', 'Any Type'].map(type => (
                    <button
                      key={type}
                      onClick={() => updateLifestyle('housingType', type)}
                      className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                        formData.lifestyle.housingType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Top Priorities (select up to 5)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Low Crime Rate', 'Good Schools', 'Short Commute', 'Walkable Streets',
                    'Parks & Recreation', 'Dining Options', 'Shopping Access', 'Cultural Activities',
                    'Nightlife', 'Family Friendly', 'Pet Friendly', 'Affordable Housing'
                  ].map(priority => (
                    <button
                      key={priority}
                      onClick={() => togglePriority(priority)}
                      disabled={!formData.lifestyle.priorities.includes(priority) && formData.lifestyle.priorities.length >= 5}
                      className={`p-3 text-sm text-left border rounded-lg transition-all duration-200 ${
                        formData.lifestyle.priorities.includes(priority)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Selected: {formData.lifestyle.priorities.length}/5
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <span className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </span>

            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {currentStep === 3 ? 'Get Results' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;