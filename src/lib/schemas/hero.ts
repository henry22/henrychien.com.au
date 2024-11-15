export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      default: "Crafting Digital Experiences",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      default:
        "Full Stack Developer with a focus on Frontend, passionate about crafting beautiful and functional web applications",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "twitter", title: "Twitter URL", type: "url" },
        { name: "resume", title: "Resume URL", type: "url" },
      ],
    },
    {
      name: "codeSnippet",
      title: "Code Snippet",
      type: "text",
    },
  ],
};
