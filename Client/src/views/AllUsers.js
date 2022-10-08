import Axios from "axios";
import { signout } from "helpers/auth";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { toast } from "react-toastify";
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
import { updateUser, isAuth, getCookie } from '../helpers/auth';

export default function AllUsers({ history }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [isToggled1, setIsToggled1] = React.useState(false);
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  
  const  columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true,
    },
    {
      name: 'Actions',
      sortable: true,
      cell: x=>(<>
      <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"admin")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to admin"><i className="tim-icons icon-bank btn-tooltip"></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"subscriber")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to subscriber"><i className="tim-icons icon-single-02 btn-tooltip"></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"owner")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to owner"><i className="tim-icons icon-badge btn-tooltip" ></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleDetails(x)} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="show details" ><i className="tim-icons icon-notes btn-tooltip"></i></button>
      </>)
    },
   
  ];



  const [formData, setFormData] = useState({
    name: "",
    myImage: "",
  });



  const loadUsers = () => {
    Axios.get(`${process.env.REACT_APP_URL}users`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadUsers();
  }, []);
  
  const  handleAdd=(id,role)=>{
        const token = getCookie('token');
        console.log(token);
      

     
        Axios
          .put(
            `${process.env.REACT_APP_API_URL}/admin/user/update`,
            {
             role,
             id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            updateUser(res, () => {
              toast.success(`${role} changed successfully`);

            });

          })
          .catch(err => {
            console.log(err.response);
          });

          
setTimeout(toast.success(`${role} changed successfully`),2000)
          window.location.reload();



  }
 const  handleRemove=(id)=>{
    const token = getCookie('token');
        console.log(token);
      

        let role="subscriber"
        Axios
          .put(
            `${process.env.REACT_APP_API_URL}/admin/user/update`,
            {
             role,
             id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            updateUser(res, () => {
              toast.success('User became simple user');

            });

          })
          .catch(err => {
            console.log(err.response);
          });
          window.location.reload();
          toast.success('User became simple user');


  }
  const  handleDetails=(user)=>{
      setUser(user);
      setIsToggled1(!isToggled1);
      
    
  }





  const all = users.map((x) => {
    return (
      <tr>
        <td>{x.name}</td>
       
        <td>
        {x.email}
       
        </td>
        <td>
        {x.role}
        </td>
        <td>
        <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"admin")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to admin"><i className="tim-icons icon-bank btn-tooltip"></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"subscriber")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to subscriber"><i className="tim-icons icon-single-02 btn-tooltip"></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleAdd(x._id,"owner")} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="change to owner"><i className="tim-icons icon-badge btn-tooltip" ></i></button>
        <button style={{marginRight:"1rem"}} onClick={()=>handleDetails(x)} className="btn-tooltip" data-toggle="tooltip" data-placement="top" title="show details" ><i className="tim-icons icon-notes btn-tooltip"></i></button>
        </td>
      </tr>
    );
  });

  return (
    <>

      <div className="content">
     
        <Row>
        <Modal isOpen={isToggled1} toggle={isToggled1}>
    <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
    <ModalBody>
        <h4 color="primary">Name</h4>
        <p color="info">{user? user.name : null}</p>
        <h4 color="primary">Email</h4>
        <p color="info">{user? user.email : null}</p>
        <h4 color="primary">Firstname</h4>
        <p color="info">{user? user.firstname : null}</p>
        <h4 color="primary">Lastname</h4>
        <p color="info">{user? user.lastname : null}</p>
        <h4 color="primary">Role</h4>
        <p color="info">{user? user.role : null}</p>
     
    </ModalBody>
    <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle1}>
                Cancel
              </Button>
            </ModalFooter>
  </Modal>
        
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">User</CardTitle>
              </CardHeader>
              <CardBody>
                <DataTableExtensions
      columns={columns}
      data={users}
    >
      <DataTable
        noHeader
        defaultSortField="name"
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
