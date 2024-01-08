import { useState } from 'react';
import { sha512 } from 'js-sha512';
import authAPI from '../../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onRegister = async () => {
        if (!name || !email || !password) {
            alert('모든 값을 입력해주세요.');
            return;
        }

        const request = {
            name,
            email,
            password: sha512(password),
        };

        try {
            await authAPI.register(request);
            navigate('/login');
        } catch (error) {
            console.log(error);
            const status = error.response.data.status;

            if (status === 409) {
                alert('이메일이 중복되었습니다.');
            }
        }
    };

    return (
        <RegisterWrapper>
            <RegisterBox>
                <h1 style={{ textAlign: 'center' }}>사용자 회원가입</h1>

                <div>
                    이름 :
                    <StyledInput type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div>
                    이메일 :
                    <StyledInput type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                    비밀번호 :
                    <StyledInput
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <StyledButton onClick={onRegister}>가입하기</StyledButton>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <StyledButton style={{ marginTop: '10px', backgroundColor: '#28a745' }}>
                        로그인으로 돌아가기
                    </StyledButton>
                </Link>
            </RegisterBox>
        </RegisterWrapper>
    );
};

export default Register;

const RegisterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

const RegisterBox = styled.div`
    width: 300px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
    width: 95%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const StyledButton = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4a47a3;
    color: white;
    cursor: pointer;
`;
