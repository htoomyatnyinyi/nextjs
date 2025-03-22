import Links from "./links/Links";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white flex justify-between  p-4">
      <div>Logo</div>
      <Links />
      <h2>Hi</h2>
    </div>
  );
};

export default Navbar;
