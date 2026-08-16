export const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "repo",
      title: "GitHub repo name",
      type: "string",
      description:
        "Exact repo name (e.g. erp-project-management). Fill this in to enrich a repo already pulled from GitHub. Leave blank for a project that has no repo.",
    },
    { name: "description", title: "Description", type: "text", rows: 3 },
    { name: "link", title: "Live demo link", type: "url" },
    { name: "image", title: "Screenshot", type: "image", options: { hotspot: true } },
    { name: "techs", title: "Technologies", type: "array", of: [{ type: "string" }] },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured projects are pinned to the top of the list.",
      initialValue: false,
    },
    {
      name: "hidden",
      title: "Hide from portfolio",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: { title: "title", subtitle: "repo", media: "image" },
  },
};
