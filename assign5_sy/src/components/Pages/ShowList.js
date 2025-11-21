// src/components/Pages/ShowList.js
import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import AddModal from '../AddModal';
import EditModal from '../EditModal';

const API_URL = "https://6909a7ab2d902d0651b49af9.mockapi.io/SampleProduct";

function ShowList() {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // READ operation (Similar to getStudents)
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Initial load message will be shown until this runs
    }, []);

    // CREATE operation (Similar to postData)
    const handleAddProduct = async (newProductData) => {
        // ... (POST logic with fetch)
        fetchProducts(); // Refresh list
        setIsAddModalOpen(false);
    };

    // UPDATE preparation (opens edit modal)
    const handleEditClick = (product) => {
        setEditingProduct(product); // Pass the current product data
        setIsEditModalOpen(true);
    };

    // UPDATE operation (Similar to saveData)
    const handleSaveEdit = async (id, updatedData) => {
        // ... (PUT logic with fetch)
        fetchProducts(); // Refresh list
        setIsEditModalOpen(false);
        setEditingProduct(null);
    };

    // DELETE operation (Similar to deleteData)
    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Do you really want to delete?")) return;
        // ... (DELETE logic with fetch)
        fetchProducts(); // Refresh list
    };

    return (
        <div>
            <h1>Product Inventory Management</h1>
            <button onClick={fetchProducts} id="btnStu">Bring product data</button>
            <button onClick={() => setIsAddModalOpen(true)} id="btn-modal">Add New Product</button>

            <div id="contents">
                 {/* Product List Component */}
                 <ProductList 
                    products={products} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteProduct} 
                 />
            </div>

            {/* Modals */}
            <AddModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddProduct} 
            />
            
            {editingProduct && (
                 <EditModal 
                     isOpen={isEditModalOpen} 
                     onClose={() => setIsEditModalOpen(false)} 
                     productData={editingProduct}
                     onSave={handleSaveEdit}
                 />
            )}
        </div>
    );
}

export default ShowList;