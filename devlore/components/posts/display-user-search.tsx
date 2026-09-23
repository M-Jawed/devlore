import { User } from "@/types";
import UserSearchCard from "./display-user-search-card";

const UserSearch = ({ users }: { users: User[] }) => {
  return (
    <section className="px-7 mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {users.length > 0 &&
        users.map((user) => <UserSearchCard key={user._id} user={user} />)}
    </section>
  );
};

export default UserSearch;
