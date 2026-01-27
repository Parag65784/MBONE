import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ProductGrid from '@/components/shop/ProductGrid';

export const metadata = {
  title: 'Accessories - MILLIONBONE Shop',
  description: 'Shop MILLIONBONE accessories including hats, mugs, stickers, and other premium items.',
};

export default function Accessories() {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <ProductGrid category="accessories" title="ACCESSORIES COLLECTION" />
      </main>
      <Footer />
    </PageTransition>
  );
}