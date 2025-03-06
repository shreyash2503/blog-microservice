"use client";
import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import markdownProcessor from "@/lib/markdown-processor";
import { Input } from "../ui/input";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor() {
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(""); //www.ilovepdf.com/img/ilovepdf.svg"/>`);
  const [processMarkdown, setProcessedMarkdown] = useState("");
  const divRef = useRef<HTMLDivElement | null>(null);

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
    const div = divRef.current;
    if (div) {
      div.addEventListener("paste", handleImagePaste);
      return () => div.removeEventListener("paste", handleImagePaste);
    }
  });

  useEffect(() => {
    const processMarkdown = async () => {
      if (value) {
        const result = await markdownProcessor(value);
        setProcessedMarkdown(result);
      }
    };
    processMarkdown();
  }, [value]);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL as string,
      requestOptions
    );
    const body = await response.json();
    setValue((prev) => {
      return `${prev}\n<img src="${body.url}" width="300" height="200" />`;
    });
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  async function handleImagePaste(
    event: React.DragEvent<HTMLDivElement> | ClipboardEvent
  ) {
    event.preventDefault();
    if (
      !(event instanceof ClipboardEvent) &&
      event.dataTransfer.files.length > 0
    ) {
      const file = event.dataTransfer.files[0];
      await uploadImage(file);
    } else {
      const clipBoardData =
        (event as ClipboardEvent).clipboardData ||
        (window as any).clipboardData;
      if (clipBoardData?.files && clipBoardData.files.length > 0) {
        const file = clipBoardData.files[0];
        await uploadImage(file);
      }
    }
  }

  return (
    <>
      <div
        onDragStart={handleDragOver}
        onDrop={async (e) => handleImagePaste(e)}
        ref={divRef}
      >
        <Input placeholder="Enter a name for the blog" className="w-fit" />
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
