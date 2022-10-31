import { useState ,useEffect} from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv,ExportPdf } from '@material-table/exporters';
import  Sidebar  from '../components/Sidebar'
import Widget from '../components/Widget';
import { Modal, ModalHeader,Button } from 'react-bootstrap';
import { Fetchticket, ticketUpdation } from '../api/tickets';

const columns=[
    {title:"ID",field:"id"},
    {title:"TITLE",field:"title"},
    {title:"REPORTER",field:"reporter"},
    {title:"DESCRIPTION",field:"description"},
    {title:"PRIORITY",field:"ticketPriority"},
    {title:"STATUS",field:"status",lookup:{
        "OPEN":"OPEN",
        "IN_PROGRESS":"IN_PROGRESS",
        "CLOSED":"CLOSED",
        "BLOCKED":"BLOCKED"
    }
},




]

function Engineer(){
    const [ticketupdatiomodal,setticketupdationmodal]=useState(false);
    const [ticketDetails,setticketdetails]=useState([]);
    const [ticketStatusCount,setTicketStatusCount]=useState({});
    const [message,setmessaege]=useState("");
    const [selectedcurrticket,setselectedcurrticklet]=useState({});

    const updateselectedcurrticket=(data)=>setselectedcurrticklet(data)
    const closeticketmodal=()=>setticketupdationmodal(false);

     useEffect(() => {

    
            fetchtickets();
     }, []);
    const fetchtickets=()=>{
        Fetchticket().then((response)=>{
            setticketdetails(response.data)
            updateTicketCount(response.data)
            console.log(response)
        }).catch((error)=>{
            console.log(error)
            setmessaege(error.response.data.message)
        })
    }
     const updateTicketCount=(tickets)=>{
        const data={
            open:0,
            pending:0,
            closed:0,
            blocked:0
        }
        tickets.forEach((ticket)=>{
                if(ticket.status === "OPEN")
                    data.open +=1
                else if(ticket.status === "IN_PROGRESS")
                     data.pending +=1    
                else if(ticket.status === "CLOSED")
                     data.closed +=1        
                else if(ticket.status === "BLOCKED")
                     data.blocked +=1        
        })
        setTicketStatusCount(Object.assign({},data))

     }

     const editticket=(ticketDetails)=>{
        console.log(ticketDetails.data);
       
        const ticket={
            id:ticketDetails.id,
            title:ticketDetails.title,
            decription:ticketDetails.description,
            priority:ticketDetails.ticketPriority,
            reporter:ticketDetails.reporter,
            assignee:ticketDetails.assignee,
            status:ticketDetails.status
        }
        setticketupdationmodal(true);
        setselectedcurrticklet(ticket)

     }

     const onticketupdate=(e)=>{
          if(e.target.name === "priority")
               selectedcurrticket.priority= e.target.value;
          else if(e.target.name === "status")
               selectedcurrticket.status=e.target.value;
          else if(e.target.name === "description")
                selectedcurrticket.description=e.target.value; 
        
        updateselectedcurrticket(Object.assign({},selectedcurrticket))
     }
     const updateticket=(e)=>{
            e.preventDefault();
            ticketUpdation(selectedcurrticket.id,selectedcurrticket).then((response)=>{
                setmessaege("Ticket Updated Successfully")
                fetchtickets()
                closeticketmodal()
            }).catch((error)=>{
                setmessaege(error.response.data.message)
            })
     }
    return (
        <div className="bg-light vh-100">
            <Sidebar />
            <div className="container py-5">
                <h5 className='text-center text-primary'>Welcome {localStorage.getItem("name")}!</h5>
                <p className='lead text-muted text-center'>Take a quick look at your engineer stats below !</p>

                <div className='row'>
                    <Widget color='primary' title='OPEN' icon='envelope-open' ticketcount={ticketStatusCount.open}
                    pathColor='darkblue' />
                    <Widget color='warning' title='PROGRESS' icon='hourglass-split' ticketcount={ticketStatusCount.pending}
                    pathColor='yellow' />
                    <Widget color='success' title='CLOSED' icon='check2-circle' ticketcount={ticketStatusCount.closed}
                    pathColor='darkgreen' />
                    <Widget color='secondary' title='BLOCKED' icon='slash-circle' ticketcount={ticketStatusCount.blocked}
                    pathColor='darkgrey' />
                </div>
                <hr />
                <h4 className='text-primary text-center'>{message}</h4>
                <MaterialTable 
                onRowClick={(event,rowData)=>{editticket(rowData)}}
                columns={columns} 
                data={ticketDetails}
                 title="TICKET DETAILS"
                 options={{
                    filtering:true,
                    exportMenu:[
                        {
                            label: "Export Pdf",
                            exportFunc:(cols,data) => ExportPdf(cols,data, "Ticket Records")
                        },
                        {
                            label: "Export Pdf",
                            exportFunc:(cols,data) => ExportCsv(cols,data, "Ticket Records")
                        }
                    ],
                    headerStyle:{
                        backgroundColor:"darkblue",
                        color:"#fff"
                    },
                    rowStyle:{
                        backgroundColor:"#c8cfc"
                    }
                 }}   
                />
                {
                    ticketupdatiomodal ? (
                        <Modal
                        show={ticketupdatiomodal}
                        onHide={()=>setticketupdationmodal(false)}
                        backdrop="static"
                        centered >
                            <ModalHeader closeButton>
                                <Modal.Title>UPDATE TICKET</Modal.Title>

                            </ModalHeader>
                            <Modal.Body>
                                <form onSubmit={updateticket}>
                                    <div className="p-1">
                                        <h5 className="text-primary">ID : {selectedcurrticket.id}</h5>
                                    </div>
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>TITLE</label>
                                        <input type="text" disabled  className='form-control' value={selectedcurrticket.title}/>
                                    </div>
                                   
                                   
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>REPORTER</label>
                                        <input type="text" disabled  className='form-control' value={selectedcurrticket.reporter}/>
                                    </div>
                                    
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>ASSIGNEE</label>
                                        <input type="text" disabled  className='form-control ' value={selectedcurrticket.assignee}/>
                                    </div>
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>PRIORITY</label>
                                        <input type="text" onChange={onticketupdate} name="priority" className='form-control' value={selectedcurrticket.priority}/>
                                    </div>
                                    
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>STATUS</label>
                                        <select className='form-select ' name='status' value={selectedcurrticket.status}  onChange={onticketupdate} >
                                             <option value="OPEN">OPEN</option>
                                             <option value="IN_PROGRESS">IN_PROGRESS</option>
                                             <option value="CLOSED">CLOSED</option>
                                             <option value="BLOCKED">BLOCKED</option>
                                        </select>
                                    </div>
                                    <div className="input-group m-1">
                                        <label className='label label-md input-group-text'>DESCRIPTION</label>
                                        <input type="text" name="description" className='form-control' value={selectedcurrticket.decription}  onChange={onticketupdate}/>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <Button variant='secondary' className="m-1" onRowClick={()=>closeticketmodal}>Cancel</Button>
                                        <Button variant='danger' className="m-1" type="submit">Update</Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    ) :null 
                }
            </div>
        </div>
    )
}

export default Engineer;