import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { Image } from 'sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-14',
  useCdn: false,
  perspective: 'published',
  stega: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: Image): ImageUrlBuilder {
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
    estimatedReadingTime,
    type,
    readTime,
    difficulty
  }`,
    { slug }
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
    featured,
    "image": image.asset->url
  }`)
}

export async function getFeaturedProjects() {
  return client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    description,
    tech,
    link,
    github,
    features,
    featured,
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

export async function fetchPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    type,
    readTime,
    difficulty
  }`)
}
