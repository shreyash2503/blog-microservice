"use client";
import Link from "next/link";
import BlogCard from "./blog-card";
import { Blog } from "@/types/blog";
import Spinner from "../ui/spinner";

export default function Feed({ data }: { data: Blog[] }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-wrap justify-center items-center gap-10 m-5">
        {data ? (
          data.map((blog) => (
            <Link href="/read/122" key={blog.ID}>
              <BlogCard />
            </Link>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
