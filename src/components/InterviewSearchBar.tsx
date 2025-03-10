
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const InterviewSearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex rounded-md shadow-sm">
      <Input
        type="text"
        placeholder="Search companies, positions..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="rounded-r-none"
      />
      <Button
        variant="outline"
        className="rounded-l-none"
        onClick={handleSearchClick}
      >
        <Search className="h-4 w-4 mr-1.5" />
        Search
      </Button>
    </div>
  );
};

export default InterviewSearchBar;
