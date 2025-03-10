import React, { useState, useEffect } from "react"

export default function Home() {
    const [message, setMessage] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isConnected, setIsConnected] = useState(false)

    // This simulates connecting to the blockchain and fetching initial data
    useEffect(() => {
        // Mock blockchain connection
        const mockFetchData = () => {
            setTimeout(() => {
                setMessage("Welcome to the blockchain!")
                setCount(3)
                setIsConnected(true)
            }, 1000)
        }

        mockFetchData()
    }, [])

    // This simulates sending a transaction to update the message
    const handleUpdate = () => {
        if (!newMessage.trim()) return

        setIsLoading(true)

        // Simulate blockchain transaction
        setTimeout(() => {
            setMessage(newMessage)
            setCount((prevCount) => parseInt(prevCount) + 1)
            setNewMessage("")
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello World DApp</h1>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-3">
                        <span className="text-gray-500 text-sm">Current Message:</span>
                        <p className="text-lg font-medium text-gray-800">
                            {message || "Loading..."}
                        </p>
                    </div>

                    <div>
                        <span className="text-gray-500 text-sm">Update Count:</span>
                        <p className="text-lg font-medium text-gray-800">{count}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter new message"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleUpdate}
                        disabled={isLoading || !isConnected}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? "Processing..." : "Update Message"}
                    </button>
                </div>

                {isLoading && (
                    <div className="mt-4 text-sm text-gray-600">
                        Transaction in progress... waiting for confirmation
                    </div>
                )}

                <div className="mt-6 text-xs text-gray-500 flex items-center">
                    <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                            isConnected ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></div>
                    Status:{" "}
                    {isConnected ? "Connected to Anvil Local Chain" : "Connecting to blockchain..."}
                </div>

                {isConnected && (
                    <div className="mt-2 text-xs text-gray-400">
                        Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
                    </div>
                )}
            </div>
        </div>
    )
}
