import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div>
      <header className="bg-primary shadow-md body-font">
        <div className="md:container md:mx-auto flex flex-wrap py-5 px-10 flex-col sm:flex-row items-center">
          <Link href="/">
            <button className="logo px-4 py-1 text-lg font-bold text-primary w-24">
              MSRgb
            </button>
          </Link>
          <nav className="sm:ml-auto sm:mt-0 mt-4 flex flex-wrap items-center text-primary justify-center">
            <Link href="/about">
              <a className="mr-5 hover:text-accent_blue">About</a>
            </Link>
            <Link href="/blog">
              <a className="mr-5 hover:text-accent_blue">Blog</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-accent_blue">Contact</a>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
