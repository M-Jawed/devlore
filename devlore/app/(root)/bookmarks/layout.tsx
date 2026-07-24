import NavigationLinks from "./navigation-links";

const BookmarkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <NavigationLinks />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default BookmarkLayout;
