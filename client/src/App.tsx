import { useState } from 'react';
import { Link2, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    try {
      new URL(targetUrl);
    } catch {
      setError('Please enter a valid URL (e.g., example.com)');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 sm:p-8 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md text-center border border-transparent dark:border-gray-800">
        <header className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Link2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">URL Shortener</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Shorten your long links.</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:text-white ${
                error 
                  ? 'border-red-500 focus:ring-red-200 dark:border-red-900 dark:focus:ring-red-900/30' 
                  : 'border-gray-200 dark:border-gray-700 focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900/30'
              }`}
            />
          </div>
          
          {error && <p className="text-red-500 dark:text-red-400 text-sm text-left -mt-2">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading || !url} 
            className="w-fit self-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-2.5 px-10 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-indigo-600/20 dark:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Shorten <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg flex justify-between items-center transition-all">
            <div className="text-indigo-600 dark:text-indigo-400 font-medium font-mono truncate mr-2 select-all">
              {shortUrl}
            </div>
            <button 
              onClick={copyToClipboard} 
              className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-all"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        )}
        
        <footer className="mt-8 text-xs text-gray-400 dark:text-gray-500">
          <p>by Guilherme Ledo Chagas</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
