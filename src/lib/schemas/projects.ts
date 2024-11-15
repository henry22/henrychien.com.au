export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Project Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tech",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "link",
      title: "Live Demo Link",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub Repository",
      type: "url",
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show this project in the featured section",
    },
  ],
};
