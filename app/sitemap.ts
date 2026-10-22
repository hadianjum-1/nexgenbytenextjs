
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexgenbyte.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/tools/qr-code-generator`,
      changeFrequency: "monthly",
    },
  ];
}
