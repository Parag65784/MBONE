import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ProductGrid from '@/components/shop/ProductGrid';

export const metadata = {
  title: 'Apparel - MILLIONBONE Shop',
  description: 'Shop MILLIONBONE apparel including t-shirts, hoodies, and premium clothing for diamond hands.',
};

export default function Apparel() {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <ProductGrid category="apparel" title="APPAREL COLLECTION" />
      </main>
      <Footer />
    </PageTransition>
  );
}