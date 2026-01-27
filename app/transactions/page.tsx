import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Transaction History - MILLIONBONE',
  description: 'View your MILLIONBONE transaction history and wallet activity.',
};

export default function Transactions() {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-brand-primary mb-8">Transaction History</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-brand-secondary">No transactions found. Connect your wallet to see activity!</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}