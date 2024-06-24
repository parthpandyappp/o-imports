// react-icons
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black">
      <div className="py-4 md:py-6 px-12 md:px-16 lg:px-32 flex items-center justify-between">
        <h1 className="text-white font-bold text-base md:text-xl">o-imports</h1>
        <Link
          href="https://github.com/parthpandyappp/o-imports"
          className="flex gap-2 items-center font-semibold text-lg bg-white p-1 md:px-4 md:py-1 rounded-full md:rounded"
        >
          <FaGithub size={24} className="w-4 h-4 md:w-full md:h-full" />
          <span className="hidden md:block">GitHub</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
