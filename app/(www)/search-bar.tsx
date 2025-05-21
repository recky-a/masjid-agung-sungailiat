"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <search title="Pencarian">
      {/* TODO: Add <form> later on */}
      <Button variant="outline" size="icon" aria-label="Cari">
        <Search />
      </Button>
    </search>
  );
}
