import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useOrder } from '../context/OrderContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setSelectedProduct } = useOrder();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                // ProductController의 @GetMapping("/{id}") 실행
                const response = await client.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("상세 정보 불러오기 실패:", error);
                alert("상품 정보를 찾을 수 없습니다.");
                navigate('/list');
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id, navigate]);

    if (loading) return <div>로딩 중...</div>;
    if (!product) return null;

    const handleOrder = () => {
        setSelectedProduct(product);
        navigate('/payment');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{product.name}</h1>
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
                <p><strong>가격:</strong> {product.price}원</p>
                {/* DTO에 해당 필드들이 있다고 가정 */}
                <p><strong>남은 재고:</strong> {product.stock}개</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(-1)} style={{ flex: 1, padding: '15px' }}>뒤로 가기</button>
                <button onClick={handleOrder} style={{ flex: 1, padding: '15px', background: 'blue', color: 'white' }}>
                    결제 하기
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;