import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <div className="floating-elements">
        <div className="floating-star">⭐</div>
        <div className="floating-star">🌟</div>
        <div className="floating-star">✨</div>
        <div className="floating-star">🎈</div>
      </div>
      <Header />
      <main className="container">
        <Hero />
        <Categories />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
