import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// WalletConnect Project ID
const projectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo-project-id'

// App metadata
const metadata = {
  name: 'MILLIONBONE',
  description: 'MILLIONBONE - Premium Community-Driven Meme Coin',
  url: 'https://millionbone.com',
  icons: ['https://millionbone.com/logo.png']
}

// Chains you support
const chains = [mainnet, polygon, arbitrum] as const

// ✅ Manual wagmi config (NO auto wallets)
export const config = createConfig({
  chains,
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata
    }),
    coinbaseWallet({
      appName: metadata.name
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http()
  }
})

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true
})
