import React, { useState } from "react";
import Button from "../../../components/Button";

type DateFilterFormProps = {
  initialStart?: string;
  initialEnd?: string;
  onSearch: (values: { start_date: string; end_date: string }) => void;
  onClear: () => void;
};

export default function Filter({
  initialStart = "",
  initialEnd = "",
  onSearch,
  onClear,
}: DateFilterFormProps) {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ start_date: start, end_date: end });
  };

  const handleClear = () => {
    setStart("");
    setEnd("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end mb-4">
      <div className="flex flex-col">
        <label htmlFor="start" className="text-sm">Fecha inicio</label>
        <input
          type="date"
          id="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="end" className="text-sm">Fecha fin</label>
        <input
          type="date"
          id="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <Button type="submit" className="bg-black text-white hover:opacity-90">
        Buscar
      </Button>

      <Button
        type="button"
        onClick={handleClear}
        className="btn-ghost"
      >
        Limpiar
      </Button>
    </form>
  );
}
