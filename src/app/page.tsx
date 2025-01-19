'use client';

import './styles.css';
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, Config } from 'wagmi';
import Home from '@/pages/Home';
import { useEffect, useState } from 'react';
import { mainnet } from '@wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';

export default function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    const clientConfig = getDefaultConfig({
      appName: 'Delivery Management',
      projectId: 'YOUR_PROJECT_ID',
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
    });
    setConfig(clientConfig);
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div className="light">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Home />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
