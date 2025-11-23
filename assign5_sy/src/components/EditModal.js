// src/components/EditModal.js
import React, { useState, useEffect } from 'react';

/**
 * 기존 제품을 수정하는 모달 창입니다.
 */
function EditModal({ isOpen, onClose, productData, onSave }) {
    // 폼 입력 상태 관리. productData가 바뀔 때마다 초기화
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [count, setCount] = useState('');

    // productData prop이 변경될 때마다(즉, 수정 버튼을 누를 때마다) 상태를 업데이트
    // src/components/EditModal.js (useEffect 내)
    useEffect(() => {
        if (productData) {
            setProduct(String(productData.product || ''));
            // price를 상태에 저장할 때 명시적으로 문자열로 변환
            setPrice(String(productData.price || ''));
            setMaterial(String(productData.material || ''));
            setCount(String(productData.count || ''));
        }
    }, [productData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!productData) return; // 데이터가 없으면 실행 중지

        // 유효성 검사 (index.html의 saveData 유효성 검사 반영)
        if (!String(product).trim() ||
            !String(price).trim() ||
            !String(material).trim() ||
            !String(count).trim()) {

            alert("Please fill in all fields.");
            return;
        }

        const priceValue = Number(price);
        const countValue = Number(count);
        if (isNaN(priceValue) || isNaN(countValue)) {
            alert("Price and Count must be valid numbers.");
            return;
        }

        const updatedData = {
            product,
            price: priceValue,
            material,
            count: countValue
        };

        onSave(productData.id, updatedData); // ShowList.js의 handleSaveEdit 호출
    };

    const modalClass = isOpen ? "modal show" : "modal";

    // productData가 없거나 모달이 닫혀있으면 렌더링하지 않음
    if (!productData) return null;

    return (
        <div className={modalClass} id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden={!isOpen}
            onClick={(e) => e.target.id === 'editModal' && onClose()}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editModalLabel">Modify Product</h1>
                        <span className="btn-close" id="btn-edit-close" onClick={onClose}>&times;</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Controlled Input Fields (초기값은 productData에서 가져옴) */}
                            <input type="text" className="modal-input" id="edit-product" placeholder="Product Name"
                                value={product} onChange={(e) => setProduct(e.target.value)} />
                            <input type="text" className="modal-input" id="edit-price" placeholder="Price (e.g., 19.99)"
                                value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="text" className="modal-input" id="edit-material" placeholder="Material"
                                value={material} onChange={(e) => setMaterial(e.target.value)} />
                            <input type="text" className="modal-input" id="edit-count" placeholder="Count (Quantity)"
                                value={count} onChange={(e) => setCount(e.target.value)} />
                            {/* Hidden field는 필요 없지만, React에서는 productData.id를 직접 사용합니다. */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={onClose}>Close</button>
                            <button type="submit" id="btn-Save" className="btn">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;