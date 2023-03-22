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
    <span className="text-[100px] text-white drop-shadow-md">
      {text}
    </span>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Task for Swimbird - page 1</title>
      </Head>
      <main>
        <div className="container mx-auto p-2">
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              ["1", "bg-[#dce0d9] lg:col-span-2"],
              ["2", "bg-[#fbf6ef]"],
              ["3", "bg-[#ead7c3]"],
            ].map(([text, classes]) => (
              <Box {...{ text, classes }} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
