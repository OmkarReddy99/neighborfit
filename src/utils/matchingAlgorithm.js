export function calculateNeighborhoodMatches(assessmentData, neighborhoods) {
  const results = neighborhoods.map(neighborhood => {
    const match = calculateMatch(assessmentData, neighborhood);
    return match;
  });

  return results.sort((a, b) => b.score - a.score);
}

function calculateMatch(assessmentData, neighborhood) {
  const weights = calculateWeights(assessmentData);
  const breakdown = {};
  let totalScore = 0;
  let maxPossibleScore = 0;

  // Calculate scores for each factor
  Object.entries(weights).forEach(([factor, weight]) => {
    const metricKey = mapToMetricKey(factor);
    const neighborhoodScore = neighborhood.metrics[metricKey] || 5;
    const normalizedScore = neighborhoodScore / 10; // Normalize to 0-1
    const contribution = normalizedScore * weight;
    
    breakdown[factor] = {
      score: neighborhoodScore,
      weight: weight,
      contribution: contribution
    };
    
    totalScore += contribution;
    maxPossibleScore += weight;
  });

  // Demographic adjustments
  const demographicAdjustment = calculateDemographicFit(assessmentData, neighborhood);
  totalScore += demographicAdjustment;
  maxPossibleScore += 10; // Max demographic bonus

  // Lifestyle compatibility
  const lifestyleAdjustment = calculateLifestyleFit(assessmentData, neighborhood);
  totalScore += lifestyleAdjustment;
  maxPossibleScore += 15; // Max lifestyle bonus

  const finalScore = Math.round((totalScore / maxPossibleScore) * 100);
  const matchReasons = generateMatchReasons(assessmentData, neighborhood, breakdown);
  const concerns = generateConcerns(assessmentData, neighborhood, breakdown);

  return {
    neighborhood,
    score: finalScore,
    matchReasons,
    concerns,
    breakdown
  };
}

function calculateWeights(assessmentData) {
  const baseWeights = {
    commute: assessmentData.preferences.commutePriority || 5,
    walkability: assessmentData.preferences.walkabilityPriority || 5,
    nightlife: assessmentData.preferences.nightlifePriority || 5,
    costOfLiving: assessmentData.preferences.costOfLivingPriority || 5,
    safety: assessmentData.preferences.safetyPriority || 5,
    schools: assessmentData.preferences.schoolsPriority || 5,
    dining: assessmentData.preferences.diningPriority || 5,
    outdoors: assessmentData.preferences.outdoorsPriority || 5,
    culture: assessmentData.preferences.culturePriority || 5,
    community: assessmentData.preferences.communityPriority || 5
  };

  // Adjust weights based on demographics
  if (assessmentData.demographics.familyStatus.includes('family')) {
    baseWeights.schools *= 1.5;
    baseWeights.safety *= 1.3;
    baseWeights.community *= 1.2;
    baseWeights.nightlife *= 0.7;
  }

  if (assessmentData.demographics.age === '18-25') {
    baseWeights.nightlife *= 1.3;
    baseWeights.culture *= 1.2;
    baseWeights.costOfLiving *= 1.4;
  }

  if (assessmentData.demographics.age === '55+') {
    baseWeights.safety *= 1.3;
    baseWeights.community *= 1.2;
    baseWeights.walkability *= 1.2;
    baseWeights.nightlife *= 0.6;
  }

  return baseWeights;
}

function mapToMetricKey(factor) {
  const mapping = {
    commute: 'commute',
    walkability: 'walkability',
    nightlife: 'nightlife',
    costOfLiving: 'costOfLiving',
    safety: 'safety',
    schools: 'schools',
    dining: 'dining',
    outdoors: 'outdoors',
    culture: 'culture',
    community: 'community'
  };
  return mapping[factor] || factor;
}

