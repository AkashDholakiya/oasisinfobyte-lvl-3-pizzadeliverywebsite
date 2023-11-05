import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [data,setData] = useState([]);

  const TableStyle = {
    textAlign: 'center',
    borderRadius: '20px',
    
  }

  const rowStyle = {
    paddingTop:"20px",
  }

  const rowStyle2 = {
    paddingTop:"20px",
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
      setData(res.data);
    }
    fetchData(); 
    // eslint-disable-next-line
  },[]) 

  const DeleteItem = async (e,Item) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/v1/cart/deletecartitem/${Item}`,{
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    if(json.success){
      alert("Deleted Successfully");
      window.location.reload();
    }else{
      alert("Something went wrong");
    }
  }

  return (
    <div className='container my-4'>
        <table className="table table-dark" style={TableStyle}>
            <thead>
                <tr>
                    <th scope="col" >No.</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name of the pizza</th>
                    <th scope="col">total Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove from Cart</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index) => {
                    return (
                      (item.quantity) && <tr key={item._id} >
                            <th scope="row" style={rowStyle2}>{index+1}</th>
                            <td><img src={`${item.pizza.imageUrl}`} alt="Piza_Image" width={'50px'} height={'50px'}/></td>
                            <td style={rowStyle}>{item.pizza.name}</td>
                            <td style={rowStyle2}>{Number(item.quantity)*Number(item.pizza.price)}</td>
                            <td style={rowStyle}>{item.quantity}</td>
                            <td ><button className="btn" onClick={(e) => DeleteItem(e,item._id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Cart;
