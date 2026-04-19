import { Link } from "react-router-dom";
import { remove } from "../datasource/api-orders";

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

            <td>
                <Link to={'/orders/edit/' + order.id}>✏️</Link>
            </td>

            <td>
                <button onClick={() => handleRemove(order.id)}>🗑️</button>
            </td>
        </tr>
    );
}

export default OrderItem;