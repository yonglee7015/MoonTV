export async function onRequest({ request }) {
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) return new Response("no url", { status: 400 });

  try {
    const res = await fetch(decodeURIComponent(target), {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://movie.douban.com"
      }
    });

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=86400");
    res.headers.forEach((v, k) => {
      if (["content-type", "content-length"].includes(k.toLowerCase())) {
        headers.set(k, v);
      }
    });

    return new Response(res.body, {
      status: res.status,
      headers
    });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
}
