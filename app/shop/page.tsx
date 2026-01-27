import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ShopHero from '@/components/shop/ShopHero';
import FeaturedProducts from '@/components/shop/FeaturedProducts';
import ApparelSection from '@/components/shop/ApparelSection';
import AccessoriesSection from '@/components/shop/AccessoriesSection';
import CommunityStyleSection from '@/components/shop/CommunityStyleSection';
import DisclaimerSection from '@/components/shop/DisclaimerSection';

export const metadata = {
  title: 'MILLIONBONE Shop - Official Merchandise & Collectibles',
  description: 'Shop official MILLIONBONE merchandise including apparel, accessories, and exclusive collectibles. Show your pack loyalty with premium quality items.',
};

export default function Shop() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <ShopHero />
        <FeaturedProducts />
        <ApparelSection />
        <AccessoriesSection />
        <CommunityStyleSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </PageTransition>
  );
}