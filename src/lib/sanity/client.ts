import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-02-29",
  useCdn: false,
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Typed query functions
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    name,
    description,
    tech,
    features,
    link,
    github,
    "image": image.asset->url
  }`);
}

export async function getPackages() {
  return client.fetch(`*[_type == "package"] | order(_createdAt desc) {
    _id,
    name,
    description,
    downloads,
    version,
    npmLink,
    githubLink,
    documentation,
    tags,
    "image": image.asset->url
  }`);
}

export async function getWorkshops() {
  return client.fetch(`*[_type == "workshop"] | order(_createdAt desc) {
    _id,
    title,
    description,
    duration,
    level,
    topics,
    github,
    upcoming,
    recordingLink,
    resources
  }`);
}

export async function getSkills() {
  return client.fetch(`*[_type == "skillCategory"] {
    _id,
    name,
    description,
    "icon": icon.asset->url,
    colors,
    "skills": *[_type == "skill" && references(^._id)] {
      _id,
      name,
      description,
      "icon": icon.asset->url,
      colors,
      subSkills
    }
  }`);
}

export async function debugQuery(query: string) {
  const result = await client.fetch(query);
  console.log("Query result:", JSON.stringify(result, null, 2));
  return result;
}
