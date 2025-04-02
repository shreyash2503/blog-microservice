import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Pen, Pencil } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { Combobox } from "../ui/combobox";

export default function Navbar() {
  const options = [
    {
      value: "sign-out",
      label: "Sign out"
    },
    {
      value: "settings",
      label: "Settings"
    }
  ];
  return (
    <div className="mx-auto flex w-full items-center justify-between p-4">
      <div className="w-[180px]">
        <Link href="/" className="cursor-pointer">
        <span className="text-2xl font-bold">Blog</span>
        </Link>
      </div>

      {/*Desktop Navigation*/}
      <div className="hidden gap-10 text-sm text-muted-foreground md:flex md:items-center">
        <Link href="/write/new">
        <Button variant="outline">
          <Pencil className="h-5 w-5" />
        </Button>
        </Link>
        <Link href="https://github.com/shreyash2503">Github</Link>
        <Link href="https://github.com/shreyash2503">Github</Link>
        <Combobox options={options} />
        <ModeToggle />
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
