import React, {useState ,useEffect} from 'react'
import api from './DetailsComp/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"
import { Loading } from 'layouts/Loading';

const DetailsCastronomy = (props) => {

    const [detailsCastronomy, setDetailsCastronomy] = useState({
      //  lanPlace :""
    });
    const [loading,setLoading]=useState(true);

   const getEventHandler =  ()=>{
   
  
        api.get(`${process.env.REACT_APP_URL}castronomy/`+props.match.params.id , {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        setDetailsCastronomy(res.data);
        setLoading(false);
      
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });  
      
      };
      useEffect(() => {
        getEventHandler();
      }, [])

       return(
            <>

<div id="wraperexpedition">





<div className="nav-top-block"></div>
    
    
<div className="main-content">
<div className="container-fluid">
    
    <div className="row">
    <div className="col-md-12 spacedown">
    <h1 >Descriptions of </h1>
    <h2>{detailsCastronomy.nameCastronomy}</h2>
    <div className="devider-page " ></div>
    </div>
    </div>
    {
      loading ?
      (<Loading />)
      :
      (
        <div id="content" >
        <div className="row color-gray">
                
          <div className="col-lg-8 p-30px">
                
            <article>
                <div className="post-image">
                            <img className="img-responsive" src={detailsCastronomy.imgCollection[0]} alt={detailsCastronomy.nameCastronomy}/>
                  <div className="post-heading">
                    <h3><a href="#">Fierent adipisci iracundia est ei</a></h3>
                  </div>
                </div>
                <p>
                            {detailsCastronomy.nameCastronomy}
                </p>
                <div className="bottom-article"  >
                  <ul className="meta-post">
                    <li><a href="#">Jan 12, 2017</a></li>
                  </ul>
                </div>
            </article>
                    
             <div id="blog-comment">
                      <h5><span>Comments (5)</span></h5>
                        
                             <ul>
                             <li>
                              <div className="avatar"><img alt="img" src="img/avatar.jpg"/></div>
                                <div className="comment-info">
                                    <span className="c-name">John Smith</span>
                                    <span className="c-date">30 Jan 2017</span>
                                    <span className="c-reply"><a href="#">Reply</a></span>
                                </div>
                                <div className="comment">Sed ut perspiciatis unde omnis iste natus error sit voluptatem   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt   explicabo.</div>
                                    <ul>
                                    <li>
                                        <div className="avatar"><img alt="img" src="img/avatar.jpg"/></div>
                                         <div className="comment-info">
                                            <col-md- className="c-name">John Smith</col-md->
                                            <col-md- className="c-date">30 Jan 2017</col-md->
                                            <col-md- className="c-reply"><a href="#">Reply</a></col-md->
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="comment">Sed ut perspiciatis unde omnis iste natus error sit voluptatem   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt   explicabo.</div>
                                    </li>
                                    </ul>
                               </li>
                             </ul>
                               
                                   <ul>
                                    <li>
                                        <div className="avatar"><img alt="img" src="img/avatar.jpg"/></div>
                                         <div className="comment-info">
                                            <span className="c-name">John Smith</span>
                                            <span className="c-date">30 Jan 2017</span>
                                            <span className="c-reply"><a href="#">Reply</a></span>
                                        </div>
                                        <div className="comment">Sed ut perspiciatis unde omnis iste natus error sit voluptatem   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt   explicabo.</div>
                                    </li>
                                   </ul>
                                    
                                    <ul>
                                     <li>
                                        <div className="avatar"><img alt="img" src="img/avatar.jpg"/></div>
                                         <div className="comment-info">
                                            <span className="c-name">John Smith</span>
                                            <span className="c-date">30 Jan 2017</span>
                                            <span className="c-reply"><a href="#">Reply</a></span>
                                        </div>
                                        <div className="comment">Sed ut perspiciatis unde omnis iste natus error sit voluptatem   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt   explicabo.</div>
                                    </li>
                                   </ul>
                                    
                                   <ul>
                                    <li>
                                        <div className="avatar"><img alt="img" src="img/avatar.jpg"/></div>
                                         <div className="comment-info">
                                            <span className="c-name">John Smith</span>
                                            <span className="c-date">30 Jan 2017</span>
                                            <span className="c-reply"><a href="#">Reply</a></span>
                                        </div>
                                        <div className="comment">Sed ut perspiciatis unde omnis iste natus error sit voluptatem   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt   explicabo.</div>
                                    </li>
                                   </ul>
    
                        
                    <div id="comment-form-wrapper">
                    <h5>Leave a Comment</h5>
                    <form id="commentform" name="form1" method="post" action="#">
                   <input type="text" name="name" id="name" placeholder="name"/>
                   <input type="text" name="email" id="email" placeholder="email"/>
                    <textarea cols="10" rows="10" name="message" id="message" placeholder="Comment"></textarea>
                    <div id="mail_success" className="success"> Thanks for your comment</div>
                    <div id="mail_failed" className="error">Error, comment failed</div>
                    <button id="sendcomment" className="btn-content" type="submit">Comment</button>          
                    </form>
                    </div>
                    </div>
                    
          </div>
                
          <div className="col-lg-4 p-30px">
            <aside className="right-sidebar">
                    
            <div className="widget">
              <h5 className="spacedown-half">Recent posts</h5>
              <div className="recent">
                <div>
                <img src="img/blog/65x65/thumb1.jpg" className="pull-left" alt="#" />
                <h6><a href="#">Lorem ipsum dolor sit</a></h6>
                <p>Mazim alienum appellantur eu cu ullum officiis pro pri</p>
                </div>
                <div>
                <a href="#"><img src="img/blog/65x65/thumb2.jpg" className="pull-left" alt="#" /></a>
                <h6><a href="#">Maiorum ponderum eum</a></h6>
                <p>Mazim alienum appellantur eu cu ullum officiis pro pri</p>
                </div>
                <div>
                <a href="#"><img src="img/blog/65x65/thumb3.jpg" className="pull-left" alt="#" /></a>
                <h6><a href="#">Et mei iusto dolorum</a></h6>
                <p>Mazim alienum appellantur eu cu ullum officiis pro pri</p>
                </div>
              </div>
            </div>
                    
                    <div className="devider-doted-blog spacedown"></div>
                    
            <div className="widget">
              <h5 className="spacedown-half">Tags</h5>
              <div className="tags">
                <div><a href="#">Photography</a></div>
                <div><a href="#">Trends</a></div>
                <div><a href="#">Interactive</a></div>
                <div><a href="#">Travel</a></div>
                <div><a href="#">Responsive</a></div>
                <div><a href="#">Entertaiment</a></div>
                            <div><a href="#">Design</a></div>
                            <div><a href="#">website</a></div>
                            <div><a href="#">application</a></div>
              </div>
            </div>
                    
                    <div className="devider-doted-blog spacedown"></div>
                    
            <div className="widget">
              <h5 className="spacedown-half">About Us</h5>
              <p>Proin hendrerit eget tellus sit amet vestibulum. Nullam a tincidunt leo. Sed eget sem scelerisque, malesuada lectus sed, facilisis sapien. Pellentesque quis ullamcorper est, vitae condimentum enim. Phasellus suscipit eu lacus finibus rhoncus. Maecenas sed lacus aliquam, vehicula sapien ac, cursus erat. Aenean vel erat a urna efficitur varius.</p>
            </div>
                    
                    
                    
            </aside>
          </div>
        </div>
      </div>
      )
    }
    
   
    
 </div>
</div>





<div id="totop"><i className="fa fa-angle-up"></i></div>

</div>
            </>
        )

}
export default DetailsCastronomy;