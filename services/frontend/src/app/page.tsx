import Navbar from "@/components/home/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative h-screen min-h-screen w-full overflow-hidden">
        <div className="relative mx-auto flex max-w-7xl flex-col">
          <Navbar />

        </div>
      </div>
    </>
    
  );
}
