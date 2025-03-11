import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [account, setAccount] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState('');

    // Check if MetaMask is installed
    const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;

    // Check if already connected on component mount
    useEffect(() => {
        const checkConnection = async () => {
            if (isMetaMaskInstalled) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                } catch (err) {
                    console.error('Error checking connection:', err);
                }
            }
        };

        checkConnection();

        // Listen for account changes
        if (isMetaMaskInstalled) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    setAccount('');
                } else {
                    setAccount(accounts[0]);
                }
            });
        }

        return () => {
            if (isMetaMaskInstalled) {
                window.ethereum.removeListener('accountsChanged', () => {});
            }
        };
    }, [isMetaMaskInstalled]);

    // Connect to MetaMask
    const connectMetaMask = async () => {
        if (!isMetaMaskInstalled) {
            setError('Please install MetaMask to connect');
            return;
        }

        setIsConnecting(true);
        setError('');

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setAccount(accounts[0]);
        } catch (err) {
            console.error('Error connecting to MetaMask:', err);
            setError('Failed to connect to MetaMask');
        } finally {
            setIsConnecting(false);
        }
    };

    // Format address for display
    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <nav className={`w-full p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    DApp Demo
                </h1>
                <div className="flex items-center gap-4">
                    {account ? (
                        <div className={`px-4 py-2 rounded-lg font-mono ${
                            isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {formatAddress(account)}
                        </div>
                    ) : (
                        <button
                            onClick={connectMetaMask}
                            disabled={isConnecting || !isMetaMaskInstalled}
                            className={`px-4 py-2 rounded-lg ${
                                isDarkMode 
                                    ? 'bg-blue-600 hover:bg-blue-700' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white disabled:opacity-50`}
                        >
                            {isConnecting ? 'Connecting...' : isMetaMaskInstalled ? 'Connect Wallet' : 'Install MetaMask'}
                        </button>
                    )}
                    {error && <div className="text-red-500 text-sm">{error}</div>}
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