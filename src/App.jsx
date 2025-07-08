import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import NeighborhoodPage from './pages/NeighborhoodPage';
import ResearchPage from './pages/ResearchPage';
import MethodologyPage from './pages/MethodologyPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/neighborhood/:id" element={<NeighborhoodPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;