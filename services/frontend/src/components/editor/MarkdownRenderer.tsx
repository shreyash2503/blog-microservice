import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import { cn } from "@/lib/utils";


interface MarkdownRenderProps {
    content: string;
    className?: string;
}

export default function MarkdownRenderer({content, className} : MarkdownRenderProps) {
    return (
        <div className={cn("prose dark:prose-invert max-w-none", className)}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>

        </div>

    )
}