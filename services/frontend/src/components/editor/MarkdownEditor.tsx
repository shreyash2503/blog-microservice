"use client";
import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import markdownProcessor from "@/lib/markdown-processor";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createBlog} from "@/actions/blog-crud";
import MarkdownCover from "./MarkdownCover";

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
    return body.url;
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
      const url = await uploadImage(file);
      setValue((prev) => {
        return `${prev}\n<img src="${url}" width="300" height="200" />`;
      });
    } else {
      const clipBoardData =
        (event as ClipboardEvent).clipboardData ||
        (window as any).clipboardData;
      if (clipBoardData?.files && clipBoardData.files.length > 0) {
        const file = clipBoardData.files[0];
        const url = await uploadImage(file);
        setValue((prev) => {
          return `${prev}\n<img src="${url}" width="300" height="200" />`;
        });
      }
    }
  }

  return (
    <>
      <form action={createBlog}>
        <div
          onDragStart={handleDragOver}
          onDrop={async (e) => await handleImagePaste(e)}
          ref={divRef}
          className="gap-3 flex flex-col items-center md:items-start"
        >
          <Input
            placeholder="Enter a name for the blog"
            className="w-fit"
            name="name"
          />
          <Select name="category">
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Technology</SelectItem>
                <SelectItem value="51">Health</SelectItem>
                <SelectItem value="101">LifeStyle</SelectItem>
                <SelectItem value="151">Education</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <MarkdownCover uploadImage={uploadImage} />
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || "")}
            height={height - 100}
            preview="edit"
            className="mb-1 md:w-full"
          />
          <input className="hidden" value={value} name="content" readOnly />
          <div className="w-full flex justify-end m-1">
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
      {/* <div dangerouslySetInnerHTML={{__html: processMarkdown}} /> */}
    </>
  );
}
