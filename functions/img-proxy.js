export async function onRequest({ request }) {
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(decodeURIComponent(target), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "Referer": "https://movie.douban.com/"
      }
    });

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    const headers = new Headers({
      "Content-Type": response.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*"
    });

    return new Response(response.body, {
      status: 200,
      headers
    });
  } catch (error) {
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
}
