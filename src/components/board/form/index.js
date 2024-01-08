import { useEffect, useState } from 'react';
import styled from 'styled-components';
import boardAPI from '../../../api/board';
import { useNavigate, useParams } from 'react-router-dom';

const BoardForm = () => {
    const params = useParams();

    const postId = Number(params.id);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const onSubmit = async () => {
        if (!title || !content) {
            alert('내용을 모두 입력해주세요.');

            return;
        }

        try {
            const request = {
                title,
                content,
            };

            if (isNaN(postId)) {
                await boardAPI.createPost(request);

                alert('글을 작성했습니다.');
            } else {
                await boardAPI.updatePost(postId, request);

                alert('글을 수정했습니다.');
            }

            navigate('/');
        } catch (error) {}
    };

    useEffect(() => {
        if (isNaN(postId)) {
            return;
        }

        const fetchBoard = async (id) => {
            const response = await boardAPI.fetchDetail(id);

            const post = response.data;

            setTitle(post.title);
            setContent(post.content);
        };

        fetchBoard(postId);
    }, [postId]);

    return (
        <BoardFormContainer>
            <FormWrapper>
                <div>
                    <InputField
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="제목을 입력하세요."
                    />
                </div>

                <div>
                    <TextAreaField
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    ></TextAreaField>
                    <SubmitButton type="submit" onClick={onSubmit}>
                        {isNaN(postId) ? '작성하기' : '수정하기'}
                    </SubmitButton>
                </div>
            </FormWrapper>
        </BoardFormContainer>
    );
};

export default BoardForm;

const BoardFormContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const FormWrapper = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
    width: 95%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #3498db;
    }
`;

const TextAreaField = styled.textarea`
    width: 95%;
    height: 300px;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    resize: none;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #3498db;
    }
`;

const SubmitButton = styled.button`
    background-color: #3498db;
    color: #fff;
    padding: 15px 20px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2980b9;
    }
`;
