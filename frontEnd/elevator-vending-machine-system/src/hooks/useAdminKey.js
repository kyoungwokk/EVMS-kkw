import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useAdminKey = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key !== 'F10') return;

            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            const isAdminPage = location.pathname.startsWith('/admin');

            // ✅ 관리자 페이지에서 F10 → 로그아웃
            if (isAdmin && isAdminPage) {
                localStorage.removeItem('isAdmin');
                navigate('/');
                return;
            }

            // ✅ 그 외 → 관리자 로그인 모달 요청
            window.dispatchEvent(new Event('openAdminLogin'));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [location, navigate]);
};

export default useAdminKey;
