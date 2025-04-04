
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

interface DividerProps {
  text?: string
  className?: string
  lineClassName?: string
  textClassName?: string
}

const Divider = ({
  text = "OR",
  className,
  lineClassName,
  textClassName,
}: DividerProps) => {
  return (
    <div className={cn("flex items-center w-full py-4", className)}>
      <span 
        className={cn(
          "px-4 text-sm font-medium text-muted-foreground",
          textClassName
        )}
      >
        {text}
      </span>
      <Separator className={cn("flex-grow w-auto", lineClassName)} />
    </div>
  )
}

export { Divider };