function calculateDemographicFit(assessmentData, neighborhood) {
  let bonus = 0;

  // Age compatibility
  const userAgeGroup = assessmentData.demographics.age;
  const neighborhoodMedianAge = neighborhood.demographics.medianAge;
  
  if (userAgeGroup === '18-25' && neighborhoodMedianAge < 35) bonus += 2;
  if (userAgeGroup === '26-35' && neighborhoodMedianAge >= 30 && neighborhoodMedianAge <= 40) bonus += 3;
  if (userAgeGroup === '36-45' && neighborhoodMedianAge >= 35 && neighborhoodMedianAge <= 45) bonus += 3;
  if (userAgeGroup === '55+' && neighborhoodMedianAge >= 45) bonus += 2;

  // Income compatibility
  const incomeRanges = {
    '<50k': [0, 50000],
    '50k-75k': [50000, 75000],
    '75k-100k': [75000, 100000],
    '100k-150k': [100000, 150000],
    '150k+': [150000, Infinity]
  };

  const userIncomeRange = incomeRanges[assessmentData.demographics.income];
  if (userIncomeRange) {
    const neighborhoodIncome = neighborhood.demographics.medianIncome;
    if (neighborhoodIncome >= userIncomeRange[0] * 0.8 && neighborhoodIncome <= userIncomeRange[1] * 1.5) {
      bonus += 3;
    }
  }

  // Family compatibility
  if (assessmentData.demographics.familyStatus.includes('family')) {
    bonus += neighborhood.demographics.familyFriendly;
  }

  return Math.min(bonus, 10); // Cap at 10 points
}

function calculateLifestyleFit(assessmentData, neighborhood) {
  let bonus = 0;

  // Transport mode compatibility
  const transportMode = assessmentData.lifestyle.transportMode;
  if (transportMode === 'Walking/Biking' && neighborhood.metrics.walkability >= 8) bonus += 3;
  if (transportMode === 'Public Transit' && neighborhood.transportOptions.some(t => t.includes('Rail') || t.includes('Bus'))) bonus += 3;
  if (transportMode === 'Car' && neighborhood.transportOptions.includes('Car')) bonus += 2;

  // Social preference alignment
  const socialPref = assessmentData.lifestyle.socialPreference;
  if (socialPref === 'Very Social' && neighborhood.metrics.nightlife >= 7) bonus += 2;
  if (socialPref === 'Community Focused' && neighborhood.metrics.community >= 8) bonus += 3;
  if (socialPref === 'Quiet & Private' && neighborhood.metrics.nightlife <= 6) bonus += 2;

  // Priority alignment
  const priorities = assessmentData.lifestyle.priorities;
  priorities.forEach(priority => {
    switch (priority) {
      case 'Low Crime Rate':
        if (neighborhood.metrics.safety >= 8) bonus += 1;
        break;
      case 'Good Schools':
        if (neighborhood.metrics.schools >= 7) bonus += 1;
        break;
      case 'Walkable Streets':
        if (neighborhood.metrics.walkability >= 8) bonus += 1;
        break;
      case 'Parks & Recreation':
        if (neighborhood.metrics.outdoors >= 7) bonus += 1;
        break;
      case 'Dining Options':
        if (neighborhood.metrics.dining >= 7) bonus += 1;
        break;
    }
  });

  return Math.min(bonus, 15); // Cap at 15 points
}

function generateMatchReasons(assessmentData, neighborhood, breakdown) {
  const reasons = [];

  // High-scoring factors
  Object.entries(breakdown).forEach(([factor, data]) => {
    if (data.score >= 8 && data.weight >= 7) {
      reasons.push(`Excellent ${factor.toLowerCase()} score (${data.score}/10) matches your high priority`);
    }
  });

  // Specific lifestyle matches
  if (assessmentData.lifestyle.transportMode === 'Walking/Biking' && neighborhood.metrics.walkability >= 8) {
    reasons.push('High walkability perfect for your preferred transportation');
  }

  if (assessmentData.demographics.familyStatus.includes('family') && neighborhood.demographics.familyFriendly >= 8) {
    reasons.push('Family-friendly environment ideal for your household');
  }

  // Unique neighborhood features
  if (neighborhood.highlights.length > 0) {
    reasons.push(`Notable features: ${neighborhood.highlights[0]}`);
  }

  return reasons.slice(0, 4); // Limit to top 4 reasons
}

function generateConcerns(assessmentData, neighborhood, breakdown) {
  const concerns = [];

  // Low-scoring high priority factors
  Object.entries(breakdown).forEach(([factor, data]) => {
    if (data.score <= 5 && data.weight >= 8) {
      concerns.push(`Lower ${factor.toLowerCase()} score (${data.score}/10) despite high importance to you`);
    }
  });

  // Known challenges
  if (neighborhood.challenges.length > 0) {
    concerns.push(...neighborhood.challenges.slice(0, 2));
  }

  // Demographic mismatches
  if (assessmentData.demographics.familyStatus.includes('family') && neighborhood.demographics.familyFriendly <= 5) {
    concerns.push('Limited family-friendly amenities');
  }

  return concerns.slice(0, 3); // Limit to top 3 concerns
}