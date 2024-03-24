import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-pink-500">
      <ul className="flex flex-row justify-between py-4">
        <li className="py-3 px-5">
          <Link
            className="text-white ml-5 font-montesserat text-[2rem] font-extrabold"
            href="/"
          >
            SwiftGift
          </Link>
        </li>
        <div className="w-[500]">
          <div className="flex flex-row jsutify-between px-5 py-3">
            <Link className="py-3 px-2 text-white" href="/">
              Home
            </Link>
            <Link className="py-3 px-2 text-white" href="/friendlist">
              WishList
            </Link>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
