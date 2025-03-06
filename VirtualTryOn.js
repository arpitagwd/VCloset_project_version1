
//// working db 

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './VirtualTryOn.css';

const VirtualTryOn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const [imageSrc, setImageSrc] = useState(null);
    const videoRef = useRef(null);
    const socketRef = useRef(null);
    const cameraRef = useRef(null);


    useEffect(() => {
        if (!product) return;

        socketRef.current = new WebSocket("ws://localhost:8000/ws");

        socketRef.current.onopen = () => {
            console.log("WebSocket Connected");
            socketRef.current.send(JSON.stringify({ image_path: product.image }));
        };

        socketRef.current.onmessage = (event) => {
            const blob = new Blob([event.data], { type: "image/jpeg" });
            setImageSrc(URL.createObjectURL(blob));
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        return () => {
            stopWebSocketAndCamera();
        };
    }, [product]);

    const stopWebSocketAndCamera = () => {
        if (socketRef.current) {
            socketRef.current.close();
        }

        if (cameraRef.current) {
            const tracks = cameraRef.current.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const handleGoBack = () => {
        stopWebSocketAndCamera();
        navigate(-1);  // Go back to the previous page (Product Details)
    };

    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="virtual-tryon">
            <h1 style={{color:'black'}}>Your TryOn Session for : {product.name}</h1>
            <div className="video-container">
                {imageSrc ? (
                    <img 
                        ref={videoRef} 
                        src={imageSrc} 
                        alt="Virtual Try-On" 
                        className="tryon-video"
                    />
                ) : (
                    <h3>Loading Virtual Try-On...</h3>
                )}
            </div>
            <button style={{backgroundColor:"#141204",color:"white"}}className="go-back-button" onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default VirtualTryOn;



// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import './VirtualTryOn.css';

// const VirtualTryOn = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const product = location.state?.product;
//     const [imageSrc, setImageSrc] = useState(null);
//     const videoRef = useRef(null);
//     const socketRef = useRef(null);
//     const cameraRef = useRef(null);

//     // Start FastAPI server when component mounts
//     useEffect(() => {
//         if (!product) return;

//         // Start FastAPI server
//         fetch("http://localhost:5000/api/start-server")
//             .then(response => response.json())
//             .then(data => console.log("Server Start Response:", data))
//             .catch(error => console.error("Error starting server:", error));

//         // Connect WebSocket
//         socketRef.current = new WebSocket("ws://localhost:8000/ws");

//         socketRef.current.onopen = () => {
//             console.log("WebSocket Connected");
//             socketRef.current.send(JSON.stringify({ image_path: product.image }));
//         };

//         socketRef.current.onmessage = (event) => {
//             const blob = new Blob([event.data], { type: "image/jpeg" });
//             setImageSrc(URL.createObjectURL(blob));
//         };

//         socketRef.current.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         socketRef.current.onclose = () => {
//             console.log("WebSocket Disconnected");
//         };

//         // Stop server when user leaves the page
//         return () => {
//             stopWebSocketAndCamera();
//             stopFastAPIServer();
//         };
//     }, [product]);

//     const stopWebSocketAndCamera = () => {
//         if (socketRef.current) {
//             socketRef.current.close();
//         }

//         if (cameraRef.current) {
//             const tracks = cameraRef.current.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     };

//     // Function to stop FastAPI server
//     const stopFastAPIServer = () => {
//         fetch("http://localhost:5000/api/stop-server")
//             .then(response => response.json())
//             .then(data => console.log("Server Stop Response:", data))
//             .catch(error => console.error("Error stopping server:", error));
//     };

//     const handleGoBack = () => {
//         stopWebSocketAndCamera();
//         stopFastAPIServer();  // Stop FastAPI when going back
//         navigate(-1);
//     };

//     if (!product) return <h2>Product not found</h2>;

//     return (
//         <div className="virtual-tryon">
//             <h1 style={{color:'black'}}>Your TryOn Session for : {product.name}</h1>
//             <div className="video-container">
//                 {imageSrc ? (
//                     <img 
//                         ref={videoRef} 
//                         src={imageSrc} 
//                         alt="Virtual Try-On" 
//                         className="tryon-video"
//                     />
//                 ) : (
//                     <h3>Loading Virtual Try-On...</h3>
//                 )}
//             </div>
//             <button className="go-back-button" onClick={handleGoBack}>
//                 Go Back
//             </button>
//         </div>
//     );
// };

// export default VirtualTryOn;
