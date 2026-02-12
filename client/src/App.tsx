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

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
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
        body: JSON.stringify({ url }),
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <header className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Link2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">LinkShortener</h1>
          </div>
          <p className="text-gray-500 text-sm">Shorten your long links in seconds.</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                error 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'
              }`}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-left">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading || !url} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Shorten <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-lg flex justify-between items-center">
            <div className="text-indigo-600 font-medium font-mono truncate mr-2 select-all">
              {shortUrl}
            </div>
            <button 
              onClick={copyToClipboard} 
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        )}
        
        <footer className="mt-8 text-xs text-gray-400">
          <p>Simple. Fast. Secure.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
