"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Function to update height
    const updateHeight = () => setHeight(window.innerHeight);

    // Set height initially
    updateHeight();

    // Listen for window resize
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <div>
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        height={height - 100}
      />
    </div>
  );
}
