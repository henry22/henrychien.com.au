import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-14',
  useCdn: false,
  perspective: 'published',
  stega: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any): ImageUrlBuilder {
  if (!source?.asset?._ref) {
    console.warn('Invalid image source:', source)
    // Return a default builder instead of a string
    return builder.image({})
  }
  return builder.image(source)
}

export async function fetchPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    mainImage,
    content,
    estimatedReadingTime
  }`,
    { slug },
  )
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
    features,
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
    resources,
    "image": image.asset->url
  }`)
}

export async function getSkills() {
  return client.fetch(`*[_type == "skillCategory"] {
    _id,
    name,
    description,
    icon,
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

export async function getHero() {
  return client.fetch(`*[_type == "hero"][0] {
    _id,
    title,
    subtitle,
    socialLinks,
    codeSnippet[] {
      ...,
      _type,
      _key,
      language,
      code
    }
  }`)
}
