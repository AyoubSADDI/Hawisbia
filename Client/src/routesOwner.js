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
import AllCastronomy from "layouts/Admin/castronomy/allCastronomy";
import AllJeux from "layouts/Admin/jeux/allJeux";
import Login from "screens/Login";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import CircuitsOwner from "views/Owner/CircuitsOwner";
import ContactsOwner from "views/Owner/ContactsOwner";
import DashboardOwner from "views/Owner/DashboardOwner";
import EventsOwner from "views/Owner/EventsOwner";
import ProductsOwner from "views/Owner/ProductsOwner";
import ServicesOwner from "views/Owner/ServicesOwner";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import AllcampingCenter from "layouts/Admin/camping/AllcampingCenter";
import ProductOwner from "layouts/Owner/Product/ProductOwner";
import EventOwner from "layouts/Owner/Event/EventOwner";
import AccomodationOwner from "layouts/Owner/Accomodation/AccomodationOwner";
import RestoOwner from "layouts/Owner/RestoOwner/RestoOwner";
import CampingOwner from "layouts/Owner/Camping/CampingOwner";
import JeuxOwner from "layouts/Owner/Jeux/JeuxOwner";


var routes = [
  {
    path: "/",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/owner",
  },
  {
    path: "/profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/owner",
  },

  {
    path: "/products",
    name: "Products",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: ProductOwner,
    layout: "/owner",
  },
  {
    path: "/events",
    name: "Events",
    rtlName: "إخطارات",
    icon: "tim-icons icon-calendar-60",
    component: EventOwner,
    layout: "/owner",
  },

  {
    path: "/maison",
    name: "Guest houses",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-istanbul",
    component: AccomodationOwner,
    layout: "/owner",
  },
  {
    path: "/gastronomy",
    name: "Gastronomy",
    rtlName: "طباعة",
    icon: "tim-icons icon-bullet-list-67",
    component: AllCastronomy,
    layout: "/owner",
  },
  {
    path: "/restaurants",
    name: "Restaurant",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-map-big",
    component: RestoOwner,
    layout: "/owner",
  },
  {
    path: "/camping",
    name: "Camping center",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-compass-05",
    component: CampingOwner,
    layout: "/owner",
  },
  {
    path: "/jeux",
    name: "Activity out door",
    rtlName: "طباعة",
    icon: "tim-icons icon-bullet-list-67",
    component: JeuxOwner,
    layout: "/owner",
  },
];
export default routes;
