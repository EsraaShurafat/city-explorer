// import 'dotenv';
import React from 'react';
import 'react-bootstrap';
import axios from 'axios';
import './App.css';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state =({
      Lat:'',
      lon:'',
      displayName:'',
      mapFlag:false,
      displayError:false,

    })
  };

  getLocationData = async (event)=>{
event.preventDefault();
const cityName=event.target.cityName.value;
const myKey=process.env.REACT_APP_API;
const url=`http://localhost:3010/city?city_name=${cityName}`;

try {
let resResult= await axios.get(url);
console.log(resResult.data);

this.setState({
  lat:resResult.data[0].lat,
  lon:resResult.data[0].lon,
  displayName:resResult.data[0].display_name,
  mapFlag:true,

});

}

catch {
this.setState({
displayError:true,
});


}

  };


  render(){
    return(
      <>
      <h1 style={{color:"white", backgroundColor:"black",textAlign:"center"}}>THE CITY EXPLORER</h1>
      <form style={{textAlign:"center"}} onSubmit={this.getLocationData}>
  <div>
    <input style={{textAlign:"center"}}  type="text"  id="cityName" name="cityName" aria-describedby="emailHelp" placeholder="Enter City Name"/>
  </div>
  <button  type="submit">Submit</button>
</form>
<div style={{textAlign:"center"}}>
<p>{this.state.displayName}</p>
<p>{this.state.lat}</p>
<p>{this.state.lon}</p>
{this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.cc9005e9f33a0652af7b183ebe6bd607&center=${this.state.lat},${this.state.lon}`} alt="map"></img> }


{this.state.displayError && <p>Sorry Error</p>}
</div>
      </>
    )
  }
}

export default App;