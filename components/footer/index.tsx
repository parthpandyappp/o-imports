import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-sm md:text-base fixed bottom-0 left-0 right-0 bg-black py-2 md:py-4 text-center text-white font-semibold">
      © {new Date().getFullYear()} o-imports by{" "}
      <Link
        className="hover:text-fuchsia-200"
        href="https://linkedin.com/in/parthpandyappp"
      >
        @parthpandyappp
      </Link>
    </footer>
  );
};

export default Footer;
