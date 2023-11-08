
import React, { useState } from 'react';
import './App.css'

function App() {
  const [formattedNumbers, setFormattedNumbers] = useState([]); 
  const [payload, setPayload] = useState({
    "phone_numbers": [],
    "username": "",
    "token": "",
    "plan_id": "",
    "client": "",
    "event_name": "",
    "extension": ""
  });
  const [numbersdata,setNumbersdata]=useState()

  const handleTextareaChange = (event) => {
    setNumbersdata(event.target.value)
    const text = event.target.value;
    const newFormattedNumbers = formatNumbers(text);
    const formattedIntegers = newFormattedNumbers.map((number) => parseInt(number, 10));
    setFormattedNumbers(formattedIntegers);
    setPayload({
      ...payload,
      "phone_numbers": formattedIntegers
    });
    console.log(formattedIntegers);
  };
  
  const formatNumbers = (text) => {
    const numbers = text.split(/[, \n]+/).filter((num) => num.trim() !== '');
 // Split by comma, space, or newline
    return numbers;
  };
  

  console.log('num', formattedNumbers);

  const handlechalgeUsername = (e) => {
    setPayload({
      ...payload,
      "username": e.target.value
    });
  }

  const handlechangeToken = (e) => {
    setPayload({
      ...payload,
      "token": e.target.value
    });
  }

  const handlechangePlanid = (e) => {
    setPayload({
      ...payload,
      "plan_id": e.target.value
    });
  }

  const handlechangeClient = (e) => {
    setPayload({
      ...payload,
      "client": e.target.value
    });
  }

  const handleChangeEventname = (e) => {
    setPayload({
      ...payload,
      "event_name": e.target.value
    });
  }

  const handlechangeExtenssion = (e) => {
    setPayload({
      ...payload,
      "extension": e.target.value
    });
  }

  const hanldeClickruncampaign = () => {
    console.log(payload);
    fetch('https://api.itoconnect.online/voicebroadcast/asyncbroadcast/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then((resp) => {
        console.log(resp);
      })
  }

  return (
    <div className="App">
      <div>
      <h1>Campaign</h1>
      </div>
      
      <div className='subdiv_campaign' >
        <span>User Name</span>
        <input onChange={(e) => handlechalgeUsername(e)} />
        <span>Token</span>
        <input onChange={(e) => handlechangeToken(e)} />
        <span>Plan ID</span>
        <input onChange={(e) => handlechangePlanid(e)} />
        <span>Client</span>
        <input onChange={(e) => handlechangeClient(e)} />
        <span>Event Name</span>
        <input onChange={(e) => handleChangeEventname(e)} />
        <span>Extenssion</span>
        <input onChange={(e) => handlechangeExtenssion(e)} />
        <span>Phone Numbers</span>
        <textarea
          rows="5"
          cols="40"
          placeholder="Enter numbers separated by newlines"
          value={numbersdata}
          onChange={handleTextareaChange}
        />
        <button onClick={hanldeClickruncampaign}>
          Run Campaign
        </button>
      </div>
      <div>
        {
          formattedNumbers.length > 0 ?<span className='lengthdata'>Total mobile numbers:{formattedNumbers.length}</span>:null
        }
      </div>
    </div>
  );
}

export default App;




  