import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {  useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { confirmAlert } from 'react-confirm-alert'; 
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

export default function ProductOwner({ history }) {
  var [products, setProducts] = useState([]);
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
    price: "",
    desc: "",
    image: "",
  });
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
    data.append("price", formData.price);
    data.append("desc", formData.desc);
    const user=getCookie("id");

    data.append("user",user);
    data.append("details",details);



    for (const key of Object.keys(image1)) {
        data.append('imgCollection', image1[key])
    }
    Axios.post(`${process.env.REACT_APP_URL}products/upload-images`, data, {
    }).then(res => {
        console.log(res.data)
        setLoading(false)

        toast.success("event added successfully")
        window.location.reload();
    })
}
  let config = {
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"]
      },
      { name: "forms", groups: ["forms"] },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      {
        name: "paragraph",
        groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"]
      },
      "/",
      { name: "links", groups: ["links"] },
      { name: "insert", groups: ["insert"] },
      { name: "styles", groups: ["styles"] },
      { name: "colors", groups: ["colors"] },
      { name: "tools", groups: ["tools"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] }
    ],
    removeButtons:
      "Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Replace,Form,Checkbox,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,PageBreak,Iframe,Anchor,ShowBlocks,About,CopyFormatting,Undo,Redo",
    fontSize_sizes: "16/16px;24/24px;48/48px;",
    font_names:
      "Arial/Arial, Helvetica, sans-serif;" +
      "Times New Roman/Times New Roman, Times, serif;" +
      "Verdana",
    allowedContent: true
    // disableNativeSpellChecker: false
    // skin: "moono",
    // plugins:
    //   "dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc"
  };
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));

  const loadProducts = () => {
      let user=getCookie("id");
    Axios.get(`${process.env.REACT_APP_URL}products/user/${user}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoading1(false);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log(prod);
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
      name: 'Description',
      selector: 'desc',
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
      <button className="btn btn-sm btn-danger" style={{marginRight:"1rem"}} onClick={() => confirmation(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
      </>
      ),
    },
  ];
 
 const user =getCookie("id");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("on submit " + formData.name);
 
    const data = new FormData();
    console.log(formData.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("desc", descript);
    toast.success("product added successfully")
   

    Axios.post(`${process.env.REACT_APP_URL}products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };
  

  const handleUpdate = async (id , e) => {
    e.preventDefault();
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", modalInfo.name);
    data.append("price", modalInfo.price);
    data.append("desc", descript);
    toast.success("product updated successfully")

    
    
    console.log("update ok "+modalInfo.name);
     return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}products/${id}`, data, {
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
    Axios.delete(`${process.env.REACT_APP_URL}products/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("product deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };


  const { name, price , desc , image } = formData;
  //this methode is wrong
 

  const all = products.map((p) => {
      console.log(p.name);
    return (
      <tr>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.desc}</td>
        <td>
          <img
            alt={p.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${p.image}`}
            onClick={()=>handleToggle(p.image)}
          />
        </td>
        <td>
            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(p)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(p._id)}>
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
                <ModalHeader toggle={isUpdated}>Update product</ModalHeader>
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
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  style={{color: '#000'}}
                  id="price"
                  name="price"
                  value={modalInfo.price}
                  onChange={handleChange("price")}
                />
               
                </FormGroup>
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
            <ModalHeader toggle={isToggled}>Add Product</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="name"
                    style={{color: '#000'}}
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  style={{color: '#000'}}
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange("price")}
                />
                
                </FormGroup>
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
                  <CardTitle tag="h4">Products</CardTitle>
                </CardHeader>
                <CardBody>
                <DataTableExtensions
        columns={columns}
        data={products}
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
