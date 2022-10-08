import { Loading } from 'layouts/Loading';
import React, { Component, useEffect, useState } from 'react'
import api from '../ContactComponents/axios';
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import "../index.css"
import Axios from 'axios';

const PersoCircuit=()=> {
  const [circuits, setCircuits] = useState([]);
  const [loading,setLoading]=useState(true);
  var [items,setItems]=useState([]);
  var [columnsFromBackend,setColumnsFromBackend]= useState({
    allplaces: {
      name: "All places",
      items:[]
    },
    circuit: {
      name: "Circuit",
      items: []
    },
  })
 /* const items = [
    { _id: uuid(), namePlace: "Place1", descriptionPlace:"aaaaa",img:[] },
    { _id: uuid(), namePlace: "Place2", descriptionPlace:"aaaaa",img:[] },
    { _id: uuid(), namePlace: "Place3", descriptionPlace:"aaaaa",img:[] },

  ];*/

  const [columns, setColumns] = useState();


  const [descript,setDescript]=useState("");
  const [name,setName]=useState("");

  const [loading1,setLoading1]=useState(true);
  const onDragEnd = (result, columns, setColumns) => {
      if (!result.destination) return;
      const { source, destination } = result;
    
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        });
      } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        });
      }
    };

  const getRestoHandler =  ()=>{


    api.get(`${process.env.REACT_APP_URL}placee` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setItems(res.data);
    const allplaces={
        name:"All places",
        items:res.data
    }
    console.log(allplaces);
    setColumnsFromBackend({...columnsFromBackend,allplaces:allplaces});
    setTimeout(function(){

        setLoading1(false)
        console.log(columnsFromBackend);



    },3000)
    setColumns(columnsFromBackend)

    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setPlaces([...Places , response.data]);
  };

  useEffect(() => {
    getRestoHandler();
  }, [])

  const onSubmit=(e)=> {
    e.preventDefault()
   console.log(name+ " "+ descript);
   console.log("places");
   console.log(columns.circuit.items);
   var data = new FormData();
   data.append("name", name);
   data.append("desc", descript);
   data.append("places",columns.circuit.items)



   Axios.post(`${process.env.REACT_APP_URL}circuit`, {
       "name":name,
       "desc":descript,
       "places":columns.circuit.items
   }, {
   }).then(res => {
       console.log(res.data)
       setLoading1(false)

       toast.success("event added successfully")
       window.location.reload();
   })
}
const handleChange = (text) => (e) => {
    setName(e.target.value);
  };
  const re = () => {
    setColumns(columnsFromBackend);
  };

 
        return (
            <>
         

    <div id="wraperexpedition">
      

     

      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1 >
              All Circuits
            </h1>
            
            <div class="devider-page " ></div>
          </div>

          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Choose tour</h3>
            <div class="devider-page-content"></div>
            <button id="send" class="btn-content" onClick={re}>Reload</button>

                  {
                      loading1?
                      (<Loading />)
                      :
                      (
                        <form onSubmit={onSubmit}>
          <input
                          color="info"
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                         onChange={handleChange("name")}
                          placeholder="Name circuit"
                        />
      
                      <CKEditor
                          editor={ ClassicEditor }
                          data={descript}
                          style={{color: '#000'}}
      
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
        
                 
                    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
              onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                    key={columnId}
                  >
                    <h2>{column.name}</h2>
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style
                                          }}
                                        >
                                                                                  <img
      alt={`hawas bia zaghouan ${item.namePlace}`}
      className="avatar"  src={item.imgCollection[0]}
      style={{marginRight:"1rem"}}
      />
                                          {item.namePlace}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
       
          
            <button id="send" class="btn-content" type="submit" >Add</button>
          </form>
                      )
                  }

           
          </div>
        
       




       

        </div>
      </div>

     

      

      </div>



            </>
        )
    
}
export default PersoCircuit;
