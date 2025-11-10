"use client";
import { searchString } from "@/app/action";
import { useData } from "@/app/DataContext";

export default function SearchForm() {
  const { setSearch } = useData();
  return (
    <form
      action={async (formData) => {
        const searchStr = (await searchString(formData)) as string;
        setSearch(searchStr);
      }}
    >
      <input
        type="text"
        name="searchPost"
        placeholder="search"
        className="border-1 px-3 py-1 rounded-xl"
      />
      <button className="border-1 px-3 py-1 ml-2 rounded-xl hover:scale-103">
        Search Post
      </button>
    </form>
  );
}
