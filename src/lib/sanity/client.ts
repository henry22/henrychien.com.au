import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-14',
  useCdn: false,
  perspective: 'published',
  stega: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Typed query functions
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    name,
    description,
    tech,
    link,
    github,
    "image": image.asset->url
  }`)
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
  }`)
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
  }`)
}

export async function getSkills() {
  return client.fetch(`*[_type == "skillCategory"] {
    _id,
    name,
    description,
    "icon": icon.asset->url,
    colors,
   skills[] {
        name,
        description,
        icon,
        colors,
        subSkills
      }
  }`)
}

export async function getAbout() {
  return client.fetch(`*[_type == "about"][0] {
    _id,
    title,
    content,
    background
  }`)
}
