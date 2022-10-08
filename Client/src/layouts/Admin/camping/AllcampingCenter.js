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

export default function AllcampingCenter({ history }) {

  var [centers, setCenters] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [loading,setLoading]=useState(false);
  const [loading1,setLoading1]=useState(true);


  const [img ,setImg] =useState("");
  const [image1, setImage1] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    nbrStar: "",
    price: "",
    description: "",
    image: "",
  });
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [descript,setDescript]=useState("");


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
    var data = new FormData();
    setLoading(true);

    data.append("image", file);
    data.append("name", formData.name);
    data.append("address", formData.nbrStar);
    data.append("phoneNumber", formData.price);
    data.append("description", descript);
    for (const key of Object.keys(image1)) {
        data.append('imgCollection', image1[key])
    }
    Axios.post(`${process.env.REACT_APP_URL}camping/upload-images`, data, {
    }).then(res => {
        console.log(res.data)
        setLoading(false);

        toast.success("event added successfully")
        window.location.reload();
    })
}

  const loadCenters = () => {
    Axios.get(`${process.env.REACT_APP_URL}camping`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCenters(res.data);
        console.log(res.data);
        setLoading1(false);

        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadCenters();
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
      name: 'Star Number',
      selector: 'nbrStar',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
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
      cell: d =>  (<><button className="btn btn-sm btn-primary" style={{marginRight:"1rem",color:"green"}} onClick={()=>handletoggleUpdate(d)}><i className="tim-icons icon-pencil"></i></button>
      <button className="btn btn-sm btn-danger" style={{marginRight:"1rem",color:"red"}} onClick={() => handleDelete(d._id)}>
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
    data.append("address", formData.nbrStar);
    data.append("phoneNumber", formData.price);
    data.append("description", descript);


    toast.success("camping center added successfully")


    Axios.post(`${process.env.REACT_APP_URL}camping`, data, {
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
    data.append("address", modalInfo.nbrStar);
    data.append("phoneNumber", modalInfo.price);
    data.append("description", modalInfo.description);

    toast.success("camping center updated successfully")

    //console.log("update ok "+modalInfo.name);
   // return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}camping/${id}`, data, {
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
    Axios.delete(`${process.env.REACT_APP_URL}camping/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("camping center deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { name, nbrStar,price , description , image } = formData;
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
                <ModalHeader toggle={isUpdated}>Update camping center</ModalHeader>
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
                   <Label htmlFor="nbrStar">Start Number</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="nbrStar"
                  name="nbrStar"
                  value={modalInfo.nbrStar}
                  onChange={handleChange("nbrStar")}
                />
                <Label htmlFor="price">Price</Label>
                <Input
                    color="info"
                    type="number"
                    style={{color: '#000'}}

                    id="price"
                    name="price"
                    value={modalInfo.price}
                    onChange={handleChange("price")}
                  />

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
            <ModalHeader toggle={isToggled}>Add camping center</ModalHeader>
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
                   <Label htmlFor="nbrStar">Star Number</Label>                 
                  <Input
                  color="info"
                  type="number"
                  id="nbrStar"
                  style={{color: '#000'}}
                  name="nbrStar"
                  value={nbrStar}
                  onChange={handleChange("nbrStar")}
                />
                 <Label htmlFor="price">Price</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange("price")}
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
              loading1? 
              (<Loading />)
              :
              (
                <Card>
                <CardHeader>
                  <CardTitle tag="h4">Camping Center</CardTitle>
                </CardHeader>
                <CardBody>
                <DataTableExtensions
                  columns={columns}
                  data={centers}
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