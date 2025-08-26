import { SearchBar } from "../common/Searchbar";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <SearchBar />
      <div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">User</button>
      </div>
    </header>
  );
}
