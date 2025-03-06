// import React, { useState, useEffect } from "react";

// const Profile = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = () => {
//             const storedUser = localStorage.getItem("user");
//             if (storedUser) {
//                 setUser(JSON.parse(storedUser));
//             }
//         };

//         fetchUser();

//         // 🔹 Listen for storage updates (when user logs in / signs up)
//         window.addEventListener("storage", fetchUser);

//         return () => {
//             window.removeEventListener("storage", fetchUser);
//         };
//     }, []);

//     return (
//         <div>
//             <h2>User Profile</h2>
//             {user ? (
//                 <div>
//                     <p><strong>Name:</strong> {user.Firstname} {user.Lastname}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Phone:</strong> {user.phonenum}</p>
//                     <p><strong>Address:</strong> {user.address}</p>
//                 </div>
//             ) : (
//                 <p>No user logged in.</p>
//             )}
//         </div>
//     );
// };

// export default Profile;






//above works 



import React, { useState, useEffect } from "react";
import Navbar from './Navbar';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        fetchUser();
        window.addEventListener("storage", fetchUser);

        return () => {
            window.removeEventListener("storage", fetchUser);
        };
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    return (
        <div style={{ backgroundColor: "#ffff", minHeight: "100vh", padding: "20px" }}>
            <Navbar/>

        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>User Profile</h2>
                {user ? (
                    <div style={styles.info}>
                        <p><strong>Name:</strong> {user.Firstname} {user.Lastname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phonenum}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <button onClick={handleSignOut} style={styles.signOutButton}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <p style={styles.noUser}>No user logged in.</p>
                )}
            </div>
        </div>
        </div>

    );
};

// Inline styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
    },
    card: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "350px",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "15px",
    },
    info: {
        textAlign: "left",
        lineHeight: "1.8",
        color: "#555",
    },
    noUser: {
        color: "#888",
    },
    signOutButton: {
        marginTop: "15px",
        width: "100%",
        padding: "10px",
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background 0.3s",
    },
};

export default Profile;

