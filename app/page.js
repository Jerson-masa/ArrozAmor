import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import Menu from "@/components/Menu";
import Chatbot from "@/components/Chatbot";
import BottomNav from "@/components/BottomNav";

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
    </>
  );
}

