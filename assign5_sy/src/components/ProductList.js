// src/components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';

/**
 * 제품 목록을 표시하는 컨테이너입니다. (index.html의 makeList 역할)
 */
function ProductList({ products, onEdit, onDelete }) {
    // 데이터가 없을 때 표시할 메시지
    if (products.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: '#999', padding: '30px' }}>
                No products found. Click "Bring product data" to fetch or "Add New Product" to create one.
            </div>
        );
    }

    return (
        <div>
            {products.map(product => (
                <ProductItem 
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default ProductList;