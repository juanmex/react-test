import { api } from "../../../lib/api/Client";
import { PaginationResponse } from "../../../types/pagination";
import { InvoicesParams, Invoice } from "../types";

function buildQuery(params: InvoicesParams) {
  const query = new URLSearchParams();
  (Object.entries(params) as [keyof InvoicesParams, InvoicesParams[keyof InvoicesParams]][])
    .forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(String(key), String(value));
      }
    });
  return query.toString();
}

export async function getInvoices(
  params: InvoicesParams = {}
): Promise<PaginationResponse<Invoice>> {
  const query = buildQuery(params);
  const endpoint = query ? `/api/v1/invoices?${query}` : "/api/v1/invoices";
  return api.get<PaginationResponse<Invoice>>(endpoint);
}
