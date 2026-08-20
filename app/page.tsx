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
        <HowItWorks />
        <Pricing />
        <OrderForm />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
