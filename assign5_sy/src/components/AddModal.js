// src/components/AddModal.js
import React, { useState } from 'react';

/**
 * 새 제품을 추가하는 모달 창입니다.
 */
function AddModal({ isOpen, onClose, onAdd }) {
    // 폼 입력 상태 관리
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [count, setCount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // 간단한 유효성 검사 (index.html의 postData 유효성 검사 반영)
        if (!product.trim() || !price.trim() || !material.trim() || !count.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        
        const priceValue = Number(price);
        const countValue = Number(count);
        if (isNaN(priceValue) || isNaN(countValue)) {
             alert("Price and Count must be valid numbers.");
             return;
        }

        const newProduct = { product, price: priceValue, material, count: countValue };

        onAdd(newProduct); // ShowList.js의 handleAddProduct 호출

        // 폼 초기화 (성공 후)
        setProduct('');
        setPrice('');
        setMaterial('');
        setCount('');
    };

    // 모달 클래스를 동적으로 설정 (index.html의 classList.toggle("show") 대체)
    const modalClass = isOpen ? "modal show" : "modal";

    return (
        <div className={modalClass} id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden={!isOpen}
             onClick={(e) => e.target.id === 'addModal' && onClose()}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addModalLabel">Add New Product</h1>
                        <span className="btn-close" id="btn-close" onClick={onClose}>&times;</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Controlled Input Fields */}
                            <input type="text" className="modal-input" id="product" placeholder="Product Name" 
                                value={product} onChange={(e) => setProduct(e.target.value)} />
                            <input type="text" className="modal-input" id="price" placeholder="Price (e.g., 19.99)" 
                                value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="text" className="modal-input" id="material" placeholder="Material" 
                                value={material} onChange={(e) => setMaterial(e.target.value)} />
                            <input type="text" className="modal-input" id="count" placeholder="Count (Quantity)" 
                                value={count} onChange={(e) => setCount(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={onClose}>Close</button>
                            <button type="submit" id="btn-Add" className="btn">Add data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddModal;