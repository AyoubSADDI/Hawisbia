import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

export default function Allcontacts({ history }) {
  var [contacts, setContacts] = useState([]);

  var [modalInfo, setModalInfo] = useState([]);
  let  rows=[
    {
      "firstName":"aaa",
      "lastName":"aaa",
      "mail":"brahimhm470@gmail.com",
      "message":"aaaa"
    }
  ]
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    image: "",
  });
  
 

const  columns = [
    {
      name: 'Firstname',
      selector: 'firstName',
      sortable: true,
    },
    {
      name: 'Lastname',
      selector: 'lastName',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'mail',
      sortable: true,
    },
    {
      name: 'Message',
      selector: 'message',
      sortable: true,
    },
    {
      name: 'Actions',
      sortable: true,
      cell: d =>  (<>
      <button className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => handleDelete(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
      </>
      ),


    },
   
  ];
 
    
  
  




  const loadcontacts = () => {
    Axios.get(`${process.env.REACT_APP_URL}contacts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setContacts(res.data);
        console.log("aaa"+res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadcontacts();
  }, []);
 




  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}contacts/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("contact deleted");
      window.location.reload();
    });
  };
 let  rows1=[
   {
     "firstName":"aaa",
     "lastName":"aaa",
     "mail":"brahimhm470@gmail.com",
     "message":"aaaa"
   }
 ]


  //this methode is wrong

rows.push(...contacts);
console.log(rows);
    return (
    <>

      <div className="content">
      
        <Row>
      
         

          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">contacts</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={contacts}
    >
      <DataTable
        noHeader
        defaultSortField="firstName"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
