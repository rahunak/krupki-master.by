import Header from "@/components/header/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import OrderForm from "@/components/sections/OrderForm";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <Header />

      <main>
        <Hero />

        <h2>Что мы точим</h2>
        <div className="grid">
          <article>
            <h3>Заточка ножей</h3>
            <p>Кухонные, охотничьи, туристические ножи, ножи для мясорубок.</p>
          </article>
          <article>
            <h3>Заточка цепей бензопил</h3>
            <p>Цепи для бензопил (Stihl, Husqvarna, Partner и др.).</p>
          </article>
          <article>
            <h3>Садовый и столярный инструмент</h3>
            <p>Топоры, секаторы, стамески, ножи рубанка, ножницы.</p>
          </article>
        </div>

        <HowItWorks />
        <Pricing />
        <OrderForm />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
