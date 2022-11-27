import React, {useContext} from "react"; 

import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

import { useState, useEffect } from "react";

import { pagenated_product, total_product, single_product, delete_product, edit_product } from "./../near/utils";

import wale from "./../img/port_one.jpg"

import { Modal, Button } from 'react-bootstrap'

import { Apcontext } from "./../context";

export let Products = () => {

    let {searchProducts, from, limit} = useContext(Apcontext);

    let [product, setProduct] = useState([]);

    let [productId, SetProductId] = useState('')
    let [productName, setProductName] = useState('');
    let [productDescription, setProductDescription] = useState('');
    let [productPrice, setProductPrice] = useState('');
    let [productImage, setProductImage] = useState('');


    const [isShow, invokeModal] = useState(false);
    const initModal = () => {
      //return invokeModal(!false);
      invokeModal((even) =>{

        return !even;
      })
    }


    

    let count = 1;

    // function to fetch product
    let loadProduct = async () => {

        let products = await pagenated_product();
        let totatProduct = await total_product();
        setProduct(products)
        
    }


    // function to fetch specific nunber of product
    let loadpaginatedProduct = async() => {
        let products = await pagenated_product(parseInt(from), parseInt(limit));
        setProduct(products)
        
    }

    // function for editing product
    let editProduct = async(e) => {

        let id = e.target.getAttribute('data-id');
       
        let product = await single_product(parseInt(id));

        SetProductId(id);
        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price);

        initModal();
    }


    let updateProduct = async() => {

        if (productName == '' || productPrice == '' || productDescription == '') {

            alert('fill all the necessary inputs');
            return false;
            
        }


        let updating_product = edit_product(parseInt(productId), productName, productDescription, parseInt(productPrice), productImage);

        console.log(updating_product);

    }


    // function for deleting product
    let deleteProduct = async (e) => {

        let id = e.target.getAttribute('data-id');

        let deletingProduct = await delete_product(parseInt(id));
        
        alert(`${deletingProduct.name} was deleted from product list`);
        window.location.reload();

    }

    useEffect(() => {
        loadProduct();
        
    }, [])

    useEffect(() => {
        loadpaginatedProduct()
    }, [searchProducts])

    return(
        <>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary">
                <h2 className="text-white">Products</h2>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>product Name</th>
                            <th>Product Description</th>
                            <th>Product Image</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                            {
                                product.map((item) => {
                                    return(

                                    <tr key={item.id}>
                                        <td>{count++}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        
                                        <td><img src={item.image} alt={item.image} width="80px" height="50px"/></td>
                                        <td>{item.price}</td>
                                        <td>
                                            <div className="btn-group">
                                            <button type="button" className="btn btn-primary"><FaRegEdit data-id={item.id} onClick={(e) => editProduct(e)}></FaRegEdit></button>
                                            <button type="button" className="btn btn-danger" data-id={item.id} onClick={(e) => deleteProduct(e)}><FaRegTrashAlt></FaRegTrashAlt></button>
                                            
                                            </div>
                                        </td>
                                    </tr>

                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>





            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                <Modal.Title>Product Editing Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control mb-2" id="name" placeholder="Enter product name" name="name" required value={productName} onChange={(e) => setProductName(e.target.value)}/>

                    <input type="text" className="form-control mb-2" id="description" placeholder="Enter roduct description" name="description" 
                    required value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>

                    <input type="number" className="form-control mb-2" id="price" placeholder="Enter product price" name="price" required value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>

                    <input type="text" className="form-control mb-2" id="image" placeholder="Enter image link" name="image" required value={productImage} onChange={(e) => setProductImage(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
               
                <Button variant="primary" onClick={updateProduct}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>





           
        
        </>
    )
}