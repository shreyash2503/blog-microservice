import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="mx-auto flex w-full items-center justify-between p-4">
      <div className="w-[180px]">
        <p className="text-2xl font-bold">Blog</p>
      </div>

      {/*Desktop Navigation*/}
      <div className="hidden gap-10 text-sm text-muted-foreground md:flex">
        <Link href="https://github.com/shreyash2503">Github</Link>
        <Link href="https://github.com/shreyash2503">Github</Link>
        <Link href="https://github.com/shreyash2503">Github</Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-9 w-9" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-52">
            <SheetHeader>
              <SheetTitle className="text-left text-2xl">Blog</SheetTitle>
            </SheetHeader>
            <div className="mt-7 flex flex-col gap-4 text-muted-foreground">
              <Link href="https://github.com/shryash2503">Github</Link>
              <Link href="https://github.com/shreyash2503">Github</Link>
              <Link href="https://github.com/shreyash2503">Github</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
