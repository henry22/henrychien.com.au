export default {
  name: "skillCategory",
  title: "Skill Categories",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
    },
    {
      name: "colors",
      title: "Theme Colors",
      type: "object",
      fields: [
        { name: "light", title: "Light Mode Color", type: "string" },
        { name: "dark", title: "Dark Mode Color", type: "string" },
      ],
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Skill Name", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Icon", type: "image" },
            {
              name: "colors",
              title: "Theme Colors",
              type: "object",
              fields: [
                { name: "light", title: "Light Mode Color", type: "string" },
                { name: "dark", title: "Dark Mode Color", type: "string" },
              ],
            },
            {
              name: "subSkills",
              title: "Sub Skills",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
};
