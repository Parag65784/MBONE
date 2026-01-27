import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Order History - MILLIONBONE',
  description: 'View your MILLIONBONE order history and track shipments.',
};

export default function History() {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-brand-primary mb-8">Order History</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-brand-secondary">No orders found. Start shopping to see your history!</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}