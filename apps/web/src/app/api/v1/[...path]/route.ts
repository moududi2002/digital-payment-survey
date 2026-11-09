const API_BASE_URL =
  process.env.SURVEY_API_INTERNAL_URL || "http://127.0.0.1:5180";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(
  request: Request,
  context: RouteContext
): Promise<Response> {
  try {
    const { path } = await context.params;
    const endpoint = path.join("/");

    const allowed =
      (request.method === "GET" && endpoint === "survey/config") ||
      (request.method === "POST" && endpoint === "survey/submissions");

    if (!allowed) {
      return Response.json(
        { statusCode: 404, message: "Not found." },
        { status: 404 }
      );
    }

    const targetUrl = new URL(
      `/api/v1/${endpoint}`,
      API_BASE_URL
    );

    const headers = new Headers();
    const contentType = request.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method === "GET"
          ? undefined
          : await request.text(),
      cache: "no-store",
      signal: AbortSignal.timeout(15000)
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ||
          "application/json"
      }
    });
  } catch {
    return Response.json(
      {
        statusCode: 502,
        message: "Survey API is currently unavailable."
      },
      { status: 502 }
    );
  }
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context);
}