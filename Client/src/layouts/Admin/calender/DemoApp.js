
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Axios from "../../../components/DetailsComp/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
  } from "reactstrap";
  const DemoApp = () => {
    var eventss = [];

    const [detailsEvents, setDetailsEvents] = useState([]);
   const getEventHandler =  ()=>{
   
  
    Axios.get(`${process.env.REACT_APP_URL}events`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        setDetailsEvents(res.data);
        console.log("ayoub"+res.data.startDate);
     //   console.log("nameeeeeeeeeeee"+props);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });  
      
      };
      useEffect(() => {
        getEventHandler();
      }, [])

  detailsEvents.map((event) => {
    console.log("ayoub"+event.startDate+event.name+event.desc)
    console.log("ayoub2"+event.desc)
            eventss.push({title:event.name+event.desc,date:event.startDate})
            console.log('tab'+{title:event.name+event.desc,date:event.startDate})          
     })

         
         
        return (
            <div className="content">
      
        <Row>
            <Card>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
           initialView="dayGridMonth"
           weekends={false}
           events={eventss} 
          />
          </Card>
          </Row>
          </div>
          
        )
          
    }

export default  DemoApp;