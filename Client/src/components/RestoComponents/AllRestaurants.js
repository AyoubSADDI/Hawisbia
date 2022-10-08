import React, {useState ,useEffect} from 'react'
import api from '../ContactComponents/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FacebookIcon, TwitterIcon ,LinkedinIcon,PinterestIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton,LinkedinShareButton,PinterestShareButton } from "react-share";
import "../index.css";
import { Loading } from 'layouts/Loading';
import ReadMoreReact from 'read-more-react';
import Axios from 'axios';
import { getCookie } from 'helpers/auth';

const AllRestaurants = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [loading,setLoading]=useState(true);

  const user =getCookie("id");
  const username =getCookie("username");

  const role =getCookie("role");
  const reserver = (id) => {
    console.log(id);
    console.log(user);
    let data = new FormData();
    data.append("event",id);
    data.append("user",user);


    toast.success("event added successfully")


    Axios.post(`${process.env.REACT_APP_URL}booking/resto/update/resto/${user}/${id}`, {
      "product":id,
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

  const getRestoHandler =  ()=>{


    api.get(`${process.env.REACT_APP_URL}restaurants` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setRestaurants(res.data);
    console.log(res.data);
    setLoading(false);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setPlaces([...Places , response.data]);
  };

  useEffect(() => {
    getRestoHandler();
  }, [])

        const all = restaurants.map((p) => {
          console.log("iddddddddddddddddddddddddddddddddddddddd"+p._id);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >

              <div  className="color-gray "
             >

                <h3 style={{height:'120px'}}>{p.name}</h3>
                <div class="devider-page-content" style={{width:'50%'}}></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={p.name}
                  src={p.imgCollection[0]}
                />
         
                <ReadMoreReact text= {p.description} min={97} ideal={98} max={100}
                      readMoreText={(<div style={{color:"orange"}}>Read more</div>)}/>

                {
                    username&&role==="subscriber" ? (<div className="btn-content" style={{marginRight:"1rem"}}> 
                    
                    <button class="dlink-class myobtn" onClick={()=>reserver(p._id)} >Reserver</button>


                           </div>
                    ):null
                  }

                <div class="btn-content">
                  <a class="dlink-class"  href={process.env.PUBLIC_URL+ `/m/detailsResto/`+p._id }>Details</a>
                </div>
                <p>
                <FacebookShareButton

url={"https://hawassbiaa.herokuapp.com/m/virtual?imageurl=https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4e/df/09/le-temple-des-eaux.jpg?w=1000&h=600&s=1"}
quote={(<img src="/logo.png" />)}
hashtag={["#hawassbia","7awaasbia","#events","#2021"]}
description={p.description}
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
            <h1>
              All Restaurants
            </h1>

            <div class="devider-page "></div>
          </div>

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
    export default AllRestaurants; 