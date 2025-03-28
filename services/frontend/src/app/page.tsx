"use client";
import { loadUserFeed } from "@/actions/user-feed";
import BlogCard from "@/components/home/blog-card";
import Navbar from "@/components/home/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth";
import { Blog } from "@/types/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { token } = useAuth();
  const [data, setData] = useState<Blog[] | null>(null);

  useEffect(() => {
    const getFeed = async () => {
      const response = await loadUserFeed(token!)
      setData(response)
      console.log(response)
    }

    getFeed();

  }, [token]);


  return (
    <>
    <ProtectedRoute>
      <div className="">
        <div className="">
          <Navbar />

          {/* <Navbar /> */}
          <div className="flex flex-wrap justify-center items-center gap-10 m-5" >
            {data?.map(blog => (
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
