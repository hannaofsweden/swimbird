import Head from "next/head";
import classNames from "classnames";

const Box = ({ text, classes }) => (
  <div
    key={text}
    className={classNames(
      "grid place-content-center p-[50px] rounded-lg",
      classes
    )}
  >
    <span className="text-[100px] text-white drop-shadow-md">{text}</span>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Task for Swimbird - Page 1</title>
      </Head>
      <main>
        <div className="container mx-auto p-2">
          <div className=" grid gap-4 md:grid-cols-2">
            {[
              ["3", "bg-[#dce0d9] md:col-span-2 md:order-last"],
              ["2", "bg-[#fbf6ef]"],
              ["1", "bg-[#ead7c3] md:order-first"],
            ].map(([text, classes]) => (
              <Box key={text} {...{ text, classes }} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
