import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function BlogCard() {
    return(
        <>
        <Card className="relative flex h-fit w-[350px] flex-col items-center jusity-center overflow-hidden border-2">
            <CardHeader>
                <CardTitle>Blog Title</CardTitle>
                <CardDescription>Blog Summary</CardDescription>
            </CardHeader>
            <CardContent>


            </CardContent>
            <CardFooter>
                <div className="flex justify-between gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p>Author: John Doe</p>
                        <p>Authored Date: 5th Feb 2025</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
        </>

    )


}