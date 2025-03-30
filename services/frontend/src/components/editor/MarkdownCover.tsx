"use client";
import { useState } from "react";
import Spinner from "../ui/spinner";

interface MardownCoverProps {
  uploadImage: (file: File) => Promise<any>;
}

export default function MarkdownCover({ uploadImage }: MardownCoverProps) {
  const [hover, setHover] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const file = e.target.files[0];
        setLoading(true)
        const url = await uploadImage(file);
        setLoading(false);
        setCoverImage(url);

    }
  }

  return (
    <div
      className="relative w-full max-w-xs sm:max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {coverImage  && (
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      )}
      {
        loading && <Spinner />
      }
      <label
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold cursor-pointer transition-opacity ${
          hover ? "opacity-100" : "opacity-100 md:opacity-0"
        }`}
      >
        Upload Cover
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>
    </div>
  );
}
