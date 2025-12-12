import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 관리자 계정 (과제/졸업작품 기준)
const ADMIN_ID = 'admin';
const ADMIN_PW = '2025';

/* =======================
   styled-components
======================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
`;

const Title = styled.h3`
    transform: translateY(-12px);
    margin-bottom: 20px;
`;


const Input = styled.input`
  width: 85%;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
    width: 92%;
    margin: 20px auto 0 auto;
    display: flex;
    gap: 10px;
`;


const Button = styled.button`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &.login {
    background: #3498db;
    color: #fff;
  }

  &.cancel {
    background: #bdc3c7;
    color: #2c3e50;
  }
`;

/* =======================
   Component
======================= */
const AdminLoginModal = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // F10 이벤트 수신
    useEffect(() => {
        const openModal = () => setOpen(true);
        window.addEventListener('openAdminLogin', openModal);
        return () => window.removeEventListener('openAdminLogin', openModal);
    }, []);

    // 로그인 처리
    const handleLogin = () => {
        if (id === ADMIN_ID && pw === ADMIN_PW) {
            localStorage.setItem('isAdmin', 'true');
            setOpen(false);
            setId('');
            setPw('');
            navigate('/adminList');
        } else {
            alert('관리자 인증 실패');
        }
    };

    // 취소
    const handleCancel = () => {
        setOpen(false);
        setId('');
        setPw('');
    };

    if (!open) return null;

    return (
        <Overlay>
            <Modal>
                <Title>관리자 로그인</Title>

                <Input
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                <ButtonGroup>
                    <Button className="cancel" onClick={handleCancel}>
                        취소
                    </Button>
                    <Button className="login" onClick={handleLogin}>
                        로그인
                    </Button>
                </ButtonGroup>
            </Modal>
        </Overlay>
    );
};

export default AdminLoginModal;
