import Axios from "axios";
import { getCookie } from "helpers/auth";
import { signout } from "helpers/auth";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import { confirmAlert } from 'react-confirm-alert'; 

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
import { handlePlay } from "video-react/lib/actions/video";

export default function RestoUser({ history }) {
  var [booking, setBooking] = useState([]);
  var [restos, setrestos] = useState([]);
  var [restoId, setrestoId] = useState();
  var [restoName, setrestoName] = useState();
  var [restoImg, setrestoImg] = useState();
  var [restoQte, setrestoQte] = useState();
  const [formData, setFormData] = useState({
    restoQte:0
  });

  var [total,setTotal]=useState(0);
  var [id, setId]=useState("");
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));

  const token=getCookie("token")

  const loadBooking = () => {
      const user=getCookie("id")
      console.log(user);
    Axios.get(`${process.env.REACT_APP_URL}booking/prod/user/payment/${user}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setrestos(res.data.restos);
        console.log(res.data._id);
        setId(res.data._id);

        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadBooking();
  }, []);

  const  confirmation = (id) => {
    confirmAlert({
      title: 'Confirm Payement',
      message: 'Do you confirm Payment',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {handlePay(id);
       
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };
 const  handlePay=()=>{
  var btn1 = document.querySelector('#btn1 button');
  btn1.addEventListener('click', function(){
    console.log("aaaa");
  });
  }
  const handleDelete=(resto)=>{
    const user=getCookie("id")

    Axios.post(`${process.env.REACT_APP_URL}booking/resto/delete/resto/${user}/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("resto deleted from bascket");
      window.location.reload();
    });
  }

 



  let his = useHistory();

var mytotal=0;
const handleQte=(id,name,qte,img)=>{
 setrestoId(id);
 setrestoName(name);
 setrestoQte(qte);
 setrestoImg(img);
  toggle();
  console.log(isToggled);
  
}
const handleChange = (text) => (e) => {
  setFormData({ ...formData, [text]: e.target.value });
};
const onSubmitQte=(e)=>{
  e.preventDefault();
  const user=getCookie("id")

  Axios.post(`${process.env.REACT_APP_URL}booking/prod/update/${id}/${restoId}/${restoQte}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    console.log(response);
    toast.success("resto number places updated");
    window.location.reload();
  });
}
  const all = restos.map((e) => {
    return (
      <tr>
        <td>{e.name}</td>
        <td>

          {e.qte}

          </td>
        {/**
         * <td>
          <img
            alt={e.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/events/${e.imgCollection[0]}`}
          />
        </td> 
         * 
         * 
         * 
         */}
        <td>
            {e.price}
        </td>
        <td>
        <img
            alt={e.name}
            className="avatar"
            src={e.img[0]}
            
          />
        </td>
        <td>
        <button className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => handleDelete(e.restoId)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
          <button  className="btn btn-sm btn-success" style={{marginRight:"1rem"}} onClick={() => handleQte(e.restoId,e.name,e.qte,e.img[0])}>
            <i className="tim-icons icon-simple-add"></i>
          </button>
        </td>
      

      </tr>
    );
  });


  return (
    <>

      <div className="content">

        <Row>
        <Modal isOpen={isToggled} toggle={isToggled}>
    <ModalHeader toggle={isToggled}>Show Image</ModalHeader>
    <ModalBody>
      <img
      alt={restoName}
      className="avatar" src={restoImg}
      />
      <Form onSubmit={onSubmitQte}>
      <Label htmlFor="placesNembre">Number reservation</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="restoQte"
                  name="restoQte"
                  value={restoQte}
                  onChange={ ( data ) => {
                    setrestoQte(data.target.value);
                } }
                />
<FormGroup>
<Button className="btn-neutral" color="info" >
                Confirm
              </Button>
</FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
  </Modal>
   

        
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Castronomy Basket </CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>price</th>
                      <th>Image</th>
                      <th>Actions</th>

                    </tr>
                  </thead>
                  <tbody>{all}</tbody>

                </Table>
                <Button color="primary" onClick={()=>confirmation(id)}>
                  Confirm Payement
                </Button>
            
               <StripeCheckout
        stripeKey="pk_test_51ImBAwJ0moiTa5umEfSh03RMtuasGgTbe6AImzHT4HZmnbJVCJiOKvaVDMlGl7N6M40lrIUiepMmsFqzwSMnD11W00DMztepG5"
        token={token}
        amount={200}
        name="all restos"
        billingAddress
        shippingAddress
        currency="DT"
        
      />
         
                           
               
    
           
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
