import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ProductGrid from '@/components/shop/ProductGrid';

export const metadata = {
  title: 'All Products - MILLIONBONE Shop',
  description: 'Browse all MILLIONBONE merchandise including apparel, accessories, and exclusive collectibles.',
};

export default function AllProducts() {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <ProductGrid category="all" title="ALL PRODUCTS" />
      </main>
      <Footer />
    </PageTransition>
  );
}