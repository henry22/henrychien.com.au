import { useQuery } from "@tanstack/react-query";
import { getPackages, getProjects, getWorkshops } from "../sanity/client";
import { getSkills } from "../sanity/fetch";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });
}

export function useWorkshops() {
  return useQuery({
    queryKey: ["workshops"],
    queryFn: getWorkshops,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
}
