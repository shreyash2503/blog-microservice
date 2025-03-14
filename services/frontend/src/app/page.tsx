import BlogCard from "@/components/home/blog-card";
import Navbar from "@/components/home/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <ProtectedRoute>
      <div className="">
        <div className="">
          <Navbar />

          {/* <Navbar /> */}
          <div className="flex flex-wrap justify-center items-center gap-10 m-5" >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <Link href="/read/122" key={num}>
                <BlogCard />
              </Link>
            ))}
          </div>
        </div>
      </div>

    </ProtectedRoute>
    </>
    
  );
}
