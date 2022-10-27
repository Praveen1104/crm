import { useEffect,useState } from "react";
import React from "react";
import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {ExportCsv,ExportPdf} from '@material-table/exporters';
import { Fetchticket, ticketUpdation } from "../api/tickets";
import {Modal,Button} from 'react-bootstrap';
import { getAllusers, userUpdation } from "../api/user";


const columns = [
  { title: "Ticket Id", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter"},
  { title: "ASSIGNEE", field: "assignee"},
  { title: "PRIORITY", field: "ticketPriority"},
  { title: "STATUS", field: "status", lookup:{
    "OPEN":"OPEN",
    "IN_PROGRESS":"IN_PROGRESS",
    "CLOSED":"CLOSED",
    "BLOCKED":"BLOCKED"
  }},
];


const Usercolumns = [
  { title: "Ticket Id", field: "userId" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes"},
  { title: "STATUS", field: "userStatus",lookup:{
    "APPROVED":"APPROVED",
    "REJECTED":"REJECTED",
    "PENDING":"PENDING"
  }},
];

const data = [
  
];


function Admin() {

  const [ticketdetails,setticketdetails]=useState([]);
  const [ticketStatusCount,setTicketStatusCount]=useState({});
  const [ticketupdatiomodal,setticketupdationmodal]=useState(false);
  const [selectedcurrticket,setselectedcurrticklet]=useState({})
  const [userUpdationmodal,setuserUpdationmodal]=useState(false)
  const [userdetails,setuserdetails]=useState([]);
  const [selectedcurruser,setselectedcurruser]=useState({});

  

  const [message,setmessaege]=useState("");


  const updateselectedcurrticket=(data)=>  setselectedcurrticklet(data)
 // const updateselectedcuuuser=(data)=> selectedcurruser(data)
  const openticketmodal=()=>setticketupdationmodal(true);
  const closeticketmodal=()=>setticketupdationmodal(false);
  const closeusermodal=()=>setuserUpdationmodal(false);

  useEffect(()=>{
    fetchtickets()
    getuser()
  },[])

  const fetchtickets=()=>{
    Fetchticket().then(function(response){
      setticketdetails(response.data)
      updateTicketCount(response.data)
     
    }).catch(function(error){
      console.log(error)
    })
  }
 const updateTicketCount=(tickets)=>{
  const data={
    open:0,
    closed:0,
    progress:0,
    blocked:0
  }

  tickets.forEach(x => {
    if(x.status === "OPEN") {
      data.open +=1;
    }
    else if(x.status === "CLOSED") {
      data.closed +=1;
    }
    else if(x.status === "PROGRESS") {
      data.progress +=1;
    }
    else {
      data.blocked +=1;
    }
  });
   setTicketStatusCount(Object.assign({},data))

 }
 const editTicket=(ticketDetails)=>{
  const ticket={
    assignee: ticketDetails.assignee,
    description: ticketDetails.description,
    title: ticketDetails.title,
    id: ticketDetails.id,
    reporter: ticketDetails.reporter,
    status :ticketDetails.status,
    ticketPriority : ticketDetails.ticketPriority
    
  }
  setticketupdationmodal(true)
  setselectedcurrticklet(ticket)

 }
 const edituser=(userdetails)=>{
  const user={
    userId:userdetails.userId,
    name:userdetails.name,
    email:userdetails.email,
    userstatus:userdetails.status,
    userTypes:userdetails.userTypes
  }
   setuserUpdationmodal(true)
   setselectedcurruser(user)

 }
  const onticketupdate=(e)=>{
    if(e.target.name === "ticketPriority")
    selectedcurrticket.ticketPriority = e.target.value

    else if(e.target.name === "status")
    selectedcurrticket.status=e.target.value

    else if(e.target.name === "description")
    selectedcurrticket.description=e.target.value

    updateselectedcurrticket(Object.assign({},selectedcurrticket))
  }

  const onuserupdate=(e)=>{
    if(e.target.name === "status")
     selectedcurruser.status=e.target.value

     //updateselectedcuuuser(Object.assign({},selectedcurruser))
  }

  const updateticket=(e)=>{
    e.preventDefault();
    ticketUpdation(selectedcurrticket.id,selectedcurrticket).then((response)=>{
      fetchtickets()
      setticketupdationmodal(false)
    }).catch((error)=>{
      console.log(error)
    })
  }
 

  const updateuser=(e)=>{
    e.preventDefault();
    userUpdation(selectedcurruser.userId,selectedcurruser).then((response)=>{
      console.log(response)
      getuser()
      setuserUpdationmodal(false)
    }).catch((error)=>{
      console.log(error)
    })
  }

  

  const getuser=()=>{
    getAllusers(selectedcurruser.userId).then((response)=>{
      setuserdetails(response.data)
      console.log(response)
      
    }).catch((error)=>{
      console.log(error)
    })
  }
 
  return (
    <div className="bg-light vh-100 ">
      <Sidebar />
      <div className="container p-5 mb-5">
        <h3 className="text-center text-danger">Welcome {localStorage.getItem("name")}!</h3>
        <p className="text-muted text-center ">
          Take a Quick Look at Your Admin Stats Below
        </p>
      </div>
      <div className="row ms-5 ps-5 mb-2">
        <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
          <div
            className="card shadow bg-primary bg-opacity-25 text-center "
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 fw-bolder text-primary">
              {" "}
              <i className="bi bi-envelope-open text-primary mx-2"></i> Open{" "}
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-primary mx-4 fw-bolder display-6">{ticketStatusCount.open}</div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.open}
                    styles={buildStyles({ pathColor: "darkblue" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-md-6  my-1">
          <div
            className="card shadow bg-warning bg-opacity-50 text-center "
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 fw-bolder text-primary">
              {" "}
              <i className="bi bi-hourglass-split text-primary mx-2"></i>
              Progress{" "}
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-warning mx-4 fw-bolder display-6">{ticketStatusCount.progress}</div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.progress}
                    styles={buildStyles({ pathColor: "darkgolden" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-md-6  my-1">
          <div
            className="card shadow bg-success bg-opacity-50 text-center "
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 fw-bolder text-primary">
              {" "}
              <i className="bi bi-check2-circle text-primary mx-2"></i> Closed{" "}
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-success mx-4 fw-bolder display-6">{ticketStatusCount.closed}</div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.closed}
                    styles={buildStyles({ pathColor: "darkgreen" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-md-6 my-1">
          <div
            className="card shadow bg-secondary bg-opacity-25 text-center "
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2  fw-bolder text-primary">
              {" "}
              <i className="bi bi-slash-circle text-primary mx-2"></i> Blocked{" "}
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-secondary mx-4 fw-bolder display-6">
                {ticketStatusCount.blocked}
              </div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.blocked}
                    styles={buildStyles({ pathColor: "darkgrey" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h5 className="text-info">{message}</h5>
      </div>
      <div className="container">
        <MaterialTable 
        onRowClick={(event,rowData)=> editTicket(rowData)}
        title="TICKET DETAILS" 
        columns={columns} 
        data={ticketdetails}  
        options={{filtering: true,
        headerStyle:{
          backgroundColor:"#d95341",
          color:"#fff"
        },
        rowStyle:{
          backgroundColor:"#eee"
        }
         }}
         />

{ ticketupdatiomodal ? (
          <Modal 
          show={ticketupdatiomodal}
          onHide={closeticketmodal}
          backdrop="static"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateticket}>
                <div className="p-1">
                <h5 className="card-subtitles mb-2 text-danger">User ID :{selectedcurrticket.id}</h5>
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Title</label>
                <input type="text" disabled value={selectedcurrticket.title} className="form-control" />
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Reporter</label>
                <input type="text" disabled value={selectedcurrticket.reporter} className="form-control" />
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Assignee</label>
                <select className="form-control" name="assginee">
                    <option>pr</option>
                </select>
                </div>
                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Priority</label>
                <input type="number"  value={selectedcurrticket.ticketPriority} className="form-control" 
                name="ticketPriority" onChange={onticketupdate}/>
                </div>
                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Status</label>
                <select className="form-select " name="status" value={selectedcurrticket.status} onChange={onticketupdate}>
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Description</label>
                <textarea type="text" value={selectedcurrticket.description}
                onChange={onticketupdate} className="md- textarea form-control" 
                rows="3" name="description" />
                </div>

                <div className="d-flex justify-content-end">
                <Button variant='secondary' className="m-1" onClick={()=>closeticketmodal}>Cancel</Button>
                <Button variant='danger' className="m-1" type="submit">Update</Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
         ) : null

         }
         
      </div>
      <hr />
      <div className="container">
        <MaterialTable 
        onRowClick={(event,rowData)=> edituser(rowData)}
        title="USER DETAILS" 
        columns={Usercolumns} 
        data={userdetails} 
        options={{filtering: true,
        headerStyle:{
          backgroundColor:"#d95341",
          color:"#fff"
        },
        rowStyle:{
          backgroundColor:"#eee"
        },
        exportMenu: [{
          label:"Export Pdf",
          exportFunc:(cols,data)=> ExportPdf(cols,data,'useRecords')
        },
        {
          label:"Export Csv",
          exportFunc:(cols,data)=> ExportCsv(cols,data,'useRecords')
        }]
         }}
        />
        { userUpdationmodal ? (
          <Modal 
          show={userUpdationmodal}
          onHide={closeusermodal}
          backdrop="static"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateuser}
              >
                <div className="p-1">
                <h5 className="card-subtitles mb-2 text-danger">User ID :{selectedcurruser.userId}</h5>
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Name</label>
                <input type="text" disabled value={selectedcurruser.name} className="form-control" />
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Email</label>
                <input type="text" disabled value={selectedcurruser.email} className="form-control" />
                </div>

                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Role</label>
                <input type="text" disabled value={selectedcurruser.userTypes} className="form-control" />
                </div>
                
                <div className="input-group mb-2">
                <label className="label input-group-text label-md">Status</label>
                <select className="form-select " name="status" value={selectedcurruser.status} onChange={onuserupdate}
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
                </div>

                

                <div className="d-flex justify-content-end">
                <Button variant='secondary' className="m-1" onClick={()=>closeusermodal}>Cancel</Button>
                <Button variant='danger' className="m-1" type="submit">Update</Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
         ) : null

         }
      </div>
    </div>
  );
}

export default Admin;
