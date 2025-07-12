import { useState, useEffect } from "react";

function getInitialProducts() {
    if (typeof window !== 'undefined') {
        const local = localStorage.getItem('admin_products');
        if (local) return JSON.parse(local);
    }
    // fallback: import products.json (dynamic import for SSR)
    if (typeof window !== 'undefined') {
        return fetch('/src/data/products.json')
            .then(res => res.json())
            .catch(() => []);
    }
    return [];
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState({});
    const [viewProduct, setViewProduct] = useState(null);
    const [jsonFields, setJsonFields] = useState({});

    // Load products from localStorage or products.json
    useEffect(() => {
        const local = localStorage.getItem('admin_products');
        if (local) {
            setProducts(JSON.parse(local));
            setLoading(false);
        } else {
            fetch('/src/data/products.json')
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (!loading) localStorage.setItem('admin_products', JSON.stringify(products));
    }, [products, loading]);

    const openForm = (product = null) => {
        setEditingProduct(product);
        setForm(product ? { ...product } : {});
        setJsonFields({});
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setForm({});
        setJsonFields({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    // For editing nested/array fields as JSON
    const handleJsonChange = (field, value) => {
        setJsonFields(j => ({ ...j, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newProduct = { ...form };
        // Parse JSON fields
        for (const key in jsonFields) {
            try {
                newProduct[key] = JSON.parse(jsonFields[key]);
            } catch {
                alert(`Invalid JSON in field: ${key}`);
                return;
            }
        }
        if (!newProduct.title) return alert('Title is required');
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p));
        } else {
            // Generate a new id
            const newId = Date.now().toString();
            setProducts([{ ...newProduct, id: newId }, ...products]);
        }
        closeForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
            if (viewProduct && viewProduct.id === id) setViewProduct(null);
        }
    };

    // Helper: get all keys (including nested/array fields)
    const getAllKeys = (obj) => {
        const keys = [];
        for (const k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                keys.push(k);
            } else {
                keys.push(k);
            }
        }
        return keys;
    };

    if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

    return (
        <div style={{ margin: '40px 0', maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto' }}>
            <h1>Admin Product Management</h1>
            <button onClick={() => openForm()} style={{ marginBottom: 20 }}>Add Product</button>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && <tr><td colSpan={4}>No products yet.</td></tr>}
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.date}</td>
                                <td>
                                    <button onClick={() => setViewProduct(product)} style={{ marginRight: 8 }}>View</button>
                                    <button onClick={() => openForm(product)} style={{ marginRight: 8 }}>Edit</button>
                                    <button onClick={() => handleDelete(product.id)} style={{ color: 'red' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* View Product Modal */}
            {viewProduct && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewProduct(null)}>
                    <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 700, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setViewProduct(null)} style={{ position: 'absolute', top: 8, right: 8 }}>✕</button>
                        <h2>{viewProduct.title}</h2>
                        <pre style={{ background: '#f8f8f8', padding: 16, borderRadius: 4, fontSize: 13, maxHeight: 400, overflow: 'auto' }}>{JSON.stringify(viewProduct, null, 2)}</pre>
                    </div>
                </div>
            )}
            {/* Add/Edit Product Modal */}
            {showForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeForm}>
                    <form style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 700, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                        <button type="button" onClick={closeForm} style={{ position: 'absolute', top: 8, right: 8 }}>✕</button>
                        <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                        {/* Render all fields */}
                        {Object.keys({ ...form, ...jsonFields }).map(key => (
                            typeof form[key] === 'object' && form[key] !== null ? (
                                <div key={key} style={{ marginBottom: 12 }}>
                                    <label>{key} (JSON)</label>
                                    <textarea
                                        value={jsonFields[key] !== undefined ? jsonFields[key] : JSON.stringify(form[key] || '', null, 2)}
                                        onChange={e => handleJsonChange(key, e.target.value)}
                                        rows={4}
                                        style={{ width: '100%', padding: 8, marginTop: 4, fontFamily: 'monospace' }}
                                    />
                                </div>
                            ) : (
                                <div key={key} style={{ marginBottom: 12 }}>
                                    <label>{key}</label>
                                    <input
                                        name={key}
                                        value={form[key] || ''}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                                    />
                                </div>
                            )
                        ))}
                        <button type="submit" style={{ marginTop: 8 }}>{editingProduct ? 'Save Changes' : 'Add Product'}</button>
                    </form>
                </div>
            )}
        </div>
    );
} 