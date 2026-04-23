/**
 * Renders a single order row in the orders table with role-based
 * action buttons: Edit/Cancel for users, Change Status for admins.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { Link } from "react-router-dom";
import { remove } from "../datasource/api-orders";
import { isAdmin } from "../components/auth/auth-helper";

function OrderItem({ order, onRemove }) {

    const handleRemove = (id) => {
        if (window.confirm('Cancel this order?')) {
            remove(id).then(res => {
                if (res.success) onRemove();
            });
        }
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Pending': 'badge bg-warning text-dark',
            'Confirmed': 'badge bg-success',
            'Preparing': 'badge bg-info',
            'Delivered': 'badge bg-primary',
            'Cancelled': 'badge bg-danger'
        };

        return statusClasses[status] || 'badge bg-secondary';
    };

    return (
        <tr>
            <td>{order.title}</td>
            <td>{order.description}</td>
            <td>
                <span className={getStatusBadge(order.status)}>
                    {order.status}
                </span>
            </td>
            <td>{order.deliveryDate}</td>
            <td>{order.completionDate}</td>
            <td>{order.active ? "Yes" : "No"}</td>

            {isAdmin() && <td>{order.user?.username || '-'}</td>}
            {isAdmin() && <td>{order.address || '-'}</td>}

            {isAdmin() ? (
                <td>
                    <Link to={'/orders/status/' + order.id} className="btn btn-sm btn-warning">
                        Change Status
                    </Link>
                </td>
            ) : (
                <>
                    <td>
                        <Link to={'/orders/edit/' + order.id} className="btn btn-sm btn-primary">
                            Edit
                        </Link>
                    </td>
                    <td>
                        <button className="btn btn-sm btn-danger" onClick={() => handleRemove(order.id)}>
                            Cancel
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default OrderItem;