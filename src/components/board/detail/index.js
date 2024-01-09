import React, { useEffect, useState } from 'react';
import boardAPI from '../../../api/board';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUserId } from '../../../utils/user';
import styled from 'styled-components';

const BoardDetail = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const userId = getUserId();
    const [postDetail, setPostDetail] = useState(null);

    const onDelete = async () => {
        try {
            const id = Number(params.id);
            await boardAPI.deletePost(id);
            alert('글이 삭제되었습니다.');
            navigate('/');
        } catch (error) {}
    };

    useEffect(() => {
        const fetchBoards = async (id) => {
            try {
                setIsLoading(true);

                const response = await boardAPI.fetchDetail(id);

                setPostDetail(response.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        const id = Number(params.id);
        fetchBoards(id);
    }, [params.id]);

    if (isLoading) {
        return <p>로딩중..</p>;
    }

    if (isError) {
        return <p>오류가 발생했습니다.</p>;
    }

    return (
        <Wrapper>
            <PostContainer>
                <Title>{postDetail.title}</Title>
                <Content>{postDetail.content}</Content>
                <UserInfo>작성자: {postDetail.user === null ? '탈퇴된 사용자' : postDetail.user.name}</UserInfo>
            </PostContainer>

            {postDetail.user !== null && postDetail.user.id === userId && (
                <EditDeleteButtons>
                    <EditButton to={`/posts/${postDetail.id}/edit`}>수정하기</EditButton>
                    <DeleteButton onClick={onDelete}>삭제하기</DeleteButton>
                </EditDeleteButtons>
            )}
        </Wrapper>
    );
};

export default BoardDetail;

const Wrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const PostContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const Title = styled.h1`
    color: #4a47a3;
`;

const Content = styled.p`
    color: #343a40;
    margin-bottom: 20px;
`;

const UserInfo = styled.span`
    color: #6c757d;
`;

const EditDeleteButtons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const EditButton = styled(Link)`
    text-decoration: none;
    padding: 10px 20px;
    background-color: #4a47a3;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #343a40;
    }
`;

const DeleteButton = styled.button`
    padding: 10px 20px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c82333;
    }
`;
