export const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "link", title: "Project Link", type: "url" },
    { name: "techs", title: "Technologies", type: "array", of: [{ type: "string" }] },
  ],
};
