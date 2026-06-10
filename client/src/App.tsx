import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Plus } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Pre-warm the backend on mount
  useEffect(() => {
    const warmUp = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const timeout = setTimeout(() => setIsWakingUp(true), 1500);
      try {
        await fetch(`${apiUrl}/api/health`);
      } catch (err) {
        console.warn('Warm-up failed:', err);
      } finally {
        clearTimeout(timeout);
        setIsWakingUp(false);
      }
    };
    warmUp();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    try {
      new URL(targetUrl);
    } catch {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || 'Server error occurred.');
      }

      if (data.shortUrl) {
        setShortUrl(String(data.shortUrl));
      } else {
        throw new Error('Invalid response structure.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setUrl('');
    setShortUrl('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col justify-between p-6 sm:p-12 md:p-24 selection:bg-zinc-900 selection:text-white relative overflow-hidden">
      
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center opacity-0 animate-fade-in delay-100">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-950">Cut</div>
        <div className="text-xs text-zinc-400 uppercase tracking-widest">Vol. 01</div>
      </header>

      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center py-12 md:py-24">
        
        <div className="max-w-3xl">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] opacity-0 animate-fade-in-up delay-200">
            Shorten.<br/>
            <span className="text-zinc-400 italic pr-4">Simplify.</span>
          </h1>
          
          <div className="mt-12 md:mt-24 max-w-xl opacity-0 animate-fade-in-up delay-300">
            {!shortUrl ? (
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="text"
                  placeholder="Paste your link..."
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                  className="w-full bg-transparent border-b border-zinc-200 py-4 pr-12 text-xl sm:text-2xl font-light placeholder:text-zinc-300 focus:outline-none focus:border-zinc-950 transition-colors disabled:opacity-50"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={loading || !url}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                >
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                </button>
                
                <div className="absolute top-full left-0 mt-3 flex items-center justify-between w-full text-xs tracking-wide">
                  {error ? (
                    <span className="text-red-600 font-medium">{error}</span>
                  ) : loading ? (
                    <span className="text-zinc-500 animate-pulse">Processing...</span>
                  ) : isWakingUp ? (
                    <span className="text-zinc-400">Initializing connection...</span>
                  ) : (
                    <span className="text-zinc-400">Press enter to condense</span>
                  )}
                </div>
              </form>
            ) : (
              <div className="animate-scale-in">
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">Your Link</div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-zinc-200">
                  <span className="font-serif text-4xl sm:text-5xl tracking-tight text-zinc-950 break-all select-all flex-1">
                    {shortUrl}
                  </span>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-none px-8 py-4 bg-zinc-950 text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[140px]"
                    >
                      {copied ? <Check className="w-4 h-4 mr-2" /> : null}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-4 border border-zinc-200 text-zinc-950 hover:bg-zinc-50 transition-colors"
                      title="Shorten another"
                    >
                      <Plus className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full max-w-5xl mx-auto flex justify-between items-end opacity-0 animate-fade-in delay-500 text-xs text-zinc-400 uppercase tracking-widest leading-loose">
        <div>
          &copy; {new Date().getFullYear()} <br/>
          Guilherme Ledo Chagas
        </div>
        <div className="text-right">
          Design <br/>
          Editorial System
        </div>
      </footer>
    </div>
  );
}

export default App;