import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Dashboard - MILLIONBONE',
  description: 'Your MILLIONBONE dashboard - manage your account, view orders, and track your journey.',
};

export default function Dashboard() {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-brand-primary mb-8">Dashboard</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-brand-secondary">Welcome to your MILLIONBONE dashboard!</p>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}