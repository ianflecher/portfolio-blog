import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "1665g2am", // from sanity.json or Sanity Studio
  dataset: "production",
  apiVersion: "2025-09-08", // use today's date
  useCdn: true, // `false` if you want fresh data
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
