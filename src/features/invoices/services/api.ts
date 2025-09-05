import { api } from "../../../lib/api/Client";

export type Invoice = {
  id: number;
  invoice_number: string;
  total: string;
  invoice_date: string;
  status: string;
  active: boolean;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: {
    pages: number;
    page: number;
    per_page: number;   
    total: number;      
    count: number;     
  };
};

export type InvoicesParams = {
  page?: number;
  per_page?: number;
  start_date?: string;
  end_date?: string;
};

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
