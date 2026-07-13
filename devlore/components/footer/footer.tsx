import { Geist } from "next/font/google";
const geist = Geist({
  subsets: ["latin"],
});
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex-center border-t border-gray-200 h-10">
      <div className={`${geist.className}`}>
        © {currentYear} Full Rights Reserved. Built by Jawed
      </div>
    </footer>
  );
};

export default Footer;
