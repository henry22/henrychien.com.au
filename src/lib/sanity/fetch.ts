import { client } from "./client";
import {
  heroQuery,
  skillsQuery,
  featuredProjectsQuery,
  featuredWorkshopsQuery,
  featuredPackagesQuery,
  aboutQuery,
} from "./queries";

export async function getHero() {
  return await client.fetch(heroQuery);
}

export async function getSkills() {
  return await client.fetch(skillsQuery);
}

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery);
}

export async function getFeaturedWorkshops() {
  return await client.fetch(featuredWorkshopsQuery);
}

export async function getFeaturedPackages() {
  return await client.fetch(featuredPackagesQuery);
}

export async function getAbout() {
  return await client.fetch(aboutQuery);
}
