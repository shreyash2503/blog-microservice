import { loadUserFeed } from "@/actions/user-feed";
import BlogCard from "@/components/home/blog-card";
import Navbar from "@/components/home/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await loadUserFeed()
  return (
    <>
    <ProtectedRoute>
      <div className="">
        <div className="">
          <Navbar />

          {/* <Navbar /> */}
          <div className="flex flex-wrap justify-center items-center gap-10 m-5" >
            {data.map(blog => (
              <Link href="/read/122" key={blog.ID}>
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
