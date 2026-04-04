import { Link } from "react-router-dom";
import { remove } from "../datasource/api-orders";

function OrderItem({ order, onRemove }) {

    const handleRemove = (id) => {
        if (window.confirm('Delete this order?')) {
            remove(id).then(res => {
                if (res.success) onRemove();
            });
        }
    };

    return (
        <tr>
            <td>{order.title}</td>
            <td>{order.description}</td>
            <td>{order.status}</td>
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