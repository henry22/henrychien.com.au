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
      name: "npm",
      title: "NPM Package Link",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub Repository",
      type: "url",
    },
    {
      name: "downloads",
      title: "Weekly Downloads",
      type: "number",
    },
    {
      name: "featured",
      title: "Featured Package",
      type: "boolean",
      description: "Show this package in the featured section",
    },
  ],
};
