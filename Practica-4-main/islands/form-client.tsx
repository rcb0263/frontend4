import { useState } from "preact/hooks";

export default function ClientForm() {
  const [client, setClient] = useState<Client>({
    Name: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    Phone: "",
  });

  function handleChange(event: any) {
    event.preventDefault();
    fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
      onSubmit={handleChange}
    >
      <input
        type="text"
        placeholder="Name"
        required={true}
        value={client?.Name}
        onChange={(event) => setClient({ ...client, Name: event.target.value })}
      />
      <input
        type="Email"
        placeholder="Email"
        required={true}
        value={client?.Email}
        onChange={(event) =>
          setClient({ ...client, Email: event.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        required={true}
        value={client?.Address}
        onChange={(event) =>
          setClient({ ...client, Address: event.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        required={true}
        value={client?.City}
        onChange={(event) => setClient({ ...client, City: event.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        required={true}
        value={client?.Country}
        onChange={(event) =>
          setClient({ ...client, Country: event.target.value })}
      />
      <input
        type="number"
        placeholder="Phone"
        required={true}
        value={client?.Phone}
        onChange={(event) =>
          setClient({ ...client, Phone: event.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}

type Client = {
  Name: string;
  Email: string;
  Address: string;
  City: string;
  Country: string;
  Phone: string;
};
