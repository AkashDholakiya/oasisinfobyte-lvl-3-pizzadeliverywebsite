import React, { useState } from 'react'

const CreatePizza = () => {
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [base,setBase] = useState('');
    const [sauce,setSauce] = useState('');
    const [cheese,setCheese] = useState('');
    const [toppings,setToppings] = useState('');
    const [vegitarian,setVegitarian] = useState('');
    const [spicy,setSpicy] = useState('');
  return (
    <div className='container logsig'>
        <form >
            <div className="form-group">
                <label htmlFor="name">Pizza Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Pizza Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Pizza Description</label>
                <input type="text" className="form-control" id="description" placeholder="Enter Pizza Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="base">Pizza Base</label>
                <input type="text" className="form-control" id="base" placeholder="Enter Pizza Base" value={base} onChange={(e) => setBase(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="sauce">Pizza Sauce</label>
                <input type="text" className="form-control" id="sauce" placeholder="Enter Pizza Sauce" value={sauce} onChange={(e) => setSauce(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="cheese">Pizza Cheese</label>
                <input type="text" className="form-control" id="cheese" placeholder="Enter Pizza Cheese" value={cheese} onChange={(e) => setCheese(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="toppings">Pizza Toppings</label>
                <input type="text" className="form-control" id="toppings" placeholder="Enter Pizza Toppings" value={toppings} onChange={(e) => setToppings(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="vegitarian">Is Pizza Vegitarian</label>
                <input type="text" className="form-control" id="vegitarian" placeholder="Enter Pizza Vegitarian" value={vegitarian} onChange={(e) => setVegitarian(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="spicy">Is Pizza Spicy</label>
                <input type="text" className="form-control" id="spicy" placeholder="Enter Pizza Spicy" value={spicy} onChange={(e) => setSpicy(e.target.value)} />  
            </div>
        </form>
    </div>
  )
}

export default CreatePizza
