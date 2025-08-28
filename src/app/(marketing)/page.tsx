 


import { Hero } from "@components/Hero";
import { WhatsappButton } from "../../components/WhatAppButton";
import ServicesOverview from "@components/ServicesOverview";

export default function Home() {
  return (
    <div>
      <main>
        
        <Hero />
        <WhatsappButton />
        <ServicesOverview />
      </main>
    </div>
  );
}
