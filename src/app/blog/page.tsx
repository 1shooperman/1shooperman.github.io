export const dynamic = "force-static";

export default function RedirectToPage1() {
  return (
    <div style={{ display: "none" }}>
      <meta httpEquiv="refresh" content="0; url=/blog/page/1" />
    </div>
  );
}
