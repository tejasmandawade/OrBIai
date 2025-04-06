import { useState } from 'react';

function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPrompt = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: input }],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
      setInput(''); // Clear input after successful send
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get response from AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.embedding_status === 'success') {
        alert("File uploaded and embedded successfully!");
      } else if (data.embedding_status === 'failed') {
        alert(`File uploaded but embedding failed: ${data.message}`);
      } else {
        alert("File uploaded successfully!");
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <textarea 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message here..."
          rows="4"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-2">
          <input 
            type="file" 
            onChange={handleUpload} 
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isLoading}
          />
          <button 
            onClick={sendPrompt} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 border rounded-lg bg-red-50 text-red-600">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Getting response...</span>
          </div>
        </div>
      )}
      
      {response && !isLoading && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}

export default Chat; 