import React from "react";
const ErrorMsg = ({msg}) => {
   const errorStyle = {
      color: "white",
      backgroundColor: "#ff4d4f",
      fontSize: "18px",
      padding: "15px",
      margin: "20px auto",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      cursor: "pointer",
   };
   const hoverStyle = {
      backgroundColor: "#ff7875",
      transform: "translateY(-3px)",
   };
   const [hovered, setHovered] = React.useState(false);
return (
   <>
      {msg && (
         <div
            style={hovered ? { ...errorStyle, ...hoverStyle } : errorStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            {msg}
         </div>
      )}
   </>
);

};

export default ErrorMsg;
