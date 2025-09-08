import { useQuery } from '@tanstack/react-query'
import { getProjects, getFeaturedProjects, getSkills, getAbout } from '../sanity/client'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['featuredProjects'],
    queryFn: getFeaturedProjects,
  })
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  })
}

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAbout,
  })
}
