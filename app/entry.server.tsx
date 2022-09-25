import { getDataFromTree, Provider } from "@react-libraries/use-ssr";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = await getDataFromTree(
    <RemixServer context={remixContext} url={request.url} />
  );
  const markup = renderToString(
    <Provider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
      <script
        id="__REMIX_DATA"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cache) }}
      />
    </Provider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
