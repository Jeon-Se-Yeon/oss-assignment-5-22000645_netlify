// src/components/ProductItem.js
import React from 'react';

/**
 * 개별 제품 항목을 렌더링합니다.
 */
function ProductItem({ product, onEdit, onDelete }) {
    // productData가 유효하지 않을 경우를 대비한 안전 장치
    if (!product) return null;

    return (
        <div id={product.id} className="product-item">
            <div className="content">
                {product.product} x {product.count} ({product.material}) [${product.price}] 
            </div>
            <div className="product-actions">
                {/* 수정 버튼 클릭 시, 상위 컴포넌트의 핸들러(handleEditClick) 호출 */}
                <button onClick={() => onEdit(product)}>Modify</button>
                {/* 삭제 버튼 클릭 시, 상위 컴포넌트의 핸들러(handleDeleteProduct) 호출 */}
                <button onClick={() => onDelete(product.id)}>Delete</button>
            </div>
        </div>
    );
}

export default ProductItem;