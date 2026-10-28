import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const DashboardSearch = () => {
  return (
    <div>
      <InputGroup>
        <InputGroupInput
          type="search"
          placeholder="Search..."
          name="search"
          id="search"
          className="w-full h-full"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default DashboardSearch;
