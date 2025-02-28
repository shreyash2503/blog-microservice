"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import markdownProcessor from "@/lib/markdown-processor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor() {
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(`<img src="https://www.ilovepdf.com/img/ilovepdf.svg"/>`);
  const [processMarkdown, setProcessedMarkdown] = useState("");

  useEffect(() => {
    // Function to update height
    const updateHeight = () => setHeight(window.innerHeight);

    // Set height initially
    updateHeight();

    // Listen for window resize
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  
  useEffect(() => {
    const processMarkdown = async () => {
      if (value) {
        const result = await markdownProcessor(value);
        setProcessedMarkdown(result);
      }

    }
    processMarkdown()
  }, [value]);


  
  return (
    <>
      <div>
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || "")}
          height={height - 100}
        />
      </div>
      <div dangerouslySetInnerHTML={{__html: processMarkdown}} />

    </>
  );
}
