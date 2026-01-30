'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Wallet, CircleAlert as AlertCircle, CircleCheck as CheckCircle, ExternalLink } from 'lucide-react';
import { useAccount, useBalance } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const [polAmount, setPolAmount] = useState('');
  const [mboneAmount, setMboneAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');

  // Exchange rate: 1 POL = 1000 MBONE (you can adjust this)
  const exchangeRate = 1000;

  const { data: polBalance } = useBalance({
    address: address,
    chainId: 137, // Polygon mainnet
  });

  useEffect(() => {
    if (polAmount) {
      const mbone = (parseFloat(polAmount) * exchangeRate).toString();
      setMboneAmount(mbone);
    } else {
      setMboneAmount('');
    }
  }, [polAmount]);

  const handleSwap = async () => {
    if (!isConnected || !polAmount) return;

    setIsSwapping(true);
    setSwapStatus('pending');

    try {
      // This is a placeholder for the actual swap logic
      // You would integrate with your smart contract here
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock transaction hash
      setTxHash('0x1234567890abcdef1234567890abcdef12345678');
      setSwapStatus('success');
      
      // Reset form
      setPolAmount('');
      setMboneAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
      setSwapStatus('error');
    } finally {
      setIsSwapping(false);
    }
  };

  const resetSwap = () => {
    setSwapStatus('idle');
    setTxHash('');
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-brand-primary mb-4">
              SWAP TO $MBONE
            </h1>
            <p className="text-xl text-brand-secondary">
              Exchange your POL tokens for MILLIONBONE on Polygon network
            </p>
          </motion.div>

          {/* Swap Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border"
          >
            {swapStatus === 'success' ? (
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-brand-primary mb-4">
                  Swap Successful!
                </h3>
                <p className="text-brand-secondary mb-6">
                  Your POL tokens have been successfully swapped for MBONE tokens.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Transaction Hash:</p>
                  <div className="flex items-center justify-center space-x-2">
                    <code className="text-sm bg-white px-3 py-1 rounded border">
                      {txHash.slice(0, 10)}...{txHash.slice(-8)}
                    </code>
                    <a
                      href={`https://polygonscan.com/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent hover:text-brand-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <button
                  onClick={resetSwap}
                  className="bg-brand-accent text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                >
                  Make Another Swap
                </button>
              </div>
            ) : (
              <>
                {/* Connection Status */}
                {!isConnected && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-5 w-5 text-yellow-600" />
                      <span className="text-yellow-800 font-medium">
                        Please connect your wallet to continue
                      </span>
                    </div>
                  </div>
                )}

                {/* Balance Display */}
                {isConnected && polBalance && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-secondary">Your POL Balance:</span>
                      <span className="font-bold text-brand-primary">
                        {parseFloat(formatEther(polBalance.value)).toFixed(4)} POL
                      </span>
                    </div>
                  </div>
                )}

                {/* From Token */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      From (POL)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={polAmount}
                        onChange={(e) => setPolAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        disabled={!isConnected || isSwapping}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                          POL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Swap Arrow */}
                  <div className="flex justify-center">
                    <div className="bg-brand-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <ArrowDownUp className="h-6 w-6 text-brand-accent" />
                    </div>
                  </div>

                  {/* To Token */}
                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      To (MBONE)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={mboneAmount}
                        placeholder="0.0"
                        className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-xl bg-gray-50"
                        disabled
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                          MBONE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-brand-secondary">Exchange Rate:</span>
                    <span className="font-medium text-brand-primary">
                      1 POL = {exchangeRate.toLocaleString()} MBONE
                    </span>
                  </div>
                </div>

                {/* Swap Button */}
                <motion.button
                  onClick={handleSwap}
                  disabled={!isConnected || !polAmount || isSwapping || parseFloat(polAmount) <= 0}
                  whileHover={{ scale: isConnected && polAmount && !isSwapping ? 1.02 : 1 }}
                  whileTap={{ scale: isConnected && polAmount && !isSwapping ? 0.98 : 1 }}
                  className="w-full bg-brand-accent text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSwapping ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Swapping...</span>
                    </>
                  ) : !isConnected ? (
                    <span>Connect Wallet</span>
                  ) : !polAmount || parseFloat(polAmount) <= 0 ? (
                    <span>Enter Amount</span>
                  ) : (
                    <>
                      <ArrowDownUp className="h-5 w-5" />
                      <span>Swap Tokens</span>
                    </>
                  )}
                </motion.button>

                {/* Error State */}
                {swapStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 font-medium">
                        Swap failed. Please try again.
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border"
            >
              <h3 className="font-bold text-brand-primary mb-3">Network</h3>
              <p className="text-brand-secondary text-sm">
                This swap operates on the Polygon network. Make sure your wallet is connected to Polygon mainnet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border"
            >
              <h3 className="font-bold text-brand-primary mb-3">Contract</h3>
              <p className="text-brand-secondary text-sm">
                MBONE Token: 0x742d35Cc6694C81D4b8f0D8A1DA1EE85A7C6c0B3
              </p>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This is a demonstration swap interface. In a production environment, this would connect to actual smart contracts. 
                  Always verify contract addresses and do your own research before making any transactions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}