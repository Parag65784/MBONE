import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Shopping Cart - MILLIONBONE',
  description: 'Review your MILLIONBONE merchandise before checkout.',
};

export default function Cart() {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-brand-primary mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-brand-secondary">Your cart is empty. Start shopping!</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}