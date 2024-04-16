import { useState } from "preact/hooks";

export default function CreateInvoice() {
  const [form, setForm] = useState<Invoice>();
  const [lines, setLines] = useState<InvoiceLine[]>([]);
  const [taxs, setTaxs] = useState<InvoiceTax[]>([]);

  const handleAddLine = () => {
    setLines([
      ...lines,
      {
        id: lines.length + 1,
        description: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveLine = (id: number) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const handleAddTax = () => {
    setTaxs([
      ...taxs,
      {
        id: taxs.length + 1,
        description: "",
        rate: "",
        total: 0,
      },
    ]);
  };

  const handleRemoveTax = (id: number) => {
    setTaxs(taxs.filter((tax) => tax.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lines,
          taxs,
        }),
      });
    } catch (error) {
    }
  };

  const Responsive = ({ children }: { children: any }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        color: "#fff",
        padding: "20px",
        width: "100%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Responsive>
        <label class={"colour"}>
          Name
        </label>
        <input
          type="text"
          required={true}
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        />
        <label class={"colour"}>
          Number
        </label>
        <input
          type="text"
          required={true}
          value={form?.number}
          onChange={(e) => setForm({ ...form, number: e.currentTarget.value })}
        />
        <label class={"colour"}>
          Date
        </label>
        <input
          type="date"
          required={true}
          value={form?.data}
          onChange={(e) => setForm({ ...form, data: e.currentTarget.value })}
        />
        <label class={"colour"}>
          Base
        </label>
        <input
          type="number"
          required={true}
          value={form?.base}
          onChange={(e) =>
            setForm({ ...form, base: Number(e.currentTarget.value) })}
        />
        <label class={"colour"}>
          Lines
        </label>
        {lines.map((line) => (
          <Responsive key={line.id}>
            <label class={"colour"}>
              Description
            </label>
            <input
              type="text"
              required={true}
              value={line.description}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, description: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label class={"colour"}>
              Quantity
            </label>
            <input
              type="number"
              required={true}
              value={line.quantity}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, quantity: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label class={"colour"}>
              Price
            </label>
            <input
              type="number"
              required={true}
              value={line.price}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, price: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label class={"colour"}>
              Total
            </label>
            <input
              type="number"
              required={true}
              value={line.total}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, total: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveLine(line.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Line
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddLine}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Line
        </button>
        <label class={"colour"}>
          Taxs
        </label>
        {taxs.map((tax) => (
          <Responsive key={tax.id}>
            <label>
              Description
            </label>
            <input
              type="text"
              required={true}
              value={tax.description}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id
                      ? { ...t, description: e.currentTarget.value }
                      : t
                  ),
                )}
            />
            <label class={"colour"}>
              Rate
            </label>
            <input
              type="number"
              required={true}
              value={tax.rate}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id ? { ...t, rate: e.currentTarget.value } : t
                  ),
                )}
            />
            <label class={"colour"}>
              Total
            </label>
            <input
              type="number"
              required={true}
              value={tax.total}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id ? { ...t, total: e.currentTarget.value } : t
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveTax(tax.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Tax
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddTax}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Tax
        </button>
        <label class={"colour"}>
          Total
        </label>
        <input
          type="number"
          required={true}
          value={form?.total}
          onChange={(e) =>
            setForm({ ...form, total: Number(e.currentTarget.value) })}
        />
      </Responsive>
      <button
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          width: "100%",
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

type Invoice = {
  name: string;
  number: string;
  data: string;
  base: number;
  total: number;
};

type InvoiceLine = {
  id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

type InvoiceTax = {
  id: number;
  description: string;
  rate: string;
  total: number;
};
