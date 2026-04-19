import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../datasource/api-users';

function Profile() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const loadProfile = () => {
        getProfile()
            .then((res) => {
                if (res.success) {
                    setUser({
                        firstName: res.data.firstName || '',
                        lastName: res.data.lastName || '',
                        email: res.data.email || '',
                        username: res.data.username || ''
                    });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        updateProfile(user)
            .then((res) => {
                if (res.success) {
                    alert('Profile updated successfully!');
                } else {
                    alert(res.message);
                }
                setIsSaving(false);
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
                setIsSaving(false);
            });
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="container" style={{ paddingTop: 80 }}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>My Profile</h1>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;