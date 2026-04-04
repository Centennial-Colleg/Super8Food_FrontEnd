import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { create } from "../datasource/api-users";
import UserModel from "../datasource/userModel";

const Register = () => {

    let navigate = useNavigate();
    let [user, setUser] = useState(new UserModel());
    let [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user.password !== document.getElementById('confirmPasswordTextField').value) {
            setErrorMsg("ERROR: Passwords don't match!");
        } else {
            create(user).then(res => {
                if (res && res.success) {
                    alert(res.message);
                    navigate("/login");
                }
                else {
                    setErrorMsg(res.message);
                }
            }).catch(err => {
                setErrorMsg(err.message);
                console.log(err)
            });
        }
    };

    // "firstname": "Jane1",
    // "lastname": "Blane1",
    // "email": "Jane1.Blane2@dailyplanet.com",    
    // "password": "12345678",
    // "username": "jane1.blane2"
    return (
        // -- Content for the Add user page --
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add a new user</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="firstNameTextField">First Name</label>
                            <input type="text" className="form-control"
                                id="firstNameTextField"
                                placeholder="Enter first name"
                                name="firstname"
                                value={user.firstname || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="lastNameTextField">lastName</label>
                            <input type="text" className="form-control"
                                id="lastNameTextField"
                                placeholder="Enter last name"
                                name="lastname"
                                value={user.lastname || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="usernameTextField">username</label>
                            <input type="text" className="form-control"
                                id="usernameTextField"
                                placeholder="Enter username"
                                name="username"
                                value={user.username || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="emailTextField">Email</label>
                            <input type="text" className="form-control"
                                id="emailTextField"
                                placeholder="Enter a email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passwordTextField">Password</label>
                            <input type="password" className="form-control"
                                id="passwordTextField"
                                placeholder="Enter a password"
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="confirmPasswordTextField">Confirm Password</label>
                            <input type="password" className="form-control"
                                id="confirmPasswordTextField"
                                placeholder="Confirm password">
                            </input>
                        </div>
                        <br />

                        <br />

                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>
                        &nbsp; &nbsp;
                        <Link href="#" to="/users/signin" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;