import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import Menu from "@/components/Menu";
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
const BottomNav = dynamic(() => import('@/components/BottomNav'), { ssr: false });
const CartModal = dynamic(() => import('@/components/CartModal'), { ssr: false });

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <QuickAccess />
      <Menu />
      <Chatbot />
      <BottomNav />
      <CartModal />
    </>
  );
}

