import React from 'react';

export const Loading = () => {
    return(
        
<div  >

<span className="fa fa-spinner fa-pulse fa-3x " style={{color:"white",fontSize:"130px", display: "flex",justifyContent: "center",alignItems: "center",marginBottom:"20px",marginTop: "20%"}} ></span>
<p style={{color:"white",fontWeight:"400px", display: "flex",justifyContent: "center",alignItems: "center"}}>Loading . . .</p>
</div>
    );
};