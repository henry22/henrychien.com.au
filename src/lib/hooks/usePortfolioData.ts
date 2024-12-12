import { useQuery } from '@tanstack/react-query'
import { getPackages, getProjects, getWorkshops, getSkills, getAbout } from '../sanity/client'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  })
}

export function useWorkshops() {
  return useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshops,
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
