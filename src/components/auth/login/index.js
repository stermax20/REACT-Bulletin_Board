import { useState } from 'react';
import { sha512 } from 'js-sha512';
import authAPI from '../../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onLogin = async () => {
        const request = {
            email,
            password: sha512(password),
        };

        try {
            const response = await authAPI.login(request);

            localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/');

            alert('로그인 성공');
        } catch (error) {
            alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
    };

    return (
        <LoginWrapper>
            <LoginBox>
                <h1 style={{ textAlign: 'center' }}>로그인</h1>

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

                <StyledButton onClick={onLogin}>로그인</StyledButton>

                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <StyledButton style={{ marginTop: '10px', backgroundColor: '#28a745' }}>
                        회원가입으로 돌아가기
                    </StyledButton>
                </Link>
            </LoginBox>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

const LoginBox = styled.div`
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
