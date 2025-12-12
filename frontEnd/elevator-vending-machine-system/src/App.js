import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';

import useIdleTimer from './hooks/useIdleTimer';
import useAdminKey from './hooks/useAdminKey';
import AdminLoginModal from './components/AdminLoginModal';

// pages
import IntroPage from './pages/IntroPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PaymentPage from './pages/PaymentPage';
import ResultPage from './pages/ResultPage';

import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';

/* =========================
   내부 라우트 컴포넌트
========================= */
const AppContent = () => {
    useIdleTimer(300000);
    useAdminKey();

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (

        <>
            {/* 관리자 로그인 모달 (Routes 밖!) */}
            <AdminLoginModal />

            <Routes>
                {/* 사용자 영역 */}
                <Route path="/" element={<IntroPage />} />
                <Route path="/list" element={<ProductListPage />} />
                <Route path="/detail/:id" element={<ProductDetailPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/result" element={<ResultPage />} />

                {/* 관리자 영역 (아직 보호 안 함 – 다음 단계) */}
                <Route
                    path="/adminList"
                    element={isAdmin ? <AdminProductListPage /> : <Navigate to="/" replace />}
                />

                <Route
                    path="/adminForm"
                    element={isAdmin ? <AdminProductFormPage /> : <Navigate to="/" replace />}
                />

                <Route
                    path="/adminForm/:id"
                    element={isAdmin ? <AdminProductFormPage /> : <Navigate to="/" replace />}
                />

                <Route
                    path="/adminDetail/:id"
                    element={isAdmin ? <AdminProductDetailPage /> : <Navigate to="/" replace />}
                />

            </Routes>
        </>
    );
};

const App = () => {
    return (
        <OrderProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </OrderProvider>
    );
};

export default App;
