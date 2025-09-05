export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export type Header<T extends string = string> = {
  key: T;       
  label: string;
  format?: (value: any) => React.ReactNode;
};

export type TableProps<T extends Record<string, any>> = {
  headers: Header[];
  rows: T[];
  rowKey?: (row: T, idx: number) => string | number;
};
