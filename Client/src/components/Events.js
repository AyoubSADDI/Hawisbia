import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast,ToastContainer } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StripeCheckout from "react-stripe-checkout";
import { getCookie } from "../helpers/auth";
import { FacebookIcon, TwitterIcon ,LinkedinIcon,PinterestIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton,LinkedinShareButton,PinterestShareButton } from "react-share";
import ReadMoreReact from 'read-more-react';
import "./index.css";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Button } from 'bootstrap';
import axios from './DetailsComp/axios';
import { Loading } from 'layouts/Loading';

const Events = () => {

  const username =getCookie("username");
  const user =getCookie("id");

  const role =getCookie("role");

  const [events, setEvents] = useState([]);
  const [loading,setLoading]=useState(true);

  const [ids,setIds]=useState("");
/*
  const reserver = (id) => {
 
    const data = new FormData();
    data.append("eventId",id);
    data.append("userId",user);


    toast.success("event added successfully")


    api.post(`${process.env.REACT_APP_URL}booking`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.success("you must confirm youre booking by paiement")
      window.location.reload();
    });
  };
  */
  
 const token=getCookie("token");
  const getEventHandler =  ()=>{
   
  
    console.log("reclamation is : "+events.name);
    api.get(`${process.env.REACT_APP_URL}events` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setEvents(res.data);
    console.log(res.data);
    setLoading(false);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setEvents([...events , response.data]);
  };

  useEffect(() => {
    getEventHandler();
  }, [])

  const reserver = (id) => {
    console.log(id);
    console.log(user);
    let data = new FormData();
    data.append("event",id);
    data.append("user",user);


    toast.success("event added successfully")


    Axios.post(`${process.env.REACT_APP_URL}booking/update/event/${user}/${id}`, {
      "event":id,
      "user":user
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.success("you must confirm youre booking by paiement")
    });
  };
    
        const all = events.map((event) => {
          console.log(event.name);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray "
             >
              
                <h3 style={{height:'120px'}}>{event.name}</h3>
                <div class="devider-page-content" style={{width:'50%'}}></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={event.name}
                  src={event.imgCollection[0]}
                />
     
                <ReadMoreReact text= {event.desc} min={97} ideal={98} max={100}
                      readMoreText={(<div style={{color:"orange"}}>Read more</div>)}/>
                  {
                    username&&role==="subscriber" ? (<div className="btn-content" style={{marginRight:"1rem"}}> 
                    
                    <button class="dlink-class myobtn" onClick={()=>reserver(event._id)} >Reserver</button>


                           </div>
                    ):null
                  }


                <div class="btn-content">

                  <Link class="dlink-class"  to={process.env.PUBLIC_URL+ `/m/detailsEvents/`+event._id }>Details</Link>

                </div>
                <p>
                <FacebookShareButton

url={"https://hawassbiaa.herokuapp.com/m/virtual?imageurl=https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4e/df/09/le-temple-des-eaux.jpg?w=1000&h=600&s=1"}
quote={(<img src="/logo.png" />)}
hashtag={["#hawassbia","7awaasbia","#events","#2021"]}
description={event.desc}
className="Demo__some-network__share-button"
  >
<FacebookIcon size={32}  />
</FacebookShareButton>
<TwitterShareButton
title={"test"}
url={"https://peing.net/ja/"}
hashtags={["hashtag1", "hashtag2"]}
>
<TwitterIcon size={32}  />

</TwitterShareButton>
<LinkedinShareButton
      title={"test"}
      url={"https://hawassbiaa.herokuapp.com/m/virtual"}
      hashtags={["hashtag1", "hashtag2"]}

>
      <LinkedinIcon  size={32}  />

</LinkedinShareButton>
                </p>
                
              </div>
              </Tilt>
              </>
            )
        })

        return (
            <>
         

    <div id="wraperexpedition">
      

     

      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1 >
              All Events
            </h1>
            
            <div class="devider-page " ></div>
          </div>
          <ToastContainer />

          {
            loading ?
            (<Loading />)
            :
            (all)
            }
       
            
           
                  
                
            
        
       

       

        </div>
      </div>

     

      

      </div>



            </>
        )
    }
    export default Events;