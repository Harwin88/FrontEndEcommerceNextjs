import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FixZona | Home",
  description: "Fix zona is a platform that connects users with local service providers for home repairs and maintenance.",
  // other metadata
};

export default function HomePage() {
  return (
    <>

      <Home />
  
    </>
  );
}
