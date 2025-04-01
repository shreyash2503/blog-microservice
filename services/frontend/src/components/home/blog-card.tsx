"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Blog } from "@/types/blog";

export default function BlogCard({ blog } : { blog: Blog }) {
    const date = new Date(blog.CreatedAt);
    const createdDate = String(date.getDate()) + "/" + String(date.getMonth()) + "/" + String(date.getFullYear()) 
    return(
        <>
        <Card className="relative flex h-[540px] w-[350px] flex-col overflow-hidden border-2 hover:opacity-55">
            <CardHeader>
                <Image src={blog.CoverImage ? blog.CoverImage : "https://github.com/shadcn.png"} height={200} width={350} alt="Blog Header card" unoptimized />
            </CardHeader>
            <CardContent className="">
                <p className="text-left font-extrabold text-2xl">{blog.Title}</p>
                <p className="text-gray-200 font-medium">This is a short summary</p>
            </CardContent>
            <CardFooter className="w-full">
                <div className="flex gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="">Author: {blog.Author}</p>
                        <p className="">Authored Date: {createdDate}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
        </>

    )


}