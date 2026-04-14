import React, { useState, useEffect, useRef } from 'react';
import { Home, Gamepad2, LayoutGrid, Music, Settings, Search, X, MonitorPlay, ExternalLink, Film } from 'lucide-react';
import gamesData from './data/games.json';

// Moving pink dots background
const DotsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.4)'; // Pink-500 with opacity

      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 bg-[#1a0510]" />;
};

const appsData = [
  { id: 'tiktok', title: 'TikTok', url: 'https://www.tiktok.com/embed' },
  { id: 'ig', title: 'Instagram', url: 'https://www.instagram.com/' },
  { id: 'discord', title: 'Discord', url: 'https://discord.com/app' },
  { id: 'twitch', title: 'Twitch', url: 'https://m.twitch.tv/' },
  { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com/' },
  { id: 'reddit', title: 'Reddit', url: 'https://www.reddit.com/' }
];

const theatreData = [
  { id: 'pluto', title: 'Pluto.tv', url: 'https://pluto.tv/' },
  { id: 'flixhq', title: 'FlixHQ', url: 'https://flixhq.to/' },
  { id: 'sflix', title: 'SFlix', url: 'https://sflix.to/' },
  { id: 'goku', title: 'Goku.to', url: 'https://goku.sx/' },
  { id: 'fmovies', title: 'FMovies', url: 'https://fmovies.llc/' },
  { id: 'hurawatch', title: 'HuraWatch', url: 'https://hurawatch.bz/' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentUrl, setCurrentUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect for the title
  useEffect(() => {
    if (isLoading) return;
    const fullText = "Shack Hub";
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedTitle(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, [isLoading]);

  // Subtitle blur sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  // Settings state
  const [panicKey, setPanicKey] = useState(localStorage.getItem('panicKey') || 'q');
  const [panicUrl, setPanicUrl] = useState(localStorage.getItem('panicUrl') || 'https://classroom.google.com');

  // Save settings
  const saveSettings = () => {
    localStorage.setItem('panicKey', panicKey);
    localStorage.setItem('panicUrl', panicUrl);
    alert('Settings saved successfully!');
  };

  // Panic key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key.toLowerCase() === panicKey.toLowerCase()) {
        window.location.href = panicUrl;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey, panicUrl]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setCurrentUrl(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&igu=1`);
      setActiveTab('proxy');
    }
  };

  // Helper to get high-res favicon
  const getFavicon = (url: string) => `https://www.google.com/s2/favicons?domain=${url}&sz=128`;

  return (
    <div className="min-h-screen text-pink-100 font-sans relative flex flex-col items-center justify-center overflow-hidden selection:bg-pink-500/30 selection:text-pink-100">
      <DotsBackground />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a0510] transition-opacity duration-500">
          <Gamepad2 className="w-20 h-20 text-pink-500 animate-bounce mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
          <h1 className="text-4xl font-extrabold text-pink-400 animate-pulse tracking-widest">LOADING...</h1>
        </div>
      )}

      {/* Notification Toast */}
      <div className={`fixed top-6 right-6 z-50 bg-pink-600/90 backdrop-blur-md border border-pink-400 text-white px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.6)] transform transition-all duration-500 flex items-center gap-3 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}>
        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        <p className="font-bold text-lg">Welcome! Cool Right?</p>
      </div>

      {/* Main Content */}
      <main className={`z-10 flex flex-col items-center w-full max-w-5xl px-4 transition-all duration-500 ${activeTab !== 'home' ? 'mt-8 mb-32 justify-start h-full' : 'justify-center'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-pink-400 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] mb-2 flex items-center justify-center min-h-[72px] md:min-h-[88px]">
            {typedTitle}
            <span className="animate-pulse font-light ml-1 -mt-2">|</span>
          </h1>
          <div className="relative h-6 flex items-center justify-center w-full">
            <p className={`absolute text-pink-300/80 font-medium tracking-widest uppercase text-sm transition-all duration-1000 ${subtitleIndex === 0 ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-md scale-105'}`}>
              Finally its made
            </p>
            <p className={`absolute text-pink-300/80 font-medium tracking-widest uppercase text-sm transition-all duration-1000 ${subtitleIndex === 1 ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-md scale-105'}`}>
              Home of the patriots
            </p>
          </div>
        </div>

        {/* Content Area based on activeTab */}
        {activeTab === 'home' && (
          <div className="w-full max-w-lg flex flex-col items-center">
            {/* Search Bar */}
            <div className="w-full relative group mb-8">
              <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Google securely..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-[#2a0a18]/80 border border-pink-800 hover:border-pink-500/50 focus:border-pink-400 text-white placeholder-pink-700 rounded-xl pl-12 pr-12 py-4 outline-none transition-all shadow-2xl backdrop-blur-md font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-pink-500 hover:text-pink-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500 bg-[#2a0a18]/80 border border-pink-800 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 border-b border-pink-800 pb-4">
              <h2 className="text-2xl font-bold text-pink-300">Games ({gamesData.length})</h2>
              <button onClick={() => setActiveTab('home')} className="text-sm px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-800 hover:text-white transition-colors">Close</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {gamesData.map(game => (
                <div 
                  key={game.id} 
                  onClick={() => { setCurrentUrl(game.url); setActiveTab('playing'); }}
                  className="bg-pink-950/50 border border-pink-800/50 rounded-xl p-3 hover:bg-pink-800 hover:border-pink-500/50 transition-all cursor-pointer group shadow-lg flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 relative bg-pink-900/30 flex items-center justify-center p-2 shadow-inner">
                    <img src={getFavicon(game.url)} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                  </div>
                  <h3 className="font-bold text-sm text-pink-200 group-hover:text-pink-100 transition-colors truncate w-full">{game.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500 bg-[#2a0a18]/80 border border-pink-800 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 border-b border-pink-800 pb-4">
              <h2 className="text-2xl font-bold text-pink-300">Apps</h2>
              <button onClick={() => setActiveTab('home')} className="text-sm px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-800 hover:text-white transition-colors">Close</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {appsData.map(app => (
                <div 
                  key={app.id} 
                  onClick={() => { setCurrentUrl(app.url); setActiveTab('playing'); }}
                  className="bg-pink-950/50 border border-pink-800/50 rounded-xl p-6 hover:bg-pink-800 hover:border-pink-500/50 transition-all cursor-pointer flex flex-col items-center gap-4 shadow-lg group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-pink-900/30 flex items-center justify-center p-3 shadow-inner">
                    <img src={getFavicon(app.url)} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                  </div>
                  <span className="font-bold text-pink-200">{app.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theatre' && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500 bg-[#2a0a18]/80 border border-pink-800 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 border-b border-pink-800 pb-4">
              <h2 className="text-2xl font-bold text-pink-300">Theatre</h2>
              <button onClick={() => setActiveTab('home')} className="text-sm px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-800 hover:text-white transition-colors">Close</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {theatreData.map(site => (
                <div 
                  key={site.id} 
                  onClick={() => { setCurrentUrl(site.url); setActiveTab('playing'); }}
                  className="bg-pink-950/50 border border-pink-800/50 rounded-xl p-6 hover:bg-pink-800 hover:border-pink-500/50 transition-all cursor-pointer flex flex-col items-center gap-4 shadow-lg group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-pink-900/30 flex items-center justify-center p-3 shadow-inner">
                    <img src={getFavicon(site.url)} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                  </div>
                  <span className="font-bold text-pink-200">{site.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'music' && (
          <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500 bg-[#2a0a18]/80 border border-pink-800 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 border-b border-pink-800 pb-4">
              <h2 className="text-2xl font-bold text-pink-300">Music Booth</h2>
              <button onClick={() => setActiveTab('home')} className="text-sm px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-800 hover:text-white transition-colors">Close</button>
            </div>
            <iframe 
              style={{borderRadius: '12px'}} 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500 bg-[#2a0a18]/80 border border-pink-800 p-6 rounded-2xl backdrop-blur-md text-left">
            <div className="flex items-center justify-between mb-6 border-b border-pink-800 pb-4">
              <h2 className="text-2xl font-bold text-pink-300">Configuration</h2>
              <button onClick={() => setActiveTab('home')} className="text-sm px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-800 hover:text-white transition-colors">Close</button>
            </div>
            
            <div className="mb-4">
              <label className="block text-pink-200 text-sm font-bold mb-2">Panic Key</label>
              <input 
                type="text" 
                maxLength={1}
                value={panicKey}
                onChange={(e) => setPanicKey(e.target.value)}
                className="w-full bg-pink-950 border border-pink-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />
              <p className="text-xs text-pink-400 mt-1">Pressing this key will instantly redirect you.</p>
            </div>

            <div className="mb-6">
              <label className="block text-pink-200 text-sm font-bold mb-2">Panic Redirect URL</label>
              <input 
                type="text" 
                value={panicUrl}
                onChange={(e) => setPanicUrl(e.target.value)}
                className="w-full bg-pink-950 border border-pink-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />
            </div>

            <button 
              onClick={saveSettings}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-pink-600/20"
            >
              Save Settings
            </button>
          </div>
        )}

        {(activeTab === 'playing' || activeTab === 'proxy') && (
          <div className="w-full h-[75vh] animate-in fade-in zoom-in-95 duration-300 bg-black rounded-2xl overflow-hidden relative border border-pink-800/50 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-12 bg-[#1a0510] flex items-center justify-between px-4 border-b border-pink-800/50 z-10">
              <div className="flex items-center gap-2 text-pink-300 text-sm font-mono truncate max-w-[60%]">
                <ExternalLink size={16} />
                {currentUrl}
              </div>
              <button 
                onClick={() => setActiveTab('home')} 
                className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
              >
                Close
              </button>
            </div>
            <iframe src={currentUrl} className="w-full h-full pt-12 border-none bg-white" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
        )}

      </main>

      {/* Bottom Dock */}
      <div className="fixed bottom-6 z-20 flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-[#2a0a18]/90 backdrop-blur-xl border border-pink-800/50 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
        {[
          { icon: Home, label: 'Home', tab: 'home' },
          { icon: Gamepad2, label: 'Games', tab: 'games' },
          { icon: LayoutGrid, label: 'Apps', tab: 'apps' },
          { icon: Film, label: 'Theatre', tab: 'theatre' },
          { icon: Music, label: 'Music', tab: 'music' },
          { icon: Settings, label: 'Settings', tab: 'settings' },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(item.tab)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200 group relative ${activeTab === item.tab ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' : 'text-pink-400 hover:bg-pink-900/80 hover:text-pink-200'}`}
            title={item.label}
          >
            <item.icon size={24} className={`transition-transform ${activeTab === item.tab ? 'scale-110' : 'group-hover:scale-110'}`} />
            
            {/* Tooltip */}
            <span className="absolute -top-12 bg-pink-950 border border-pink-800 text-pink-100 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
