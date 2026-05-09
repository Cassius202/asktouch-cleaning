import DOMPurify from "isomorphic-dompurify";

export const BlogMarkdown = ({ html }: { html: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div className="px-4">
      <div
      className="
        prose prose-sm sm:prose-base lg:prose-lg max-w-none
        [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-gray-700
        [&_strong]:text-gray-900 [&_strong]:font-bold
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5
        [&_li]:mb-1.5 [&_li]:text-gray-700
        [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500
      "
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
    </div>
  );
};