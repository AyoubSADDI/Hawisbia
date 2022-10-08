import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { confirmAlert } from 'react-confirm-alert'; 
import { useDropzone } from "react-dropzone";
import { Spinner } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';



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
import { Loading } from "layouts/Loading";

export default function PlaceAdmin({ history }) {
  var [place, setPlace] = useState([]);
  var [circuit, setCircuit] = useState([]);

  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState([]);
  const [image1, setImage1] = useState("");
  const [loading,setLoading]=useState(false);
  const [loading1,setLoading1]=useState(true);
  const [id,setId]=useState();

  const [descript,setDescript]=useState("");




  const [img ,setImg] =useState("");
  const [nameC ,setNameC] =useState("");

    const [formData, setFormData] = useState({
    namePlace: "",
    descriptionPlace: "",
    lanPlace: "",
    longPlace: "",
    image: "",
  });
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isToggled2, setIsToggled2] = React.useState(false);
  const [isToggled3, setIsToggled3] = React.useState(false);
  const [isToggled4, setIsToggled4] = React.useState(false);

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggle2 = React.useCallback(() => setIsToggled2(!isToggled2));
  const toggle3 = React.useCallback(() => setIsToggled3(!isToggled3));
  const toggle4 = React.useCallback(() => setIsToggled4(!isToggled4));


  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));
  const  confirmation = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {handleDelete(id);
            toast.error("Place deleted");
            window.location.reload();
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };
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
    accept: "image/* , audio/* , video/* ",
    noClick: true,
    onDragEnter:true,
    onFileDialogCancel:true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
         
      setAudio(acceptedFiles);
      setVideo(acceptedFiles);
    
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
    data.append("namePlace", formData.namePlace);
    data.append("descriptionPlace", descript);
    data.append("lanPlace", formData.lanPlace);
    data.append("longPlace", formData.longPlace);



    for (const key of Object.keys(image1)) {
        data.append('imgCollection', image1[key])
    }
    Axios.post(`${process.env.REACT_APP_URL}placee/upload-images`, data, {
    }).then(res => {
        console.log(res.data)
        setLoading(false);

        toast.success("event added successfully")
        window.location.reload();
    })
}
const onSubmitAudio=(e)=> {
  e.preventDefault()
setLoading(true)
  var data = new FormData();
  data.append("audio", audio);

  for (const key of Object.keys(image1)) {
      data.append('audio', audio[key])
  }
  Axios.post(`${process.env.REACT_APP_URL}placee/upload-audio/${id}`, data, {
  }).then(res => {
      console.log(res.data)
      setLoading(false);

      toast.success("audio added successfully")
      window.location.reload();
  })
}
const onSubmitVideo=(e)=> {
  e.preventDefault()
setLoading(true)
  var data = new FormData();
  data.append("videos", video);

  for (const key of Object.keys(video)) {
      data.append('video', video[key])
  }
  Axios.post(`${process.env.REACT_APP_URL}placee/upload-video/${id}`, data, {
  }).then(res => {
      console.log(res.data)
      setLoading(false);

      toast.success("video added successfully")
      window.location.reload();
  })
}
const onSubmitCircuit=(e)=> {
  e.preventDefault()
setLoading(true)
  var data = new FormData();
  data.append("name", nameC);

  for (const key of Object.keys(video)) {
      data.append('video', video[key])
  }
  Axios.post(`${process.env.REACT_APP_URL}placee/circuit/${id}`,{"name":nameC}, {
  }).then(res => {
      console.log(res.data)
      setLoading(false);

      toast.success("circuit added successfully")
      window.location.reload();
  })
}
  const loadPlace = () => {
    Axios.get(`${process.env.REACT_APP_URL}placee`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setPlace(res.data);
        setLoading1(false);

        //console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
      Axios.get(`${process.env.REACT_APP_URL}circuit`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setCircuit(res.data);
          setLoading1(false);
  
          //console.log(res.data);
          //  console.log(images);
        })
        .catch((err) => {
          toast.error(`Error To Your Information `);
        });
  };
  useEffect(() => {
    loadPlace();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log(prod);
    console.log(formData);
    console.log(modalInfo);
    
    toggleUpdate();

  };
  const handleToggleAudio =(id)=>{
    setId(id);
    toggle2()

  }
  const handleToggleVideo =(id)=>{
    setId(id);
    toggle3()
  }
  const handleToggleCircuit =(id)=>{
    setId(id);
    toggle4()
  }
  const  columns = [
    {
      name: 'Name',
      selector: 'namePlace',
      sortable: true,
    },
    {
      name: 'Image',
      selector: 'image',
      cell: d =>  <img
      alt={d._id}
      className="avatar" onClick={()=>handleToggle(d.imgCollection[0])} src={d.imgCollection[0]}
      />,


    },
    {
      name: 'Actions',
      sortable: true,
      cell: d =>  (<><button  className="btn btn-sm btn-primary"style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(d)}><i className="tim-icons icon-pencil"></i></button>
      <button className="btn btn-sm btn-danger" style={{marginRight:"1rem"}}  onClick={() => confirmation(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
          <button className="btn btn-sm btn-success" style={{marginRight:"1rem"}}  onClick={() => handleToggleAudio(d._id)}>
            <i className="tim-icons icon-triangle-right-17"></i>
          </button>
          <button className="btn btn-sm btn-alert" style={{marginRight:"1rem"}}  onClick={() => handleToggleVideo(d._id)}>
            <i className="tim-icons icon-video-66"></i>
          </button>
          <button className="btn btn-sm btn-info"style={{marginRight:"1rem"}}  onClick={() => handleToggleCircuit(d._id)}>
          <i className="tim-icons icon-planet"></i> 
          </button>
          <Link  to={process.env.PUBLIC_URL+ `/admin/monument/`+d._id } >
          <i className="tim-icons icon-bus-front-12"></i>

          </Link>
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
    data.append("namePlace", formData.namePlace);
    data.append("descriptionPlace", formData.descriptionPlace);
    data.append("lanPlace", formData.lanPlace);
    data.append("longPlace", formData.longPlace);
   
    toast.success("Place added successfully")


    Axios.post(`${process.env.REACT_APP_URL}place`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
     toast.success("Place added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id) => {
   
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    console.log("file" + file.nameCastronomy);
    // console.log(imagefile.files[0]);
    data.append("image", modalInfo.image);
    data.append("namePlace", formData.namePlace);
    data.append("descriptionPlace", formData.descriptionPlace);
    data.append("lanPlace", formData.lanPlace);
    data.append("longPlace", formData.longPlace);
    toast.success("Place updated successfully")


    await Axios.patch(`${process.env.REACT_APP_URL}placee/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
  // toast.success("place added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}place/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("Place deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { namePlace, descriptionPlace,image , lanPlace ,longPlace } = formData;
  const allc=circuit.map((c)=>{
return(
  <option value={c.name}>{c.name}</option>
  )
  })
  //this methode is wrong

  const all = place.map((ev) => {
   
    return (
      <tr>
        <td>{ev.namePlace}</td>
        <td>{ev.descriptionPlace}</td>
      
        <td>{ev.lanPlace}</td>
        <td>{ev.longPlace}</td>
        <td>
          <img
            alt={ev.namePlace}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${ev.image}`}
            onClick={()=>handleToggle(ev.image)}
          />
        </td>
        <td>

            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(ev)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(ev._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
        </td>
      </tr>
    );
  });


  return (
    <>

      <div className="content">
      
        <Row>
        <Modal isOpen={isToggled4} toggle={isToggled4}>
                <ModalHeader toggle={isToggled4}>Show Image</ModalHeader>
                <ModalBody>
                <Form onSubmit={onSubmitCircuit}>

                <FormGroup>
        <Label for="exampleSelectMulti">Select Circuit</Label>
        <Input type="select" name="nameC" id="nameC" value={nameC}  >
          {allc}
        </Input>
      </FormGroup>
      <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
      </Form>
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle4}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
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
            <Modal isOpen={isToggled2} toggle={isToggled2}>
                <ModalHeader toggle={isToggled2}>Add  Track</ModalHeader>
                <ModalBody>
                <Form onSubmit={onSubmitAudio}>
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
                <FormGroup>
                {loading ? (<Loading />) : null } 

                <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
                </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle2}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
            <Modal isOpen={isToggled3} toggle={isToggled3}>
                <ModalHeader toggle={isToggled3}>Add video</ModalHeader>
                <ModalBody>
                  <Form onSubmit={onSubmitVideo}>
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
                <FormGroup>
                {loading ? (<Loading />) : null } 

                <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
                </FormGroup>
                  </Form>

               
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle3}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
            <Modal isOpen={isUpdated} toggle={isUpdated}>
                <ModalHeader toggle={isUpdated}>Update place</ModalHeader>
                <ModalBody>
                <Form onSubmit={()=>handleUpdate(modalInfo._id)} method="Post">
                <FormGroup>
                  <Label htmlFor="namePlace">namePlace</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="namePlace"
                    name="namePlace"
                    value={modalInfo.namePlace}
                    onChange={handleChange("namePlace")}
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
                   <Label htmlFor="lanPlace">lanPlace</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}
                  id="lanPlace"
                  name="lanPlace"
                  value={modalInfo.lanPlace}
                  onChange={handleChange("lanPlace")}
                />
                  <Label htmlFor="longPlace">longPlace</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="longPlace"
                  name="longPlace"
                  value={modalInfo.longPlace}
                  onChange={handleChange("longPlace")}
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
            <ModalHeader toggle={isToggled}>Add Place</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="namePlace">namePlace</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="namePlace"
                    name="namePlace"
                    value={namePlace}
                    onChange={handleChange("namePlace")}
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
                 <Label htmlFor="lanPlace">lanPlace</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}
                  id="lanPlace"
                  name="lanPlace"
                  value={lanPlace}
                  onChange={handleChange("lanPlace")}
                />
               
                 <Label htmlFor="longPlace">longPlace</Label>
                <Input
                    color="info"
                    type="number"
                    id="longPlace"
                    style={{color: '#000'}}

                    name="longPlace"
                    value={longPlace}
                    onChange={handleChange("longPlace")}
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
                {loading ? (<Loading />) : null } 


                <Button type="submit"  value="submit" color="primary">
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
              (
                <Loading />
              )
              :
              (
<Card>
              <CardHeader>
                <CardTitle tag="h4">List of Place</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={place}
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
