import React from 'react';
import axios from 'axios';
import {Row, Col,Pagination, Pager, Button,Table} from 'react-bootstrap';
const transactionStyle={
  fontSize:24,
  color:'blue',
  margin:15
}
class SalesHistory extends React.Component{
  constructor(props){
    super(props);
    this.handlClick = this.handlClick.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {data:[] , url:'/transactions',numberOfPages:0 ,pageNumber:0,type:"",status:""};
  }
  componentDidMount(){
    this.getData();
  }
  getData(){

   var {status,pageNumber,type}=this.state;
   var link = "/transactions?status="+status +"&type="+type+"&pageNumber="+pageNumber;
    console.log(link);
     console.log(this.state.numberOfPages);
    axios.get(link).then((res)=>{
      const {data,numberOfPages} = res.data;
      this.setState({data , numberOfPages});
    });   
  }
  handlClick(key,value) { 
    this.setState({[key]:value , pageNumber:0}, this.getData);
    
  }
  previous(){
   this.setState((prevState) => ({pageNumber:prevState.pageNumber-1}), this.getData);

  }
  next(){
      this.setState((prevState) => ({pageNumber:prevState.pageNumber+1}), this.getData);

  }
 
  render(){
  	var data = this.state.data;
  	if(data.length==0){
  		return(<div>Loading ...</div>);
  	} 
 
return (
 <div style= {{position:'absolute', marginTop:200}} >
   <div style= {{position:'absolute',width:300}} >
      <h2>Payment type :</h2>
      <Button style={{margin:10}} onClick= {()=>this.handlClick("type","cash")} bsStyle="success">Cash</Button>
      <Button style={{margin:10}} onClick={()=>this.handlClick("type","card")} bsStyle="primary">Card</Button>
      <h2>Status :</h2>
      <Button style={{margin:10}} onClick= {()=>this.handlClick("status","successful")} bsStyle="info">Successful</Button>
      <Button style={{margin:10}} onClick= {()=>this.handlClick("status","refunded")} bsStyle="warning">refunded</Button>
      <Button style={{margin:10}} onClick= {()=>this.handlClick("status","failed")} bsStyle="danger">failed</Button>
   </div>
  <div style={{width:800, position:'absolute',left:500}}>
   <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     {this.state.data.map((transaction, i) => {
        const { timestamp, amount, status, type } = transaction;
        const parsedTimestamp = new Date(timestamp);
        const date = `${parsedTimestamp.getDay()}.${parsedTimestamp.getMonth()}.${parsedTimestamp.getYear()}`;
        const time = `${parsedTimestamp.getHours()}:${parsedTimestamp.getMinutes()}`;
        return (
        <tr key={i}>
          <td>{date}</td>
          <td>{time}</td>
          <td>{amount}</td>
          <td>{type}</td>
          <td>{status}</td>
        </tr>
        );
      })}
    </tbody>
  </Table>  
    <Pager>
      <Pager.Item previous disabled={!(this.state.pageNumber>0)} onSelect = {this.previous}>&larr; Previous</Pager.Item>
      <Pager.Item  next onSelect disabled={!(this.state.pageNumber<(this.state.numberOfPages-1))}  onSelect= {this.next} href="#">Next &rarr;</Pager.Item>
    </Pager>

 </div> 
</div>);
  }
}
export default SalesHistory;
