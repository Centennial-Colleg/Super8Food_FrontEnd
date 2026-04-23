/**
 * Displays the orders list. Admins see all orders across all users;
 * regular users see only their own orders.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { list, listAdmin } from '../datasource/api-orders';
import OrderItem from './OrderItem';
import { isAdmin } from '../components/auth/auth-helper';

function OrderList() {
    let [orderList, setOrderList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadOrders = () => {
        const fetcher = isAdmin() ? listAdmin : list;
        fetcher()
            .then((res) => {
                if (res.success) {
                    setOrderList(res.data);
                    setIsLoading(false);
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    const handleRemove = () => {
        loadOrders();
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>{isAdmin() ? 'All Orders' : 'My Orders'}</h1>

            <div>
                {!isAdmin() && (
                    <Link to="/orders/add" className="btn btn-primary">
                        Add a new Order
                    </Link>
                )}
            </div>

            <br /><br />

            <div className="table-responsive">
                {isLoading && <div>Loading...</div>}
                {!isLoading && orderList.length === 0 && <div>No orders found.</div>}

                {!isLoading && orderList.length > 0 &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Delivery</th>
                                <th className="text-center">Completion</th>
                                <th className="text-center">Active</th>
                                {isAdmin() && <th className="text-center">User</th>}
                                {isAdmin() && <th className="text-center">Address</th>}
                                <th className="text-center" colSpan={isAdmin() ? "3" : "2"}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map(order =>
                                <OrderItem
                                    key={order.id}
                                    order={order}
                                    onRemove={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default OrderList;