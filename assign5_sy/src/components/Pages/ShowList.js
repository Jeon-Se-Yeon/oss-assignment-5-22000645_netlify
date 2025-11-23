// src/components/Pages/ShowList.js
import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';
import AddModal from '../AddModal';
import EditModal from '../EditModal';

const API_URL = "https://6909a7ab2d902d0651b49af9.mockapi.io/SampleProduct";

/**
 * 메인 컴포넌트: 제품 목록, 상태 관리, CRUD API 호출을 담당합니다.
 */
function ShowList() {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // 수정할 제품의 데이터를 담는 상태
    const [editingProduct, setEditingProduct] = useState(null);

    // READ: 제품 데이터를 불러오는 함수 (index.html의 getStudents와 동일)
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch product data.");
        }
    };
    
    // when you want to fetch products on component mount, uncomment below
    useEffect(() => {
    //     fetchProducts();
    }, []);


    // CREATE
    const handleAddProduct = async (newProductData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(newProductData),
            });

            if (response.status === 201) {
                fetchProducts(); // 목록 새로고침
                setIsAddModalOpen(false); // 모달 닫기
            } else {
                throw new Error(`Failed to add product: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    
    // DELETE
    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Do you really want to delete?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                fetchProducts(); // 목록 새로고침
            } else {
                 throw new Error(`Failed to delete data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    
    // UPDATE (prepare): open EditModal with selected product data
    const handleEditClick = (product) => {
        setEditingProduct(product); 
        setIsEditModalOpen(true);
    };

    // UPDATE (save): save edited product data
    const handleSaveEdit = async (id, updatedData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(updatedData),
            });

            if (response.status === 200) {
                fetchProducts(); // 목록 새로고침
                setIsEditModalOpen(false); // 모달 닫기
                setEditingProduct(null); 
            } else {
                 throw new Error(`Fail to update data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    return (
        <div>
            <h1>Product Inventory Management</h1>
            <button onClick={fetchProducts} id="btnStu">Bring product data</button>
            
            {/* Add New Product 버튼 클릭 시 AddModal 열기 */}
            <button onClick={() => setIsAddModalOpen(true)} id="btn-modal" type="button">
                Add New Product
            </button>
            
            <div id="contents">
                 {/* Product List 컴포넌트에 데이터와 이벤트 핸들러 전달 */}
                 <ProductList 
                    products={products} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteProduct} 
                 />
            </div>

            {/* AddModal 컴포넌트 */}
            <AddModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={handleAddProduct} 
            />
            
            {/* EditModal 컴포넌트: editingProduct가 있을 때만 렌더링 */}
            <EditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                productData={editingProduct} // 현재 수정할 데이터 전달
                onSave={handleSaveEdit} // 저장 핸들러 전달
            />
        </div>
    );
}

export default ShowList;