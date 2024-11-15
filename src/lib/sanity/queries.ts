// Hero Section
export const heroQuery = `*[_type == "hero"][0] {
  title,
  subtitle,
  socialLinks,
  codeSnippet
}`;

// Skills Section
export const skillsQuery = `*[_type == "skillCategory"] {
  name,
  description,
  "icon": icon.asset->url,
  colors,
  skills[] {
    name,
    description,
    "icon": icon.asset->url,
    colors,
    subSkills
  }
}`;

// Featured Projects
export const featuredProjectsQuery = `*[_type == "project" && featured == true] {
  _id,
  name,
  description,
  "image": image.asset->url,
  tech,
  features[],
  link,
  github
}`;

// Featured Workshops
export const featuredWorkshopsQuery = `*[_type == "workshop" && featured == true] {
  title,
  description,
  duration,
  level,
  topics,
  github,
  upcoming,
  recordingLink,
  resources
}`;

// Featured Packages
export const featuredPackagesQuery = `*[_type == "package" && featured == true] {
  name,
  description,
  npm,
  github,
  downloads
}`;

// About Section
export const aboutQuery = `*[_type == "about"][0] {
  title,
  content,
  "background": background.asset->url
}`;
