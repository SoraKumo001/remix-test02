import { createCache } from "@react-libraries/use-ssr";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

const cache = document.querySelector("script#__REMIX_DATA")?.innerHTML;
cache && createCache(JSON.parse(cache));
hydrateRoot(document, <RemixBrowser />);
