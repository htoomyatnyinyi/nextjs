import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotFound;
