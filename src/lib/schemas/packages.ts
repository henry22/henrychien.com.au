export default {
  name: "package",
  title: "Packages",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Package Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "version",
      title: "Current Version",
      type: "string",
    },
    {
      name: "npmLink",
      title: "NPM Package Link",
      type: "url",
    },
    {
      name: "githubLink",
      title: "GitHub Repository",
      type: "url",
    },
    {
      name: "documentation",
      title: "Documentation URL",
      type: "url",
    },
    {
      name: "downloads",
      title: "Weekly Downloads",
      type: "number",
    },
    {
      name: "tags",
      title: "Package Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Package Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "featured",
      title: "Featured Package",
      type: "boolean",
      description: "Show this package in the featured section",
    },
  ],
};
