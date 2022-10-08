/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";


import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import OwnerRoute from "./Routes/OwnerRoute";
import UserProfile from "views/UserProfile";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import routesOwner from "routesOwner";
import routesUser from "routesUser"

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { getCookie } from "helpers/auth";
import Dashboard from "views/Dashboard";
import Allimages from "layouts/Admin/Images/Allimages";
import DashboardUser from "views/User/DashboardUser";
import DashboardOwner from "views/Owner/DashboardOwner";
import Circuits from "views/Circuits";
import Guests from "views/Guests";
import Places from "views/Places";
import AllUsers from "views/AllUsers";

import CircuitsOwner from "views/Owner/CircuitsOwner";
import ServicesOwner from "views/Owner/ServicesOwner";
import ProductsUser from "views/User/ProductsUser";
import OrdersUser from "views/User/OrdersUser";
import GuestHouseUser from "views/User/GuestHouseUser";
import 'react-toastify/dist/ReactToastify.css';
import Allcontacts from "layouts/Admin/contacts/Allcontacts";
import Allproducts from "layouts/Admin/products/Allproducts";
import Allevents from "layouts/Admin/events/Allevents";
import AllCastronomy from "layouts/Admin/castronomy/allCastronomy";
import AllJeux from "layouts/Admin/jeux/allJeux";
import PlaceAdmin from "layouts/Admin/places/placeAdmin";
import "./i18nextConf"

import Navbar from "components/navbar/Navbar";
import { Spinner } from "reactstrap";
import Allrestaurants from "layouts/Admin/restaurants/Allrestaurants";
import AccomodationAdmin from "layouts/Admin/accomodationD/accomodationAdmin";
import AllcampingCenter from "layouts/Admin/camping/AllcampingCenter";
import DemoApp from "./layouts/Admin/calender/DemoApp";
import EventSUserss from "layouts/User/Events/EventSUserss";






const MyHome =React.lazy(() => import('./components/Home'));

const MyProducts=React.lazy(() => import('./components/Products'));
const MyGastronomy=React.lazy(() => import('./components/Gastronomy'));
const MyGuestHousee=React.lazy(() => import('./components/GuestHouse'));
const MyEvents=React.lazy(() => import('./components/Events'));
const MyServices=React.lazy(() => import('./components/Services'));
const MyAbout=React.lazy(() => import('./components/About'));
const MyContact=React.lazy(() => import('./components/Contact'));
const MyPlaces=React.lazy(() => import('./components/AllPlaces'));
const Details=React.lazy(() => import('./components/Details'));
const DetailsJeux=React.lazy(() => import('./components/DetailsJeux'));
const DetailsHouse=React.lazy(() => import('./components/DetailsHouse'));
const DetailsCastronomy=React.lazy(() => import('./components/DetailsCastronomy'));
const DetailsEvents=React.lazy(() => import('./components/DetailsEvents'));
const Virtual=React.lazy(() => import('./components/VirtualTour'));
const Cult=React.lazy(() => import('./components/Cult'));
const Sportif=React.lazy(() => import('./components/Sportif'));
const Sante=React.lazy(() => import('./components/Sante'));
const Soufi=React.lazy(() => import('./components/Soufi'));


const AllCamping=React.lazy(() => import('./components/CampingComponents/AllCampingCenter'));
const detailsCamping=React.lazy(() => import('./components/CampingComponents/DetailsCenter'));
const restaurants=React.lazy(() => import('./components/RestoComponents/AllRestaurants'));
const detailsResto=React.lazy(() => import('./components/RestoComponents/DetailsResto'));
const ourcicuits=React.lazy(() => import('./components/OurCircuits/MyCircuits'));
const persocicuits=React.lazy(() => import('./components/OurCircuits/PersoCircuit'));

const login=React.lazy(() => import('./screens/Login'));
const forgotpassword=React.lazy(() => import('./screens/ForgetPassword'));
const resetpassword=React.lazy(() => import('./screens/ResetPassword'));
const register=React.lazy(() => import('./screens/Register'));
const addcircuit=React.lazy(() => import('./layouts/Admin/circuit/AddCicuit'));
const allcircuit=React.lazy(() => import('./layouts/Admin/circuit/AllCircuits'));
const notfound=React.lazy(() => import('./pageNotFound/PageNotFound'));
const Monument=React.lazy(()=>import('./components/Monument'));
const DetailsMonument=React.lazy(()=>import('./components/DetailsMonument'));


const MyGames=React.lazy(() => import('./components/Games'));



