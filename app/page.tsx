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

        <section id="services" className="py-20 px-5 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Что мы точим</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 border border-white/[0.08] rounded-lg bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-3 text-[#F59E0B]">Заточка ножей</h3>
              <p className="text-[#7A8494]">Кухонные, охотничьи, туристические ножи, ножи для мясорубок.</p>
            </article>
            <article className="p-6 border border-white/[0.08] rounded-lg bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-3 text-[#F59E0B]">Заточка цепей бензопил</h3>
              <p className="text-[#7A8494]">Цепи для бензопил (Stihl, Husqvarna, Partner и др.).</p>
            </article>
            <article className="p-6 border border-white/[0.08] rounded-lg bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-3 text-[#F59E0B]">Садовый и столярный инструмент</h3>
              <p className="text-[#7A8494]">Топоры, секаторы, стамески, ножи рубанка, ножницы.</p>
            </article>
          </div>
        </section>

        <HowItWorks />
        <Pricing />
        <OrderForm />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
