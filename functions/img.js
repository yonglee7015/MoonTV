export async function onRequest({ request }) {
  const url = new URL(request.url);
  const imgUrl = url.searchParams.get("url");

  if (!imgUrl) {
    return new Response("missing url", { status: 400 });
  }

  try {
    const res = await fetch(decodeURIComponent(imgUrl), {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://movie.douban.com/"
      }
    });

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", res.headers.get("content-type") || "image/jpeg");

    return new Response(res.body, { headers });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
}
