import "styles/globals.css";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import logo from "public/swimbird-logo.png";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const tabColor = (tab) => {
    let color, bgColor;
    if (tab === router.pathname) {
      color = "bg-gray-100 text-gray-700";
    } else {
      color = "border-gray-200 text-gray-400";
    }
    return classNames(
      color,
      "text-center border-t border-r border-l rounded-t-lg p-4"
    );
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 pb-4">
        <Image
          src={logo.src}
          height={logo.height}
          width={logo.width}
          alt="Logo"
        />
        <div className="text-lg uppercase tracking-wide grid place-content-center md:text-2xl">
          Frontend task
        </div>
      </div>

      <div className="grid grid-cols-2">
        {[
          ["1. Layout", "/"],
          ["2. Tables", "/page2"],
        ].map(([displayName, href]) => (
          <Link key={href} href={href}>
            <div className={tabColor(href)}>{displayName}</div>
          </Link>
        ))}
      </div>
      <div className="border border-gray-200">
        <Component {...pageProps} />
      </div>
      <div className="pt-8 text-gray-300 text-center mb-20">
        By{" "}
        <Link
          alt="Repo"
          className="text-gray-400"
          href="https://www.linkedin.com/in/hannaofsweden/"
        >
          Johanna Johansson
        </Link>
        {". See the "}
        <Link
          alt="Repo"
          className="text-gray-400"
          href="https://github.com/hannaofsweden/swimbird"
        >
          Github repo
        </Link>
        {" here"}
      </div>
    </div>
  );
}
