import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/all-articles?"],
      },
    ],
    sitemap: "https://www.elearning-tools.com/sitemap.xml",
    host: "https://www.elearning-tools.com",
  };
}
