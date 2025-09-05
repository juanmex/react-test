export type Invoice = {
  id: number;
  invoice_number: string;
  total: string;
  invoice_date: string;
  status: string;
  active: boolean;
};

export type InvoicesParams = {
  page?: number;
  per_page?: number;
  start_date?: string;
  end_date?: string;
};
