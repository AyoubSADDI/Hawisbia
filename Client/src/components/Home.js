import React, { Component,useEffect,useRef,useState } from 'react'
import Landing from './Landing';
import "./index.css"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
import Axios from 'axios';
import { BsFillBrightnessHighFill } from 'react-icons/bs';
import { FaStarAndCrescent } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { setLocalStorage } from 'helpers/auth';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
  
 

const Home=()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [images, setImages] = useState([]);
    const [places,setPlaces]=useState([]);

    let arr=["/img1.jpg","/img2.jpg","/img.jpg"];
    const items = [
      {
        src: '/img1.jpg',
        altText: 'Slide 1',
        caption: 'Slide 1'
      }
    ];
    const items1 = [
      {
        src: '/img3.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
      }
    ];
    var d = new Date();
    const h=d.getHours();

    const alanBtnContainer = useRef();
    const logoEl = useRef();

    useEffect(() => {
       alanBtn({
         key: '4d292cf043b0a2ea4d0bf347580da6fd2e956eca572e1d8b807a3e2338fdd0dc/prod',
         rootEl: alanBtnContainer.current,
         onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            window.location.replace("http://localhost:3000/m/virtual")
          } else if (command === 'instructions') {
            window.location.replace("http://localhost:3000/m/virtual")
          } else if (command === 'highlight') {
            window.location.replace("http://localhost:3000/m/virtual")
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
         }
        }
      });
     }, []);
  /*
    const loadImages = () => {
      Axios.get(`${process.env.REACT_APP_URL}images`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setImages(res.data);
          console.log(res.data);
          //  console.log(images);
        })
        .catch((err) => {
        });
    };
    useEffect(() => {
      loadImages();
    }, []);
    var all;

    if(images.length!=0){
      all= images.map((x) => {
        return(
          <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          className="myitem"
          key={x._id}
        >
          <img src={process.env.PUBLIC_URL + `/uploads/${x.myImage}`} alt={x.name} />
        </CarouselItem>
         
        )
    })
    }
    else
    {
     all= arr.map((x)=>{
       return(
        <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        className="myitem"
      >
        <img src={x} alt="hawasbia" />
      </CarouselItem>
       )
     })
    }
  */
    async function loadPlace() {
      Axios.get(`${process.env.REACT_APP_URL}place`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
  setPlaces(res.data) ;
  localStorage.setItem("places",res.data);
  console.log("places");
  localStorage.getItem("places");
  localStorage.setItem("aaa","eee");
  localStorage.getItem("aaa");
  sessionStorage.setItem("aaaa","rrrrr");
  sessionStorage.getItem("aaaa");
          


        
        
        })
        .catch((err) => {
        });
    };
    useEffect(() => {
      loadPlace();
      localStorage.setItem("places",places);
      console.log("places");


    }, []);
    localStorage.removeItem("places");
    localStorage.setItem("places",JSON.stringify(places));
    var c=localStorage.getItem("places");
    console.log(c);
    

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  var all;
  if(h>6 && h<19){
    all = items1.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          className="myitem"
          key={item.src}
          
        >
          <div className="layer">

</div>
        </CarouselItem>
      );
    });

  }
  else{
    all = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          className="myitem"
          key={item.src}
          style={{backgroundColor:"rgba(248, 247, 216, 0.7)"}}

        >
          <div className="layer">

          </div>
        </CarouselItem>
      );
    });

  }
  
   
    return (
      <>
      <div className="texture"></div>
      <video
      loop
      muted
      autoPlay
      preload="auto"
      id="myVideo"
      >
            <source au src="https://res.cloudinary.com/hawesbeya/video/upload/v1621722880/video/sprov4vptbrcw4l4c5br.mp4" type="video/mp4" />
            Your browser does not support the video tag.  
      </video>
      <Landing />

      
     
          </>

      );
  
}
export default Home;
