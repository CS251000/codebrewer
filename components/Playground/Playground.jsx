import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CodeCompiler() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRun = async () => {
        try {
            const response = await fetch('http://localhost:4000/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const result = await response.json();
            if (response.ok) {
                setOutput(result.output);
                setError('');
                setAnalysis('');
            } else {
                setOutput('');
                setError(result.error || 'An error occurred.');
            }
        } catch (err) {
            setOutput('');
            setError('Failed to connect to the server.');
        }
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const result = await response.json();
            if (response.ok) {
                setAnalysis(result.analysis);
                setError('');
                setOutput('');
                setIsPopupOpen(true);
            } else {
                setAnalysis('');
                setError(result.error || 'An error occurred.');
            }
        } catch (err) {
            setAnalysis('');
            setError('Failed to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="relative mt-4 bg-gray-900 rounded-lg text-gray-100 min-h-screen p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 p-4 rounded-lg shadow-lg">
                    <Editor
                        className="monaco-editor-container"
                        height="500px"
                        language="cpp"
                        value={code}
                        onChange={(value) => setCode(value)}
                        theme="vs-dark"
                        options={{
                            fontSize: 18,
                        }}
                    />
                </div>

                <div className="flex-1 bg-gray-700 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Output:</h2>
                    <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleRun}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Run Code
                </button>
                <button
                    onClick={handleAnalyze}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                    Analyze Code
                </button>
            </div>

            {error && (
                <div className="bg-red-700 p-4 rounded-lg shadow-lg mt-4">
                    <h2 className="text-xl font-semibold mb-2">Error:</h2>
                    <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg relative">
                        <div className="loader"></div>
                        <p className="text-gray-300">Analyzing...</p>
                    </div>
                </div>
            )}

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg relative w-full max-w-3xl mx-4">
                        <button
                            className="absolute top-4 right-4 text-3xl hover:text-gray-100 focus:outline-none"
                            onClick={closePopup}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-gray-300 mb-4">Analysis</h2>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {analysis}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}
