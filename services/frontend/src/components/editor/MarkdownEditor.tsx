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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const requestOptions = {
        method: "POST",
        body: formData
      }
      const response = await fetch(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL as string, requestOptions)
      const body = await response.json();
      setValue((prev) => {
        return `${prev}\n<img src="${body.url}" width="300" height="200" />)`

      })
    }
  }


  
  return (
    <>
      <div 
        onDragStart={handleDragOver}
        onDrop={async (e) => handleDrop(e)}
        >

        <MDEditor
          value={value}
          onChange={(val) => setValue(val || "")}
          height={height - 100}
        />
      </div>
      {/* <div dangerouslySetInnerHTML={{__html: processMarkdown}} /> */}

    </>
  );
}
