import BlogCard from "@/components/home/blog-card";
import Navbar from "@/components/home/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative h-screen min-h-screen w-full">
        <div className="relative mx-auto flex max-w-7xl flex-col">
          <Navbar />
          <div className="flex flex-wrap justify-center items-center gap-5" >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <BlogCard key={num} />
            ))}
          </div>

        </div>
      </div>
    </>
    
  );
}
