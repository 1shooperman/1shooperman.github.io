export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ id: '_' }];
}

export default function ProjectByIdRedirect() {
  return (
    <div style={{ display: "none" }}>
      <meta httpEquiv="refresh" content="0; url=/blog/page/1" />
    </div>
  );
}