const Main = ({match}) => {
  return(
  <>
 
  <div id="wraperexpedition" >
  <div class="bgexpedition" style={{backgroundImage:"url('/img/mountains.jpg')"}}></div> 

  
  <Navbar />
  <div class="nav-top-block"></div>
  <div class="main-content">

  <Switch>

  <Route path={`${match.path}/about`}  component={MyAbout} />
  <Route path={`${match.path}/contact`} exact={true} component={MyContact} />
  <Route path={`${match.path}/services`} exact={true} component={MyServices} />
  <Route path={`${match.path}/places`} exact={true} component={MyPlaces} />
  <Route path={`${match.path}/products`} exact={true} component={MyProducts} />
  <Route path={`${match.path}/games`} exact={true} component={MyGames} />
  <Route path={`${match.path}/castronomy`} exact={true} component={MyGastronomy} />

  <Route path={`${match.path}/maison`} exact={true} component={MyGuestHousee} />
  <Route path={`${match.path}/virtual`} exact={true} component={Virtual} />
  <Route path={`${match.path}/cult`} exact={true} component={Cult} />
  <Route path={`${match.path}/sportif`} exact={true} component={Sportif} />
  <Route path={`${match.path}/sante`} exact={true} component={Sante} />
  <Route path={`${match.path}/soufi`} exact={true} component={Soufi} />

  <Route path={`${match.path}/restaurants`} exact={true} component={restaurants} />
  <Route path={`${match.path}/camping`} exact={true} component={AllCamping} />
  <Route path={`${match.path}/perso`} exact={true} component={persocicuits} />

  <Route path={`${match.path}/events`} exact={true} component={MyEvents} />
  <Route path={`${match.path}/details/:id`} exact={true} component={Details} />
  <Route path={`${match.path}/detailsGames/:id`} exact={true} component={DetailsJeux} />
  <Route path={`${match.path}/detailsGastr/:id`} exact={true} component={DetailsCastronomy} />
  <Route path={`${match.path}/detailsEvents/:id`} exact={true} component={DetailsEvents} />
  <Route path={`${match.path}/accomodation/:id`} exact={true} component={DetailsHouse} />
  <Route path={`${match.path}/detailsResto/:id`} exact={true} component={detailsResto} />
  <Route path={`${match.path}/detailsCenter/:id`} exact={true} component={detailsCamping} />
  <Route path={`${match.path}/circuits`} exact={true} component={ourcicuits} />
  <Route path={`${match.path}/monument/:placeId`} exact={true} component={Monument} />
  <Route path={`${match.path}/monument/details/:id`} exact={true} component={DetailsMonument} />








  </Switch>
  </div>
  </div>
  </>
  );
}






const DashAdmin = ({match}) => {
  var ps;
const cc=getCookie("role");
const user=getCookie("user");
console.log("aaa"+cc);
console.log(user);
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Admin";
  };
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routes}
            logo={{
              outterLink: "/myhomee",
              text: "Retour",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
              role={cc}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={Dashboard} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/images`} exact={true} component={Allimages} />
        <Route path={`${match.path}/users`} exact={true} component={AllUsers} />  
        <Route path={`${match.path}/products`} exact={true} component={Allproducts} />
        <Route path={`${match.path}/circuits`} exact={true} component={Circuits} />
        <Route path={`${match.path}/events`} exact={true} component={Allevents} />
        <Route path={`${match.path}/guests`} exact={true} component={Guests} />
        <Route path={`${match.path}/places`} exact={true} component={Places} />
        <Route path={`${match.path}/contacts`} exact={true} component={Allcontacts} />
        <Route path={`${match.path}/gastronomy`} exact={true} component={AllCastronomy} />
        <Route path={`${match.path}/jeux`} exact={true} component={AllJeux} />
        <Route path={`${match.path}/place`} exact={true} component={PlaceAdmin} />
        <Route path={`${match.path}/maison`} exact={true} component={AccomodationAdmin} />
        <Route path={`${match.path}/circuit/add`} exact={true} component={addcircuit} />
        <Route path={`${match.path}/circuit`} exact={true} component={allcircuit} />

        <Route path={`${match.path}/calendrier`} exact={true} component={DemoApp} />











    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};
const DashOwner = ({match}) => {
  var ps;

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routesOwner) => {
    return routesOwner.map((prop, key) => {
      if (prop.layout === "/owner") {
        return (
          <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Owner";
  };
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routesOwner}
            logo={{
              outterLink: "/myhomee",
              text: "Retour",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={DashboardOwner} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/products`} exact={true} component={Allproducts} />
        <Route path={`${match.path}/events`} exact={true} component={Allevents} />
        <Route path={`${match.path}/circuits`} exact={true} component={CircuitsOwner} />
        <Route path={`${match.path}/services`} exact={true} component={ServicesOwner} />
        <Route path={`${match.path}/gastronomy`} exact={true} component={AllCastronomy} />
        <Route path={`${match.path}/jeux`} exact={true} component={AllJeux} />
        <Route path={`${match.path}/place`} exact={true} component={PlaceAdmin} />
        <Route path={`${match.path}/maison`} exact={true} component={AccomodationAdmin} />
        <Route path={`${match.path}/restaurants`} exact={true} component={Allrestaurants} />
        <Route path={`${match.path}/camping`} exact={true} component={AllcampingCenter} />



    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};
const DashUser = ({match}) => {
  var ps;

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "HawasBia";
  };
 
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routesUser}
            logo={{
              outterLink: "/myhomee",
              text: "Retour",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={DashboardUser} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/products`} exact={true} component={ProductsUser} />
        <Route path={`${match.path}/orders`} exact={true} component={OrdersUser} />
        <Route path={`${match.path}/events`} exact={true} component={EventSUserss} />
        <Route path={`${match.path}/guests`} exact={true} component={GuestHouseUser} />









    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <Suspense fallback={      <Spinner type="grow" color="secondary" />
}>
      <BrowserRouter>
        <Switch>
          <Route path="/login"  component={login} />

          <Route
            path="/register"
           
            component={register}
          />
          <Route
            path="/users/password/forget"
            
            component={forgotpassword}
          />

          <Route
            path="/users/password/reset/:token"
            
            component={resetpassword}
          />
        

            <Route
            path="/myhomee"
            
            render={(props) => <MyHome {...props} />}
          />
          

       
          <Route path="/m" component={Main} />
          <Route path="/404" component={notfound} />


          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          <PrivateRoute path="/subscriber" component={DashUser} />
          <AdminRoute path="/admin"   component={DashAdmin} />
          <OwnerRoute path='/owner' component={DashOwner}  /> 


          <Redirect from="/" to="/myhomee" />
        </Switch>
      </BrowserRouter>
      </Suspense>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
