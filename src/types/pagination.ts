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

export type PaginationProps = {
  count: number;
  pages: number;
  page: number;
  per_page: number;
  onChange?: (nextPage: number) => void;
  maxNumbers?: number;
};
