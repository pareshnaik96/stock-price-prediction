// App.js (React component)
import './App.css'
import { useState } from 'react';
import axios from 'axios'
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,Tooltip,Legend} from 'recharts'


function App() {

const [inputValue, setInputValue] = useState('');
const [stockPrice, setStockPrice] = useState('');
const [predictedPrice, setPredictedPrice] = useState('');
     
const handleSubmit = async (event) => {
    event.preventDefault();

      const response = await axios.get(`http://localhost:4000/api/stock/${inputValue}`);
      const stock = []
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December" ]
      for (let i=0; i<response.data.stock.length; i++){
        stock.push({
        "month": months[i],
        "price": response.data.stock[i]
        })
        }
      setStockPrice(stock);
  };

function handleInputChange(event) {
  setInputValue(event.target.value);
}

const handleSubmitPredicted = async (event) => {
  event.preventDefault();

    const response = await axios.get(`http://localhost:4000/predictedStock/${inputValue}`);
    const predictedValue = []
    let days = [1,2,3,4,5]
    for (let i=0; i<response.data.predicted.length; i++){
      predictedValue.push({
      "day": days[i],
      "price": response.data.predicted[i]
      })
      }
    setPredictedPrice(predictedValue);
};
function preHandleInputChange(event) {
setInputValue(event.target.value);
}


return (
  <div>
    <h2 className='stock-heading'>Stock Chart</h2>
    <form onSubmit={handleSubmit}>
        <label className='stock-label'>
          Get Stock :
          <input type="text" placeholder='Input Symbol' value={inputValue} onChange={handleInputChange} />
        </label>

        <button type="submit">Submit</button>
    </form>
        {stockPrice && (
        <div>
          {inputValue}:
          <pre> 
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={stockPrice} width={500} height={300} margin={{top:5,right:300,left:20,bottom:5}}>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Legend/>
              <Tooltip/>
              <Line type="monotone" dataKey="price"/>
            </LineChart>
          </ResponsiveContainer>
        </pre>
        </div>
      )}
       <form onSubmit={handleSubmitPredicted}>
        <label className='predicted-label'>
          Predicted Stock :
          <input type="text" placeholder='Input Symbol' value={inputValue} onChange={preHandleInputChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
        {predictedPrice && (
        <div>
          {inputValue}:
          <pre> 
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={predictedPrice} width={500} height={300} margin={{top:5,right:300,left:20,bottom:5}}>
              <XAxis dataKey="day"/>
              <YAxis type="number" domain={['dataMin', 'dataMax']}/>
              <Legend/>
              <Tooltip/>
              <Line type="monotone" dataKey="price"/>
            </LineChart>
          </ResponsiveContainer>
        </pre>
        </div>
      )}
  </div>
);
}
 
export default App;


 
