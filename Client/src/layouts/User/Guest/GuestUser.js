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

export default function GuestUser({ history }) {
  var [booking, setBooking] = useState([]);
  var [guests, setguests] = useState([]);
  var [guestId, setguestId] = useState();
  var [guestName, setguestName] = useState();
  var [guestImg, setguestImg] = useState();
  var [guestQte, setguestQte] = useState();
  const [formData, setFormData] = useState({
    guestQte:0
  });

  var [total,setTotal]=useState(0);
  var [id, setId]=useState("");
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const [isToggled1, setIsToggled1] = React.useState(false);
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));

  const token=getCookie("token")

  const loadBooking = () => {
      const user=getCookie("id")
      console.log(user);
    Axios.get(`${process.env.REACT_APP_URL}booking/guest/user/payment/${user}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setguests(res.data.guests);
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
          onClick: () => {handlePayLivraison(id);
       
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };
  const  handlePayLivraison=()=>{
    const mode="home"
    Axios.post(`${process.env.REACT_APP_URL}booking/guest/confirm/pay/${id}/${mode}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("confirmed");
      window.location.reload();
    });
    }
    const  handlePayCard=()=>{
      const mode="card"
      Axios.post(`${process.env.REACT_APP_URL}booking/guest/confirm/pay/${id}/${mode}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response);
        toast.error("confirmed");
        window.location.reload();
      });
      }
  const handleDelete=(guest)=>{
    const user=getCookie("id")

    Axios.post(`${process.env.REACT_APP_URL}booking/prod/delete/guest/${user}/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("guest deleted from bascket");
      window.location.reload();
    });
  }

 



  let his = useHistory();

var mytotal=0;
const handleQte=(id,name,qte,img)=>{
 setguestId(id);
 setguestName(name);
 setguestQte(qte);
 setguestImg(img);
  toggle();
  console.log(isToggled);
  
}
const handleChange = (text) => (e) => {
  setFormData({ ...formData, [text]: e.target.value });
};
const onSubmitQte=(e)=>{
  e.preventDefault();
  const user=getCookie("id")

  Axios.post(`${process.env.REACT_APP_URL}booking/prod/update/${id}/${guestId}/${guestQte}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    console.log(response);
    toast.success("guest number places updated");
    window.location.reload();
  });
}
  const all = guests.map((e) => {
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
        <button  className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => handleDelete(e.guestId)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
          <button  className="btn btn-sm btn-success" style={{marginRight:"1rem"}} onClick={() => handleQte(e.guestId,e.name,e.qte,e.img[0])}>
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
      alt={guestName}
      className="avatar" src={guestImg}
      />
      <Form onSubmit={onSubmitQte}>
      <Label htmlFor="placesNembre">Number reservation</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="guestQte"
                  name="guestQte"
                  value={guestQte}
                  onChange={ ( data ) => {
                    setguestQte(data.target.value);
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
  <Modal isOpen={isToggled1} toggle={isToggled1}>
    <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
    <ModalBody>
     
    <Button color="primary" onClick={()=>confirmation(id)}>
                  Payement a la livraision
                </Button>
            
               <StripeCheckout
        stripeKey="pk_test_51ImBAwJ0moiTa5umEfSh03RMtuasGgTbe6AImzHT4HZmnbJVCJiOKvaVDMlGl7N6M40lrIUiepMmsFqzwSMnD11W00DMztepG5"
        token={token}
        amount={200}
        name="all events"
        billingAddress
        shippingAddress
        currency="DT"
        
      />
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
                {
                  guests.length===0 ?(" ") :(
                    <Button color="primary" onClick={()=>toggle1()}>
                    Confirm Payement
                  </Button>
                  )
                }
            

         
                           
               
    
           
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
