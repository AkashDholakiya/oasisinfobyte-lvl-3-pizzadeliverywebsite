import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [data,setData] = useState([]);

  const rowStyle = {
    textTransform: 'capitalize',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(('http://localhost:4000/api/v1/cart/getcartitem'),{
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      const res = await response.json();
      console.log(res.data);
      setData(res.data);
    }
    fetchData(); 
    // eslint-disable-next-line
  },[]) 
  return (
    <div className='container my-4'>
        <table className="table table-dark" style={{padding:'20px'}}>
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name of the pizza</th>
                    <th scope="col">total prize</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove from Cart</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index) => {
                    return (
                        <tr key={item._id}>
                            <th scope="row">{index+1}</th>
                            <td><img src={`${item.pizza.imageUrl}`} alt="Piza_Image" width={'50px'} height={'50px'}/></td>
                            <td style={rowStyle}>{item.pizza.name}</td>
                            <td style={rowStyle}>{item.pizza.price}</td>
                            <td style={rowStyle}>{item.quantity}</td>
                            <td style={rowStyle}><button className="btn" >Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Cart;
