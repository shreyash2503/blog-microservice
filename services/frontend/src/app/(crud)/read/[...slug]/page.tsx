import MarkdownRenderer from "@/components/editor/MarkdownRenderer";

export default function ReadBlog() {
    const markdownContent = `
  # Hello, Markdown!
  - This is a list
  - **Bold Text**
  - *Italic Text*

  \`\`\`js
  console.log("Code block example");
  \`\`\`
  `;
    return (
        <>
        <div className="flex flex-col max-w-full justify-center m-10">
            <MarkdownRenderer content={markdownContent} />
        </div>
        </>
    )

}