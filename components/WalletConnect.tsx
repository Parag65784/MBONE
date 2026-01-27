'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, User, ShoppingCart, History, FileText, LogOut, ChevronDown, X } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function WalletConnect() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // Create or update user in database when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      createOrUpdateUser(address)
    }
  }, [isConnected, address])

  const createOrUpdateUser = async (walletAddress: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert(
          { wallet_address: walletAddress },
          { onConflict: 'wallet_address' }
        )
        .select()

      if (error) {
        console.error('Error creating/updating user:', error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsModalOpen(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsDropdownOpen(false)
  }

  const menuItems = [
    { icon: User, label: 'Dashboard', href: '/dashboard' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: ShoppingCart, label: 'Cart', href: '/cart' },
    { icon: History, label: 'Order History', href: '/history' },
    { icon: FileText, label: 'Transactions', href: '/transactions' },
  ]

  if (isConnected && address) {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <Wallet className="h-4 w-4" />
          <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          <ChevronDown className="h-4 w-4" />
        </motion.button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50"
            >
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-brand-secondary hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <hr className="my-2" />
                <button
                  onClick={handleDisconnect}
                  className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-brand-accent text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors flex items-center space-x-2"
      >
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brand-primary">Connect Wallet</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                    className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-brand-accent hover:bg-brand-accent/5 transition-all"
                  >
                    <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-brand-accent" />
                    </div>
                    <span className="font-semibold text-brand-secondary">{connector.name}</span>
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-6 text-center">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}