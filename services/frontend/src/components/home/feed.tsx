"use client";
import Link from "next/link";
import BlogCard from "./blog-card";
import { Blog } from "@/types/blog";
import Spinner from "../ui/spinner";

export default function Feed({ data }: { data: Blog[] }) {
  console.log(data);
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-wrap justify-center items-center gap-10 m-5">
        {data ? (
          data.map((blog) => (
            <Link href={`/read/${btoa(String(blog.ID))}`} key={blog.ID}>
              <BlogCard blog={blog} />
            </Link>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
