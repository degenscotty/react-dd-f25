import React from 'react';
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
  // TODO: Replace with your project ID from https://cloud.walletconnect.com
  projectId: 'YOUR_PROJECT_ID', // Get one from https://cloud.walletconnect.com
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
  
  return (
    <RainbowKitProvider 
      theme={isDarkMode ? darkTheme() : lightTheme()}
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
