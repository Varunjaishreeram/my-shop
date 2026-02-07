"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Simple debounce implementation to wait for typing to stop
    const handleSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }

        // Reset page to 1 if you had pagination (optional)
        // params.set("page", "1");

        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    return (
        <div className="relative">
            <Input
                placeholder="Search herbs..."
                className="pr-8 bg-white"
                onChange={(e) => {
                    // Basic timeout debounce
                    setTimeout(() => handleSearch(e.target.value), 300);
                }}
                defaultValue={searchParams.get("q")?.toString()}
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
        </div>
    );
}