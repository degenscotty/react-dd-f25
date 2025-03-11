import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Configure wagmi & RainbowKit
const config = getDefaultConfig({
  appName: 'DApp Demo',
  projectId: process.env.REACT_APP_PROJECT_ID, // Using project ID from .env
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Create a query client
const queryClient = new QueryClient();

// RainbowKit theme wrapper component
function RainbowKitThemeWrapper({ children }) {
  const { isDarkMode } = useTheme();
  
  // Use console.log to verify theme changes are detected
  useEffect(() => {
    console.log('Theme changed:', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // Force re-render of RainbowKitProvider when theme changes
  const [key, setKey] = React.useState(0);
  
  // Update key when theme changes to force re-render
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [isDarkMode]);
  
  // Create theme objects outside of JSX for better control
  const rainbowTheme = isDarkMode 
    ? darkTheme({ 
        accentColor: '#3b82f6',
        borderRadius: 'medium'
      }) 
    : lightTheme({ 
        accentColor: '#3b82f6',
        borderRadius: 'medium'
      });

  return (
    <RainbowKitProvider 
      key={key} 
      theme={rainbowTheme} 
      coolMode
    >
      {children}
    </RainbowKitProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RainbowKitThemeWrapper>
            <App />
          </RainbowKitThemeWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
