"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user || !isAdmin) {
      if (pathname !== "/admin") {
        router.replace("/admin");
      } else {
        setAuthorized(true); // Allow them to see the login page
      }
    } else {
      if (pathname === "/admin") {
        router.replace("/admin/dashboard");
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, isAdmin, router, pathname]);

  if (loading || !authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return <>{children}</>;
}
