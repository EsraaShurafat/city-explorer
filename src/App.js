// import 'dotenv';
import React from 'react';
import 'react-bootstrap';
import axios from 'axios';
import './App.css';
// import Movies from './components/Movies';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state =({
      Lat:'',
      lon:'',
      displayName:'',
      mapFlag:false,
      weatherFlag:false,
      displayError:false,
      weatherArr:[],
      name:'',
      movieArr:[],
      movieFlag:false,
      
    })
  };

  getLocationData = async (event)=>{
event.preventDefault();
const cityName=event.target.cityName.value;
const myKey=process.env.REACT_APP_API;
const url=`https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
const url1 =`https://class-07.herokuapp.com/weather?name=${cityName}`;
//https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json
const url2 =`https://class-07.herokuapp.com/movies?name=${cityName}`;
try {
let resResult= await axios.get(url);
// console.log(resResult.data);
let resResultWeather= await axios.get(url1);
// console.log(resResultWeather.data);
let resResultMovies= await axios.get(url2);
console.log(resResultMovies.data);

await this.setState({
  lat:resResult.data[0].lat,
  lon:resResult.data[0].lon,
  displayName:resResult.data[0].display_name,
  mapFlag:true,
  name:cityName,
  weatherArr:resResultWeather.data,
  weatherFlag:true,
  movieArr:resResultMovies.data,
  movieFlag:true,

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
  <button  type="submit">Exploer</button>
</form>
<div style={{textAlign:"center"}}>
<p>{this.state.displayName}</p>
<p>{this.state.lat}</p>
<p>{this.state.lon}</p>
{this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}`} alt="map"></img> }
{this.state.displayError && <p>Sorry Error</p>}

{this.state.weatherFlag && this.state.weatherArr.map(item=>{
  return(
    <>
    <p>Date:{item.date}</p>
    <p>Description:{item.discription}</p>
    </>
  )
})}

</div>

 {this.state.movieFlag && this.state.movieArr.map(item=>{
  return(
    <>
    <p>{item.title}</p>
    <p>{item.overview}</p>
    <p>{item.average_votes}</p>
    <p>{item.total_votes}</p>
    <p>{item.popularity}</p>
    <p>{item.released_on}</p>
    </>)
 })}




      </>
    )
  }
}

export default App;