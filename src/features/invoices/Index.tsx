import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Filter from "./components/Filter";
import Pagination from "../../components/Pagination";
import { getInvoices } from "./services/api";
import { Invoice } from "./types";

export default function InvoicesIndex() {
  const headers = [
    { key: "invoice_number", label: "Factura" },
    { key: "total", label: "Total" },
    { key: "invoice_date", label: "Fecha" },
    { key: "status", label: "Status" },
    { key: "active", label: "Activo" },
  ];

  const [rows, setRows] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({ start_date: "", end_date: "" });

  const handleSearch = (values: { start_date: string; end_date: string }) => {
    setPage(1)
    setFilters(values);
  };

  const handleClear = () => {
    setFilters({ start_date: "", end_date: "" });
    setPage(1)
  };

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true);
        const data = await getInvoices({page, ...filters});
        setRows(data.data);
        setTotal(data.meta.count);
        setPages(data.meta.pages);
        setPage(data.meta.page);
        setPerPage(data.meta.per_page);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, [page, filters]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Invoices</h1>
      {loading && <p>Loading invoices...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <Filter
            initialStart={filters.start_date}
            initialEnd={filters.end_date}
            onSearch={handleSearch}
            onClear={handleClear}
          />
          <Table headers={headers} rows={rows} rowKey={(r) => r.id} />
          <Pagination
            count={total}
            pages={pages}
            page={page}
            per_page={perPage}
            onChange={(p) => setPage(p)}
        />
        </>
      )}
    </div>
  );
}
