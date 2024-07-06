import  { useState, ChangeEvent, FormEvent } from 'react';
// import { Link } from 'react-router-dom';


 export default function Discussion() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setSuggestions([...suggestions, input]);
      setInput('');
    }
  };

  return (
    <div className="  bg-gradient-to-br from-[#2f8d2f] to-[#0a1f0a] rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-neon-green/20  min-h-screen flex flex-col items-center justify-center   ">
      <header className="w-full max-w-md rounded-xl p-6 bg-gradient-to-br from-[#1a3a1a] to-[#0f2e0f] border border-neon-green/20 shadow-lg hover:shadow-neon-green/20 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">BM Suggestion Box</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type ="text "
            value={input}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter your suggestion"
          />
          <button type="submit" className="w-full bg-neon-green text-black p-3 rounded-md hover:bg-green-600 transition duration-300">
            Submit
          </button>
        </form>
        <ul className="w-full">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="bg-neon-green p-3 rounded-md mb-2 text-black">{suggestion}</li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          {/* <Link to="/" className="text-blue-500 hover:text-blue-600">Back to Home</Link> */}
        </div>
      </header>
    </div>
  );
}


