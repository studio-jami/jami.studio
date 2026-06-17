import { createLlmsFullTxt } from "@/lib/ai-public-files";

export const dynamic = "force-static";

export function GET() {
  return new Response(createLlmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}
