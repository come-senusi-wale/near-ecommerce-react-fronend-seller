import React, { useState, useContext } from "react";

import { isLogging, logout, login, add_product } from "./../near/utils";

import { Apcontext } from "./../context";




export let Nav = () => {

    let {searchProducts} = useContext(Apcontext);

    let [productName, setProductName] = useState('');
    let [productDescription, setProductDescription] = useState('');
    let [productPrice, setProductPrice] = useState('');
    let [productImage, setProductImage] = useState('');

    let [froms, setFrom] = useState('');
    let [limits, setLimit] = useState('');

    let searchingForPRoducts = () => {
    
        searchProducts(froms, limits);
       
    }



    // function for login 

    let userlogin = () => {

        login()
    }



    // function for user logout

    let userlogout = () => {

        logout()
    }


    // function to add product

    let addProduct = async () => {

        if (productName == '' || productDescription == '' || productPrice == '' || productImage == '') {

            alert('fill all the inputs please');

            return; 
        }

        let addingProduct = await add_product(productName, productDescription, parseInt(productPrice), productImage);
    }



    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Wale Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <div className="d-flex mt-2 mb-2">
                        <input className="form-control me-2" type="number" placeholder="from" style={{width: 80}} value={froms} onChange={(e) => setFrom(e.target.value)}/>
                        <input className="form-control me-2" type="number" placeholder="limit" style={{width: 80}} value={limits} onChange={(e) => setLimit(e.target.value)}/>
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar" onClick={() => searchingForPRoducts() }>Search</button>
                    </div>
                    </li>
                </ul>

                <ul className="navbar-nav  navbar-right">
                    <li className="nav-item">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#myModal">Add</button>
                    </li>
                    <li className="nav-item">
                        {isLogging() ?
                         <a className="nav-link" href="#" onClick={() => userlogout()}>Disconnect Wallet</a> :
                         <a className="nav-link" href="#" onClick={() => userlogin()}>Connect Wallet</a>}
                       
                    </li>
                </ul>
 
                </div>
            </div>
            </nav>

            {/*!-- The Modal -->*/}
            <div className="modal fade" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Add New Product</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">
                <input type="text" className="form-control mb-2" id="name" placeholder="Enter product name" name="name" required value={productName} onChange={(e) => setProductName(e.target.value)}/>

                <input type="text" className="form-control mb-2" id="description" placeholder="Enter roduct description" name="description" 
                required value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>

                <input type="number" className="form-control mb-2" id="price" placeholder="Enter product price" name="price" required value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>

                <input type="text" className="form-control mb-2" id="image" placeholder="Enter image link" name="image" required value={productImage} onChange={(e) => setProductImage(e.target.value)}/>

                {/*<input type="file" className="form-control mb-2" id="image" placeholder="Enter roduct description" name="image" 
                required></input>*/}
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => addProduct()}>Enter</button>
                </div>

                </div>
            </div>
            </div>

        </>
    )
}