// react-icons
import { FaGithub } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="flex-none bg-black">
      <div className="py-6 px-12 md:px-16 lg:px-32 flex items-center justify-between">
        <h1 className="text-white font-bold text-xl">o-imports</h1>
        <button className="flex gap-2 items-center font-semibold text-lg bg-white px-4 py-1 rounded">
          <FaGithub size={24} />
          GitHub
        </button>
      </div>
    </nav>
  );
};

export default Nav;
