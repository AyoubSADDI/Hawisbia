import React, {useState ,useEffect} from 'react'
import AddContact from './ContactComponents/AddContact';
import api from './ContactComponents/axios';
import "./index.css"

 const Contact =()=>{

    const [contacts, setContacts] = useState([]);
  

    const addContactHandler = async (contact)=>{
     
    
      console.log("reclamation is : "+contact.firstName);
     const response = await api.post("/contacts" , contact , {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    } );
     console.log("reclamation is : "+response.data.firstName);
  
     setContacts([...contacts , response.data]);
    };
  
    useEffect(() => {
      
    }, [])

    return (
        <>

<div class="row">

<div class="col-md-12">
<h1  data-time="150">CONTACT US</h1>
<div  className="color-gray " style={{height:"800px"}}>
<h2 >Ask you travel tips, ideas ,inspiration or any request ?</h2>
<div class="devider-page " ></div>
 

<div class="col-md-4 col-xs-12 spaceup spacedown " >
<h4>HERE YOU FIND US</h4>
<p>129 Park Ave, New York, NY 10903</p>
</div>
                
<div class="col-md-4 col-xs-12 spaceup spacedown ">
<h4>CALL US</h4>
<p>+6221.987.654.321</p>
</div>
                
<div class="col-md-4 col-xs-12 spaceup spacedown " >
<h4>EMAIL US</h4>
<a href="mailto:service@expediton.com?Subject=Hello%20again">marketing@expediton.com</a>
</div> 

{/** <div id="map" class="spacedown animfadeInUp" data-time="2000"></div>*/}   
                  
<div class="col-md-12 col-xs-12 spacedown " >
<div class="form-group contact">
        <AddContact addContactHandler={addContactHandler} />
</div>
</div>
</div>  </div>        
</div>
        </>
    );
}
export default Contact;