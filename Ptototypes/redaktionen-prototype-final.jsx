import React, { useState } from 'react';

const RedaktionenPrototypeFinal = () => {
  const [activeTheme, setActiveTheme] = useState('all');
  const [activeSection, setActiveSection] = useState('reports');
  const [darkMode, setDarkMode] = useState(false);

  const sections = {
    signals: {
      title: 'Signals',
      description: 'Raw intelligence from our Tipster agents. Continuous monitoring of news feeds, official publications, and specialized databases to identify emerging stories.',
    },
    summaries: {
      title: 'Summaries',
      description: 'Condensed briefings from Correspondent agents. Each summary synthesizes multiple signals, verifies facts across sources, and presents key information in structured format.',
    },
    reports: {
      title: 'Reports',
      description: 'In-depth analysis from Analyst and Editor agents. Reports combine summaries with context, historical background, pattern identification, and forward-looking assessments.',
    },
  };

  const themes = [
    { id: 'all', name: 'All', color: 'magenta' },
    { id: 'politics', name: 'Politics', color: 'red' },
    { id: 'economy', name: 'Economy', color: 'cyan' },
    { id: 'social', name: 'Society', color: 'blue' },
    { id: 'tech', name: 'Technology', color: 'violet' },
    { id: 'ecology', name: 'Climate', color: 'green' },
    { id: 'law', name: 'Legal', color: 'amber' },
  ];

  const content = {
    signals: [
      {
        id: 1,
        theme: 'tech',
        title: 'Reuters: EU Commission draft on AI transparency leaked',
        summary: 'Internal document suggests mandatory disclosure requirements for AI-generated content in media.',
        time: '14 min ago',
        source: 'Reuters',
      },
      {
        id: 2,
        theme: 'economy',
        title: 'Fed Chair Powell signals potential rate discussion',
        summary: 'Speaking at Jackson Hole, mentioned reviewing current monetary stance.',
        time: '23 min ago',
        source: 'Bloomberg',
      },
      {
        id: 3,
        theme: 'ecology',
        title: 'NOAA releases November Arctic measurement data',
        summary: 'Sea ice extent 12% below 1981-2010 average for this date.',
        time: '45 min ago',
        source: 'NOAA',
      },
      {
        id: 4,
        theme: 'politics',
        title: 'German coalition talks enter third round',
        summary: 'SPD and Greens remain apart on fiscal policy framework.',
        time: '1h ago',
        source: 'DW',
      },
      {
        id: 5,
        theme: 'law',
        title: 'ECHR announces ruling date for surveillance case',
        summary: 'Decision on Big Brother Watch v. UK expected December 15.',
        time: '2h ago',
        source: 'ECHR Press',
      },
      {
        id: 6,
        theme: 'social',
        title: 'UNHCR updates Mediterranean crossing statistics',
        summary: 'Q3 data shows shift in primary routes from Libya to Tunisia.',
        time: '3h ago',
        source: 'UNHCR',
      },
    ],
    summaries: [
      {
        id: 1,
        theme: 'tech',
        title: 'EU AI Transparency Framework Takes Shape',
        summary: 'Multiple signals indicate the European Commission is finalizing comprehensive disclosure requirements for AI systems used in media and public communications.',
        signals: 8,
        time: '1h ago',
      },
      {
        id: 2,
        theme: 'economy',
        title: 'Central Bank Coordination Discussions Intensify',
        summary: 'G7 monetary authorities increasingly aligned on need for coordinated approach to rate adjustments. December meetings may produce joint framework.',
        signals: 12,
        time: '2h ago',
      },
      {
        id: 3,
        theme: 'politics',
        title: 'German Coalition Negotiations: Current State',
        summary: 'Third round of talks focusing on fiscal policy disagreements. Climate spending and debt brake reform remain key sticking points.',
        signals: 15,
        time: '3h ago',
      },
      {
        id: 4,
        theme: 'ecology',
        title: 'Arctic Conditions: November Assessment',
        summary: 'Latest satellite data confirms continued decline in sea ice extent. Scientists note acceleration in seasonal melt patterns compared to previous decade.',
        signals: 6,
        time: '4h ago',
      },
      {
        id: 5,
        theme: 'law',
        title: 'Digital Privacy Litigation: European Overview',
        summary: 'Pending ECHR ruling expected to establish new standards for governmental surveillance across EU member states.',
        signals: 5,
        time: '5h ago',
      },
      {
        id: 6,
        theme: 'social',
        title: 'Mediterranean Migration: Q3 Patterns',
        summary: 'UNHCR quarterly data reveals significant route changes. Tunisian departure points now account for majority of crossings.',
        signals: 9,
        time: '6h ago',
      },
    ],
    reports: [
      {
        id: 1,
        theme: 'tech',
        title: 'EU Prepares New Transparency Requirements for AI Systems',
        summary: 'The European Commission is developing additional oversight mechanisms for generative AI use in media and public sector applications.',
        signals: 12,
        sources: 8,
        time: '2h ago',
        confidence: 94,
      },
      {
        id: 2,
        theme: 'economy',
        title: 'G7 Central Banks Discuss Rate Coordination',
        summary: 'Amid slowing inflation, regulators consider synchronizing monetary policy to prevent currency imbalances. The discussions involve complex negotiations between multiple stakeholders.',
        signals: 18,
        sources: 14,
        time: '3h ago',
        confidence: 87,
      },
      {
        id: 3,
        theme: 'politics',
        title: 'Bundestag Elections: Coalition Scenarios',
        summary: 'Analysts model possible government configurations based on current polls and historical patterns.',
        signals: 24,
        sources: 11,
        time: '4h ago',
        confidence: 82,
      },
      {
        id: 4,
        theme: 'ecology',
        title: 'Arctic Ice: November Data Analysis',
        summary: 'Satellite measurements show deviation from average values. Scientists analyze impact on global climate models and potential consequences for coastal regions worldwide.',
        signals: 9,
        sources: 6,
        time: '5h ago',
        confidence: 91,
      },
      {
        id: 5,
        theme: 'social',
        title: 'Mediterranean Migration Flows Update',
        summary: 'UNHCR publishes quarterly statistics noting changes in routes and demographic composition.',
        signals: 15,
        sources: 9,
        time: '6h ago',
        confidence: 88,
      },
      {
        id: 6,
        theme: 'law',
        title: 'ECHR Sets Digital Privacy Precedent',
        summary: 'Court ruling on mass surveillance case may influence legislation across Council of Europe member states. Legal experts anticipate significant changes to national data protection frameworks.',
        signals: 7,
        sources: 5,
        time: '7h ago',
        confidence: 96,
      },
    ],
  };

  const getThemeColor = (themeId) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return 'gray';
    return theme.color;
  };

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      red: { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50', border: 'border-red-200' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50', border: 'border-blue-200' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-500', light: 'bg-violet-50', border: 'border-violet-200' },
      green: { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50', border: 'border-green-200' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50', border: 'border-amber-200' },
      gray: { bg: 'bg-gray-500', text: 'text-gray-500', light: 'bg-gray-50', border: 'border-gray-200' },
      magenta: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', light: 'bg-fuchsia-50', border: 'border-fuchsia-200' },
    };
    return colors[color]?.[type] || colors.gray[type];
  };

  const currentContent = content[activeSection];
  const filteredContent = activeTheme === 'all' 
    ? currentContent 
    : currentContent.filter(item => item.theme === activeTheme);

  const leftColumn = filteredContent.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredContent.filter((_, i) => i % 2 === 1);

  const PlaceholderSVG = () => {
    return (
      <svg 
        viewBox="0 0 400 180" 
        className="w-full h-auto rounded-lg mb-4"
      >
        <rect width="400" height="180" fill={darkMode ? '#1F2937' : '#F3F4F6'} />
        <rect x="20" y="20" width="70" height="70" rx="8" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="110" y="25" width="200" height="8" rx="4" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="110" y="45" width="160" height="8" rx="4" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="110" y="65" width="120" height="8" rx="4" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="20" y="110" width="360" height="6" rx="3" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="20" y="130" width="300" height="6" rx="3" fill={darkMode ? '#374151' : '#E5E7EB'} />
        <rect x="20" y="150" width="200" height="6" rx="3" fill={darkMode ? '#374151' : '#E5E7EB'} />
      </svg>
    );
  };

  const ContentCard = ({ item }) => {
    const color = getThemeColor(item.theme);
    const themeName = themes.find(t => t.id === item.theme)?.name;
    
    return (
      <article 
        className={`${darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'} 
          border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg mb-5`}
      >
        {/* SVG Placeholder Image */}
        <PlaceholderSVG />
        
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2 h-2 rounded-full ${getColorClasses(color, 'bg')}`}></span>
          <span className={`text-xs font-medium ${getColorClasses(color, 'text')}`}>
            {themeName}
          </span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} ml-auto`}>
            {item.time}
          </span>
        </div>
        
        <h3 className={`text-base font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {item.title}
        </h3>
        
        <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.summary}
        </p>
        
        <div className={`flex items-center gap-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {item.source && <span>{item.source}</span>}
          {item.signals && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {item.signals} signals
            </span>
          )}
          {item.sources && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {item.sources} sources
            </span>
          )}
          {item.confidence && (
            <span className={`flex items-center gap-1 ml-auto px-2 py-0.5 rounded ${
              item.confidence >= 90 
                ? darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                : item.confidence >= 80
                ? darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600'
                : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              {item.confidence}%
            </span>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
              >
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Redaktionen</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                beta
              </span>
            </div>
            <div className="flex items-center gap-6">
              {/* Section Tabs with underline */}
              <nav className="flex items-center gap-6 text-sm">
                {Object.keys(sections).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`relative pb-1 transition-colors ${
                      activeSection === key 
                        ? darkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {sections[key].title}
                    {activeSection === key && (
                      <span 
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
                      />
                    )}
                  </button>
                ))}
              </nav>
              
              <div className="flex items-center gap-4">
                <button className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Sign In
                </button>
                <button 
                  className="text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
                >
                  Subscribe
                </button>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {darkMode ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title & Explanation */}
      <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className={`text-3xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {sections[activeSection].title}
          </h1>
          <p className={`text-sm leading-relaxed max-w-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {sections[activeSection].description}
          </p>
        </div>
      </div>

      {/* Theme filters */}
      <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-[73px] z-10`}>
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${activeTheme === theme.id 
                    ? 'text-white' 
                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}
                style={activeTheme === theme.id ? {
                  background: theme.id === 'all' 
                    ? 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
                    : undefined,
                  backgroundColor: theme.id !== 'all' ? {
                    red: '#EF4444',
                    cyan: '#0891B2',
                    blue: '#3B82F6',
                    violet: '#8B5CF6',
                    green: '#22C55E',
                    amber: '#F59E0B',
                  }[theme.color] : undefined
                } : {}}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Masonry Grid */}
        <div className="flex gap-6">
          <div className="flex-1">
            {leftColumn.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex-1">
            {rightColumn.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          <button className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
            ${darkMode 
              ? 'border border-gray-700 text-gray-300 hover:bg-gray-800' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Load more
          </button>
        </div>
      </main>

      {/* Compact Dark Footer */}
      <footer className="bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)' }}
              >
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <span className="text-sm text-gray-400">© 2024 Redaktionen</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RedaktionenPrototypeFinal;
