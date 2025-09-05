import React from "react";

type Header<T extends string = string> = {
  key: T;       
  label: string;
};

type TableProps<T extends Record<string, any>> = {
  headers: Header[];
  rows: T[];
  rowKey?: (row: T, idx: number) => string | number;
};

export default function Table<T extends Record<string, any>>({
  headers,
  rows,
  rowKey = (_row, idx) => idx,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b">
            {headers.map((h) => (
              <th key={h.key} className="text-left text-sm font-semibold p-2">
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr
                key={rowKey(row, idx)}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                {headers.map((h) => (
                  <td key={h.key} className="text-sm p-2">
                    {row[h.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center p-4 text-sm">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
