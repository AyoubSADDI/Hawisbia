import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast, ToastContainer } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"
import { FacebookIcon, TwitterIcon ,LinkedinIcon,PinterestIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton,LinkedinShareButton,PinterestShareButton } from "react-share";
import { Loading } from 'layouts/Loading';
import ReadMoreReact from 'read-more-react';


const Castronomy = () => {

  const [castronomy, setCastronomy] = useState([]);
  const [loading,setLoading]=useState(true);

  

  const getEventHandler =  ()=>{
   
  
    console.log("reclamation is : "+Castronomy.name);
    api.get(`${process.env.REACT_APP_URL}Castronomy` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setCastronomy(res.data);
    console.log(res.data);
    setLoading(false);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setCastronomy([...Castronomy , response.data]);
  };

  useEffect(() => {
    getEventHandler();
  }, [])

        const all = castronomy.map((cast) => {
          console.log(cast.nameCastronomy);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray"
             >
              
                <h3  style={{height:'120px'}}>{cast.nameCastronomy}</h3>
                <div class="devider-page-content"  style={{width:'50%'}}></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={cast.nameCastronomy}
                  src={cast.imgCollection[0]}
                />
             
                <ReadMoreReact text= {cast.descriptionCastronomy} min={97} ideal={98} max={100}
                      readMoreText={(<div style={{color:"orange"}}>Read more</div>)}/>
                <div class="btn-content">
                <a class="dlink-class"  href={process.env.PUBLIC_URL+ `/m/detailsGastr/`+cast._id }>Details</a>
                </div>
                <p>
                <FacebookShareButton

url={"https://hawassbiaa.herokuapp.com/m/virtual?imageurl=https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4e/df/09/le-temple-des-eaux.jpg?w=1000&h=600&s=1"}
quote={(<img src="/logo.png" />)}
hashtag={["#hawassbia","7awaasbia","#events","#2021"]}
description={cast.descriptionCastronomy}
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
            <h1 class="animbounceInLeft" data-time="600">
              All Gastronomy
            </h1>
            
            <div class="devider-page animfadeInLeft" data-time="1100"></div>
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
    export default Castronomy;