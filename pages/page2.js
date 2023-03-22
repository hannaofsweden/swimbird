import Head from "next/head";
import { useState, useMemo } from "react";
import useSWR from "swr";
import { orderBy } from "lodash";
import classNames from "classnames";

import fetcher from "lib/fetcher";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const columns = [
  {
    name: "id",
    displayName: "ID",
  },
  {
    name: "accountId",
    displayName: "Account ID",
  },
  {
    name: "bank",
    displayName: "Bank",
  },
  {
    name: "balance",
    displayName: "Balance",
  },

  {
    name: "currency",
    displayName: "Currency",
  },
  ,
];

export default function Page2() {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "https://private-9b37c2-wlb.apiary-mock.com/accounts?ccy=SEK",
    fetcher
  );

  const sortedData = useMemo(() => {
    if (!data) return null;
    return orderBy(data, sortColumn, sortOrder);
  }, [data, sortColumn, sortOrder]);

  const handleClickLoadButton = () => {
    mutate();
  };

  const handleColumnClick = (columnName) => () => {
    if (sortColumn === columnName) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  if (error) return "An error occurred when retrieving table data.";

  return (
    <>
      <Head>
        <title>Frontend Task for Swimbird - page 1</title>
      </Head>
      <main>
        <div className="container mx-auto p-2">
          <div className="text-center md:text-right p-4">
            <button
              className={classNames(
                isLoading || isValidating ? "bg-gray-300" : "bg-emerald-400",
                "rounded-xl py-3 px-4 text-md text-white w-[200px]"
              )}
              onClick={handleClickLoadButton}
            >
              <ReloadOutlined
                className={classNames(
                  "relative -top-1 mr-2",
                  (isLoading || isValidating) && "animate-spin"
                )}
              />
              {isLoading || isValidating ? "Loading..." : "Reload data"}
            </button>
          </div>
          {sortedData && (
            //Mobile: list
            <div className="md:hidden"></div>

            //Desktop: table
            <table className="hidden md:block w-full shadow-sm">
              <thead>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className="border border-gray-300 bg-gray-100 p-2 cursor-pointer"
                    onClick={handleColumnClick(col.name)}
                  >
                    <div className="flex items-top select-none">
                      <span className="mr-1">{col.displayName}</span>
                      <span className="w-4 relative -top-1">
                        {sortColumn === col.name && sortOrder === "asc" && (
                          <CaretDownOutlined />
                        )}
                        {sortColumn === col.name && sortOrder === "desc" && (
                          <CaretUpOutlined />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </thead>
              {sortedData.map((row, rowIndex) => (
                <>
                  <tr>
                    {columns.map((col) => (
                      <td
                        className="text-right border p-2 border-grey-400"
                        key={col.id}
                      >
                        {row[col.name]}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
            </table>
          )}
        </div>
      </main>
    </>
  );
}
