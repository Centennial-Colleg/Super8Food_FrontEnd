/**
 * Allows an admin user to update the status of any order.
 * Fetches the order by ID using admin privileges and presents
 * a dropdown to set the status to Pending, Confirmed, Preparing,
 * Delivered, or Cancelled.
 * 
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneAdmin, updateStatus } from '../datasource/api-orders';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Preparing', 'Delivered', 'Cancelled'];

function UpdateOrderStatus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getOneAdmin(id)
            .then((res) => {
                if (res.success) {
                    setOrder(res.data);
                    setStatus(res.data.status);
                } else {
                    alert(res.message);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                alert(err.message);
                setIsLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStatus(id, status)
            .then((res) => {
                if (res.success) {
                    alert(res.message);
                    navigate('/orders');
                } else {
                    setErrorMsg(res.message);
                }
            })
            .catch((err) => {
                setErrorMsg(err.message);
            });
    };

    if (isLoading) return <div className="container" style={{ paddingTop: 80 }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: 80, maxWidth: 500 }}>
            <h2>Update Order Status</h2>
            {order && (
                <p className="text-muted">
                    Order: <strong>{order.title || id}</strong>
                </p>
            )}

            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/orders')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateOrderStatus;
