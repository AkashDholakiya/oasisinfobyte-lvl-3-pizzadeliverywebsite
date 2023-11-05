import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import '../css/dashboard.css'
import BGIMG from '../images/PizzaBackgrounf.jpg'

const Dashboard = () => {
  const [data,setData] = useState([]);
  const [pizzaId,setPizzaId] = useState('')
  const [quantity,setQuantity] = useState('1')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/api/v1/pizza/getpizza');
      const res = await response.json();
      setData(res.data);
    }
    fetchData(); 
    // eslint-disable-next-line
  },[])


  const addtoCart = async (e,item) => {
    e.preventDefault();
    setPizzaId(item._id);
    setQuantity(quantity);
    const response = await fetch('http://localhost:4000/api/v1/cart/addtocart',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({pizzaId: pizzaId, quantity: quantity})
    })
    const json = await response.json();
    if(json.success){
      alert("Added to Cart");
    }else{
      alert("Something went wrong");
    }
  }
  return (
    <div className={`${localStorage.getItem('token') ? 'container pizzamain my-5' : ''}`}>

      {localStorage.getItem('token') ? data.map((item) => {
        return (
          <div className="card" style={{width: "18rem"}} key={item._id} >
            <img src={item.imageUrl} className="card-img-top" alt="..." />
            <div className="ingredients">
            <h5 className="card-title"><b>Base :</b> {item.base}</h5>
            <h5 className="card-title"><b>Sauce :</b> {item.sauce}</h5>
            <h5 className="card-title"><b>Cheese :</b> {item.cheese}</h5>
            <h5 className='card-title'><b>price : </b><span style={{color : "green"}}>{item.price}</span></h5>
            <h5 className="card-title"><b>Quantity :</b><input type="number" name={`number-${item._id}`} id={`quantity-${item._id}`} className='quantityInput' value={quantity} onChange={(e) => setQuantity(e.target.value)} autoComplete='off' /></h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <button style={{marginBottom:"20px"}} className="btn btn-primary">Buy Now!!</button>
              <button className="btn btn-primary" onClick={(e) => addtoCart(e,item)}>Add to Cart</button>
            </div>
          </div>
        )}
      ) : 
      <div className='maincontainer'>
          <div className="abs">
            <h1>PizzaSwift</h1>
            <p>Savor the Flavor of Pizza with a Pinch of Swift</p>
            <Link to='/signup' >Let's Go!</Link>
          </div>
      </div>
      }
    </div>
  )
}

export default Dashboard
