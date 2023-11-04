import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'

const Dashboard = () => {
  const [data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/api/v1/pizza/getpizza');
      const res = await response.json();
      setData(res.data);
    }
    fetchData(); 
    // eslint-disable-next-line
  },[])

  const addtoCart = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/v1/cart/addtocart',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({id: e.target.parentElement.parentElement.parentElement.key})
    })
    const json = await response.json();
    if(json.success){
      alert("Added to Cart");
    }else{
      alert("Something went wrong");
    }
  }
  return (
    <div className='container pizzamain my-5'>
      
      {data.map((item) => {
        return (
          <div className="card" style={{width: "18rem"}} key={item._id} >
            <img src={item.imageUrl} className="card-img-top" alt="..." />
            <div className="ingredients">
            <h5 className="card-title"><b>Base :</b> {item.base}</h5>
            <h5 className="card-title"><b>Sauce :</b> {item.sauce}</h5>
            <h5 className="card-title"><b>Cheese :</b> {item.cheese}</h5>
            <h5 className='card-title'><b>price : </b><span style={{color : "green"}}>{item.price}</span></h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <Link to="/" className="btn btn-primary">Buy Now!!</Link>
              <Link to="/" className="btn btn-primary" onClick={addtoCart}>Add to Cart</Link>
            </div>
          </div>
        )}
      )}
    </div>
  )
}

export default Dashboard
