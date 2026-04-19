/**
 * Authenticated user dashboard showing a summary of recent orders
 * and activity history with key statistics.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { list as listOrders } from '../datasource/api-orders';
import { list as listHistory } from '../datasource/api-history';

function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        activeOrders: 0,
        recentHistory: 0
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Load orders
                const ordersRes = await listOrders();
                if (ordersRes.success) {
                    setOrders(ordersRes.data.slice(0, 5)); // Get last 5 orders
                    setStats(prev => ({
                        ...prev,
                        totalOrders: ordersRes.data.length,
                        activeOrders: ordersRes.data.filter(order => order.active).length
                    }));
                }

                // Load history
                const historyRes = await listHistory();
                if (historyRes.success) {
                    setHistory(historyRes.data.slice(0, 5)); // Get last 5 history items
                    setStats(prev => ({
                        ...prev,
                        recentHistory: historyRes.data.length
                    }));
                }
            } catch (error) {
                console.log('Error loading dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (isLoading) {
        return (
            <div className="container" style={{ paddingTop: 80 }}>
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1 className="mb-4">My Dashboard</h1>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <h2 className="text-primary">{stats.totalOrders}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Active Orders</h5>
                            <h2 className="text-success">{stats.activeOrders}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Recent Activity</h5>
                            <h2 className="text-info">{stats.recentHistory}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Quick Actions</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-wrap gap-2">
                                <Link to="/orders/add" className="btn btn-primary">
                                    <i className="fas fa-plus"></i> New Order
                                </Link>
                                <Link to="/orders" className="btn btn-outline-primary">
                                    <i className="fas fa-list"></i> View All Orders
                                </Link>
                                <Link to="/history" className="btn btn-outline-secondary">
                                    <i className="fas fa-history"></i> View History
                                </Link>
                                <Link to="/profile" className="btn btn-outline-info">
                                    <i className="fas fa-user"></i> Update Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Recent Orders */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Recent Orders</h5>
                            <Link to="/orders" className="btn btn-sm btn-outline-primary">View All</Link>
                        </div>
                        <div className="card-body">
                            {orders.length === 0 ? (
                                <p className="text-muted">No orders yet.</p>
                            ) : (
                                <div className="list-group list-group-flush">
                                    {orders.map((order) => (
                                        <div key={order.id} className="list-group-item px-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">{order.title}</h6>
                                                    <small className="text-muted">
                                                        Status: <span className={getStatusBadge(order.status)}>
                                                            {order.status}
                                                        </span>
                                                    </small>
                                                </div>
                                                <small className="text-muted">
                                                    {formatDate(order.createdAt)}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Recent Activity</h5>
                            <Link to="/history" className="btn btn-sm btn-outline-primary">View All</Link>
                        </div>
                        <div className="card-body">
                            {history.length === 0 ? (
                                <p className="text-muted">No recent activity.</p>
                            ) : (
                                <div className="list-group list-group-flush">
                                    {history.map((item, index) => (
                                        <div key={index} className="list-group-item px-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="mb-1">{item.description}</p>
                                                </div>
                                                <small className="text-muted">
                                                    {formatDate(item.createdAt)}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;