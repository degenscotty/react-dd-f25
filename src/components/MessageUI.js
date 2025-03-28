import React, { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAccount } from "wagmi"
import { useMessageContract } from "../hooks/useMessageContract"
import { CONTRACT_ADDRESS } from "../contract/contractConfig"

export default function MessageUI() {
    const { isDarkMode } = useTheme()
    const [newMessage, setNewMessage] = useState("")
    const { isConnected } = useAccount()
    const { message, count, isLoading, updateMessage, isPending } = useMessageContract()

    const handleUpdate = () => {
        if (!newMessage.trim()) return
        updateMessage(newMessage)
        setNewMessage("")
    }

    return (
        <div className="p-8">
            <div
                className={`max-w-md mx-auto ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6`}
            >
                <h1
                    className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                    } mb-4`}
                >
                    Hello World DApp
                </h1>

                <div className={`mb-6 p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
                    <div className="mb-3">
                        <span
                            className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm`}
                        >
                            Current Message:
                        </span>
                        <p
                            className={`text-lg font-medium ${
                                isDarkMode ? "text-gray-100" : "text-gray-800"
                            }`}
                        >
                            {isConnected
                                ? message || "Loading..."
                                : "Connect wallet to view message"}
                        </p>
                    </div>

                    <div>
                        <span
                            className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm`}
                        >
                            Update Count:
                        </span>
                        <p
                            className={`text-lg font-medium ${
                                isDarkMode ? "text-gray-100" : "text-gray-800"
                            }`}
                        >
                            {isConnected ? count : "Connect wallet to view count"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter new message"
                        className={`flex-1 px-4 py-2 border ${
                            isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "border-gray-300 text-gray-800"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />

                    <button
                        onClick={handleUpdate}
                        disabled={isLoading || !isConnected}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isPending ? "Processing..." : "Update Message"}
                    </button>
                </div>

                {isPending && (
                    <div
                        className={`mt-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                        Transaction in progress... waiting for confirmation
                    </div>
                )}

                <div
                    className={`mt-6 text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                    } flex items-center`}
                >
                    <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                            isConnected ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></div>
                    Status:{" "}
                    {isConnected ? "Connected to Blockchain" : "Not connected to blockchain"}
                </div>

                {isConnected && (
                    <div
                        className={`mt-2 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                    >
                        Contract: {CONTRACT_ADDRESS}
                    </div>
                )}
            </div>
        </div>
    )
}
