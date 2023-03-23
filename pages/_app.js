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
        <Image src={logo.src} height={logo.height} width={logo.width} />
        <div className="md:text-2xl text-lg uppercase tracking-wide grid place-content-center">
          Frontend task
        </div>
      </div>

      <div className="grid grid-cols-2">
        {[
          ["Page 1", "/"],
          ["Page 2", "/page2"],
        ].map(([displayName, href]) => (
          <Link href={href}>
            <div className={tabColor(href)}>{displayName}</div>
          </Link>
        ))}
      </div>
      <div className="border border-gray-200">
        <Component {...pageProps} />
      </div>
      <div className="pt-8 text-gray-400 text-center mb-20">
        By Johanna Johansson
      </div>
    </div>
  );
}
