import { getBlog } from "@/actions/blog-crud";
import MarkdownRenderer from "@/components/editor/MarkdownRenderer";

export default async function ReadBlog({params} : {params: Promise<{slug: string}>}) {
    const markdownContent = `
  # Hello, Markdown!
  - This is a list
  - **Bold Text**
  - *Italic Text*

  \`\`\`js
  console.log("Code block example");
  \`\`\`
  `;
  const {slug} = await params;
  const data = await getBlog(slug as string);
    return (
        <>
        <div className="flex flex-col max-w-full justify-center m-10">
            <MarkdownRenderer content={data.content} />
        </div>
        </>
    )

}