import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useDropzone } from "react-dropzone";

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

export default function Allimages({ history }) {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);

  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    name: "",
    myImage: "",
  });
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
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
    
        setImage(acceptedFiles);
        console.log(acceptedFiles);
        console.log(image);
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

    var myformData = new FormData();
    for (const key of Object.keys(image)) {
        myformData.append('imgCollection', image[key])
    }
    myformData.append("name",formData.name);
    Axios.post("http://localhost:5000/imagess/upload-images", myformData, {
    }).then(res => {
        console.log(res.data)
    })
}

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
 const  confirmation = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };


  const loadImages = () => {
    Axios.get(`${process.env.REACT_APP_URL}images`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setImages(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  useEffect(() => {
    loadImages();


  }, []);
  const handleToggle = (image) => {
    setImg(image);

   toggle1();
   console.log(isToggled1);
   console.log(image);

  
  };
  const  columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
 
    {
      name:'Slide',
      selector:"slide",
      cell: x=> x.slide ? (<p style={{color:"green"}}>En slide</p>) : (<p style={{color:"red"}}>N'est pas en slide</p>)
       

    },
    {
      name: 'Image',
      selector: 'image',
      sortable: true,
      cell: d =>  <img
      alt={d._id}
      className="avatar" onClick={()=>handleToggle(d.myImage)} src={process.env.PUBLIC_URL + `/uploads/${d.myImage}`}
      />,


    },
    {
      name: 'Actions',
      sortable: true,
      cell: d =>  (<>
                <button className="btn btn-sm btn-success" style={{marginRight:"1rem"}} onClick={()=>handleSlide(d._id,!d.slide)}><i className="tim-icons icon-simple-add"></i></button>

      <button className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => confirmation(d._id)}>
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
    console.log(formData.myImage);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("myImage", file);
    data.append("name", formData.name);
    data.append("slide",false);
    toast.success("image added successfully")

    //    alert(data.getAll("myImage"));
    Axios.post(`${process.env.REACT_APP_URL}images`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("image added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}images/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("image deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { name, myImage } = formData;
 const  handleSlide=(id,slide)=>{
  Axios.put(`${process.env.REACT_APP_URL}images/${id}`,{
    slide
  }, {

    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    console.log(response);
    if(slide===true)
    toast.info("image added successfully to slide")
    else  
    toast.warn("image retired from slide")

   
    window.location.reload();
  });
};
  

  const all = images.map((x) => {
    return (
      <tr>
        <td>{x.name}</td>
        <td>
          <img
            alt={x.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${x.myImage}`}
            onClick={()=>handleToggle(x.myImage)}
          />
        </td>
        <td>{x.slide ? (<p style={{color:"green"}}>En slide</p>) : (<p style={{color:"red"}}>N'est pas en slide</p>)}</td>
        <td>
          <button style={{marginRight:"1rem"}} onClick={()=>handleSlide(x._id,!x.slide)}><i className="tim-icons icon-simple-add"></i></button>
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(x._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>

      <div className="content">
      <Modal isOpen={isToggled1} toggle={isToggled1}>
    <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
    <ModalBody>
      <img
      alt={img}
      className="avatar" src={process.env.PUBLIC_URL + `/uploads/${img}`}
      />
    </ModalBody>
    <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle1}>
                Cancel
              </Button>
            </ModalFooter>
  </Modal>
        <Row>
          <Modal isOpen={isToggled} toggle={isToggled}>
            <ModalHeader toggle={isToggled}>Add Image</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
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
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input
                      color="info"
                      type="file"
                      style={{color: '#000'}}

                      name="myImage"
                      id="myImage"
                      value={myImage}
                      onChange={handleChangeFile("myImage")}
                    />
                  </div>
                </FormGroup>

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
   
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Images</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={images}
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
