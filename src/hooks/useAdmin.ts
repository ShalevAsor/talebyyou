// src/hooks/useAdmin.ts
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { isUserAdmin } from "@/actions/admin-actions";

export function useAdmin() {
  const { user, isLoaded } = useUser();

  return useQuery({
    queryKey: ["admin-status", user?.id],
    queryFn: () => isUserAdmin(user?.id || null),
    enabled: isLoaded && !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
