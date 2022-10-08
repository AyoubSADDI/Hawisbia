import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
import { useDropzone } from "react-dropzone";
import { Loading } from "layouts/Loading";
import { getCookie } from "helpers/auth";

export default function RestoOwner({ history }) {

  var [restaurants, setRestaurants] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [image1, setImage1] = useState("");
  const [descript,setDescript]=useState("");
  const [details,setDetails]=useState("");
  const [loading,setLoading]=useState(false);
  const [loading1,setLoading1]=useState(true);




  const [img ,setImg] =useState("");
    const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    description: "",
    image: "",
  });
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));
 
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
  };
  
  const activeStyle = {
    borderColor: "#2196f3"
  };
  
  const acceptStyle = {
    borderColor: "#00e676"
  };
  
  const rejectStyle = {
    borderColor: "#ff1744"
  };
  
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
  };
  
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "4rem",
    height: "4rem",
    padding: 4,
    boxSizing: "border-box"
  };
  
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };
  
  const img1 = {
    display: "block",
    width: "auto",
    height: "100%"
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDragEnter:true,
    onFileDialogCancel:true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
    
        setImage1(acceptedFiles);
        console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      console.log(files);

    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );
  
  const filepath = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img1} />
      </div>
    </div>
  ));
  const onSubmit=(e)=> {
    e.preventDefault()
    setLoading(true)


    var data = new FormData();
    data.append("image", file);
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("description", descript);
    const user=getCookie("id");

    data.append("user",user);
    data.append("details",details);



    for (const key of Object.keys(image1)) {
        data.append('imgCollection', image1[key])
    }
    Axios.post(`${process.env.REACT_APP_URL}restaurants/upload-images`, data, {
    }).then(res => {
        console.log(res.data)
        setLoading(false)

        toast.success("event added successfully")
        window.location.reload();
    })
}
  const loadRestaurants = () => {
      const user=getCookie("user")
    Axios.get(`${process.env.REACT_APP_URL}restaurants/user/${user}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
        setLoading1(false);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadRestaurants();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log("hihi"+prod.image);
    console.log(formData);
    console.log(modalInfo);

    toggleUpdate();

  };
  const  columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: 'phoneNumber',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Image',
      selector: 'image',
      sortable: true,
      cell: d =>  <img
      alt={d._id}
      className="avatar" onClick={()=>handleToggle(d.imgCollection[0])} src={d.imgCollection[0]}
      />,


    },
    {
      name: 'Actions',
      sortable: true,
      cell: d =>  (<><button  className="btn btn-sm btn-primary" style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(d)}><i className="tim-icons icon-pencil"></i></button>
      <button  className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => handleDelete(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
      </>
      ),


    },


  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("on submit " + formData.name);

    const data = new FormData();
    console.log(formData.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("description", formData.description);


    toast.success("event added successfully")


    Axios.post(`${process.env.REACT_APP_URL}restaurants`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("event added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id , e) => {
    e.preventDefault();

    console.log("on submit " + modalInfo.name);

    const data = new FormData();
    console.log(modalInfo.image);
    //console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", modalInfo.name);
    data.append("address", modalInfo.address);
    data.append("phoneNumber", modalInfo.phoneNumber);
    data.append("description", modalInfo.description);

    toast.success("Restaurant updated successfully")

    //console.log("update ok "+modalInfo.name);
   // return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}restaurants/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}restaurants/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("restaurant deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { name, address,phoneNumber , description , image } = formData;
  //this methode is wrong





  return (
    <>

      <div className="content">


        <Row>
            <Modal isOpen={isToggled1} toggle={isToggled1}>
                <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
                <ModalBody>
                <img
                alt={img}
                className="avatar" src={img}
                />
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle1}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
            <Modal isOpen={isUpdated} toggle={isUpdated}>
                <ModalHeader toggle={isUpdated}>Update restaurant</ModalHeader>
                <ModalBody>
                <Form onSubmit={(e) => handleUpdate(modalInfo._id , e)} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="name"
                    name="name"
                    value={modalInfo.name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="address">Address</Label>                 
                  <Input
                  color="info"
                  type="text"
                  style={{color: '#000'}}

                  id="address"
                  name="address"
                  value={modalInfo.address}
                  onChange={handleChange("address")}
                />
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    color="info"
                    type="number"
                    style={{color: '#000'}}

                    id="phoneNumber"
                    name="phoneNumber"
                    value={modalInfo.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                  />
 <FormGroup>
                <CKEditor
                    editor={ ClassicEditor }
                    data={descript}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDescript(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </FormGroup>
                <FormGroup>
                <CKEditor
                    editor={ ClassicEditor }
                    data={details}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDetails(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </FormGroup>
                </FormGroup>
                <FormGroup>
                <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">
                  Update
                </Button>
              </Form>
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggleUpdate}>
                            Cancel
                        </Button>
                </ModalFooter>
            </Modal> 
          <Modal isOpen={isToggled} toggle={isToggled}>
            <ModalHeader toggle={isToggled}>Add restaurant</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="address">Address</Label>                 
                  <Input
                  color="info"
                  type="text"
                  id="address"
                  style={{color: '#000'}}
                  name="address"
                  value={address}
                  onChange={handleChange("address")}
                />
                 <Label htmlFor="phoneNumber">Phone Number</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange("phoneNumber")}
                />
                        <FormGroup>
                        <FormGroup>
                <CKEditor
                    editor={ ClassicEditor }
                    data={descript}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDescript(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </FormGroup>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
                </FormGroup>
                {loading ? (<Loading />) : null } 

                <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Col md="12">
            <Button outline onClick={toggle}>
              {" "}
              Add
            </Button>
          </Col>
          <Col md="12">
            {
              loading1 ?
              (<Loading />)
              :
              (
                <Card>
                <CardHeader>
                  <CardTitle tag="h4">restaurants</CardTitle>
                </CardHeader>
                <CardBody>
                <DataTableExtensions
                  columns={columns}
                  data={restaurants}
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
              )
            }
           
          </Col>
        </Row>
      </div>
    </>
  );
}