/**
 * User login page with email and password form.
 * Stores the JWT token on success and redirects to the originally requested page.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { signin } from "../datasource/api-users";
import { authenticate } from "../components/auth/auth-helper";

function Login() {

    const { state } = useLocation();
    const { from } = state || { from: { pathname: "/" } };

    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        signin(user)
            .then((res) => {
                if (res && res.success) {
                    authenticate(res.token, () => {
                        navigate(from, { replace: true });
                    });
                } else {
                    setErrorMsg(res.message);
                }
            })
            .catch(err => {
                setErrorMsg(err.message);
                console.log(err);
            });
    };

    // 👇 autofill demo login
    const useDemo = (email, password) => {
        setUser({ email, password });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">

                {/* 🔹 LOGIN FORM */}
                <div className="col-md-6">
                    <h1>Signin</h1>
                    <p className="flash"><span>{errorMsg}</span></p>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>

                        &nbsp; &nbsp;

                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            Sign-up
                        </Link>
                    </form>
                </div>

                {/* 🔹 DEMO ACCOUNTS */}
                <div className="col-md-6">
                    <h3>Demo Accounts</h3>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Customer Account</h5>
                            <p className="card-text mb-1">
                                <strong>Email:</strong> test.customer@gmail.com
                            </p>
                            <p className="card-text">
                                <strong>Password:</strong> password1
                            </p>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => useDemo("test.customer@gmail.com", "password1")}
                            >
                                Use Demo
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Admin Account</h5>
                            <p className="card-text mb-1">
                                <strong>Email:</strong> admin.user1@gmail.com
                            </p>
                            <p className="card-text">
                                <strong>Password:</strong> password1
                            </p>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => useDemo("admin.user1@gmail.com", "password1")}
                            >
                                Use Demo
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;