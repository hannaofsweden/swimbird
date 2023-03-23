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

  const { data, error, isValidating, mutate } = useSWR(
    "https://private-9b37c2-wlb.apiary-mock.com/accounts?ccy=SEK",
    fetcher
  );

  const sortedData = useMemo(() => {
    if (!data) return null;
    return orderBy(data, sortColumn, sortOrder);
  }, [data, sortColumn, sortOrder]);

  const handleLoadloadButtonClick = () => {
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

  const loadButton = (
    <button
      className={classNames(
        isValidating ? "bg-gray-300" : "bg-emerald-400",
        "rounded-xl text-md text-left pl-5 py-3 text-md text-white w-[155px] whitespace-nowrap"
      )}
      onClick={handleLoadloadButtonClick}
    >
      <ReloadOutlined
        className={classNames(
          "relative -top-1 mr-2",
          isValidating && "animate-spin"
        )}
      />
      {isValidating ? "Loading..." : "Reload data"}
    </button>
  );

  if (error) return "An error occurred when retrieving table data.";

  return (
    <>
      <Head>
        <title>Frontend Task for Swimbird - Page 2</title>
      </Head>
      <main>
        <div className="container mx-auto p-2">
          {sortedData && (
            <div>
              {/* Mobile: list */}
              <div className="md:hidden">
                <div className="pb-2 flex justify-between items-center">
                  <span className="text-2xl">Your accounts</span>
                  {loadButton}
                </div>
                {data.map((row) => (
                  <div
                    key={row.id}
                    className="border rounded-lg border-gray-400 p-4 mb-4 flex justify-between items-baseline"
                  >
                    <span className="text-lg font-medium">
                      {row.accountId} ({row.bank})
                    </span>
                    <span>
                      {row.balance} {row.currency}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden md:block">
                <div className="pb-2 flex justify-between items-center">
                  <span className="text-2xl">Your accounts</span>
                  {loadButton}
                </div>
                <table className="w-full shadow-sm">
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
                            {sortColumn === col.name &&
                              sortOrder === "desc" && <CaretUpOutlined />}
                          </span>
                        </div>
                      </th>
                    ))}
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
