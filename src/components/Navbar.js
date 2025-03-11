import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <nav className={`w-full p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    DApp Demo
                </h1>
                <div className="flex items-center gap-4">
                    <ConnectButton />
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg ${
                            isDarkMode 
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
} 