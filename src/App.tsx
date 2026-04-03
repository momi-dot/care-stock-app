import { FormEvent, useMemo, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase";

type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  threshold: number;
};

const starterItems: InventoryItem[] = [
  { id: 1, name: 'Bandages', sku: 'MED-1001', quantity: 52, threshold: 20 },
  { id: 2, name: 'Latex Gloves', sku: 'MED-1010', quantity: 14, threshold: 15 },
  { id: 3, name: 'Pain Reliever', sku: 'MED-1120', quantity: 34, threshold: 10 }
];

export default function App() {
  const db = getFirestore(app);
  useEffect(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(data);
  };

  fetchData();
}, []);

  const [items, setItems] = useState<InventoryItem[]>(starterItems);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);

  const lowStockItems = useMemo(
    () => items.filter((item) => item.quantity <= item.threshold),
    [items]
  );

  const addItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !sku.trim()) {
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        quantity,
        threshold
      }
    ]);

    setName('');
    setSku('');
    setQuantity(0);
    setThreshold(0);
  };

  const updateQuantity = (id: number, nextQuantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, nextQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="app-shell">
      <header>
        <h1>Inventory Management</h1>
        <p>Track stock levels, add new products, and quickly identify low inventory.</p>
      </header>

      <section className="cards">
        <article className="card">
          <h2>Total Items</h2>
          <p>{items.length}</p>
        </article>
        <article className="card warning">
          <h2>Low Stock</h2>
          <p>{lowStockItems.length}</p>
        </article>
      </section>

      <section className="panel">
        <h2>Add Item</h2>
        <form onSubmit={addItem} className="item-form">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            required
          />
          <input
            type="number"
            min={0}
            placeholder="Quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            required
          />
          <input
            type="number"
            min={0}
            placeholder="Low stock threshold"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
            required
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="panel">
        <h2>Current Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Threshold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isLow = item.quantity <= item.threshold;

              return (
                <tr key={item.id} className={isLow ? 'low-stock' : ''}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.quantity}</td>
                  <td>{item.threshold}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -1
                    </button>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
