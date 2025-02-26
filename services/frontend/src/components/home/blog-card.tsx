import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function BlogCard() {
    return(
        <>
        <Card className="relative flex h-fit w-[350px] flex-col overflow-hidden border-2">
            <CardHeader>
                <Image src="https://github.com/shadcn.png" height={200} width={350} alt="Blog Header card" />
            </CardHeader>
            <CardContent className="">
                <p className="text-left font-extrabold text-2xl">This is the blog Header or Title</p>
                <p className="text-gray-200 font-medium">This is a short summary</p>
            </CardContent>
            <CardFooter className="w-full">
                <div className="flex gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="">Author: John Doe</p>
                        <p className="">Authored Date: 5th Feb 2025</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
        </>

    )


}