import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"
import { FacebookIcon, TwitterIcon ,LinkedinIcon,PinterestIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton,LinkedinShareButton,PinterestShareButton } from "react-share";
import { Loading } from 'layouts/Loading';
import ReadMoreReact from 'read-more-react';
import ReactHtmlParser from 'react-html-parser';



const Places = () => {

  const [places, setPlaces] = useState([]);
  const [loading,setLoading]=useState(true);
  

  const getEventHandler =  ()=>{
   
  
    api.get(`${process.env.REACT_APP_URL}placee` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setPlaces(res.data);
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
    getEventHandler();
  }, [])

        const all = places.map((p) => {
        
          console.log("iddddddddddddddddddddddddddddddddddddddd"+p._id);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray "
             >
              
                <h3  style={{height:'120px'}} >{p.namePlace}</h3>
                <div class="devider-page-content" style={{width:'50%'}}></div>
                <LazyLoadImage
                  class="img-cont1" 
                  alt={p.namePlace}
                  src={p.imgCollection[0]}

                />
                <p>
                  
                      <ReadMoreReact text= {p.descriptionPlace} min={97} ideal={98} max={100}
                      readMoreText={(<div style={{color:"orange"}}>Read more</div>)}/>
                       
                    
                  
              
                </p>
              
                <div class="btn-content">
                  <a class="dlink-class"  href={process.env.PUBLIC_URL+ `/m/details/`+p._id }>Details</a>
                </div>
                <div class="btn-content">
                  <a class="dlink-class"  href={process.env.PUBLIC_URL+ `/m/monument/`+p._id }>Monuments</a>
                </div>
                <p>
                <FacebookShareButton

url={"https://hawassbiaa.herokuapp.com/m/virtual?imageurl=https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4e/df/09/le-temple-des-eaux.jpg?w=1000&h=600&s=1"}
quote={(<img src="/logo.png" />)}
hashtag={["#hawassbia","7awaasbia","#events","#2021"]}
description={p.descriptionPlace}
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
              All Places
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
    export default Places;