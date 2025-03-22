"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // TEmp

  const session = true ;
  const isAdmin = true;

  return (
    <div className="flex">
      {links.map((link) => (
        <NavLink name={link.name} path={link.path} />
      ))}
      {session ? (
        <>
          {isAdmin && <NavLink name="Admin" path="/admin" />}
          <button>Logout</button>
        </>
      ) : (
        <NavLink name="Login" path="/login" />
      )}
    </div>
  );
};

export default Links;

const NavLink = ({ name, path }) => {
  const pathname = usePathname();
  return (
    <div>
      <Link
        href={path}
        className={`p-2 ${
          pathname === path ? "border-b-2 border-b-cyan-600" : "text-cyan-300"
        }`}
      >
        {name}
      </Link>
    </div>
  );
};

// const NavLink = (props) => {
//   const pathname = usePathname();
//   return (
//     <div>
//       <Link
//         href={props.path}
//         className={`p-2 ${
//           pathname === props.path
//             ? "border-b-2 border-b-cyan-600"
//             : "text-cyan-300"
//         }`}
//       >
//         {props.name}
//       </Link>
//     </div>
//   );
// };
