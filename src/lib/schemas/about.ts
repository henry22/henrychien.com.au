export default {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "background",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
