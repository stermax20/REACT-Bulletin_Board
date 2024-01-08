import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import boardAPI from '../../../api/board';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardList = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            const response = await boardAPI.fetchAll();
            const boards = response.data.content;
            setBoards(boards);
        };
        fetchBoards();
    }, []);

    return (
        <Wrapper>
            <Header>
                <Title>게시글 목록</Title>
                <WriteButton to="/posts/write">글 작성하기</WriteButton>
            </Header>
            <BoardWrapper>
                {boards.map((board) => (
                    <BoardBox to={`/posts/${board.id}`} key={board.id}>
                        <ContentBox>
                            <BoardTitle>{board.title}</BoardTitle>
                            <BoardTime>작성일: {dayjs(board.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}</BoardTime>
                            <BoardAuthor>
                                작성자: {board.user === null ? '탈퇴된 사용자입니다.' : board.user.name}
                            </BoardAuthor>
                        </ContentBox>
                    </BoardBox>
                ))}
            </BoardWrapper>
        </Wrapper>
    );
};

export default BoardList;

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    color: #4a47a3;
`;

const WriteButton = styled(Link)`
    text-decoration: none;
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }
`;

const BoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 20px;
`;

const BoardBox = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: inherit;
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
`;

const ContentBox = styled.div`
    width: 100%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BoardTitle = styled.h3`
    color: #4a47a3;
    margin-bottom: 10px;
`;

const BoardTime = styled.time`
    color: #6c757d;
    font-size: 0.9em;
`;

const BoardAuthor = styled.p`
    color: #28a745;
    font-size: 0.9em;
    margin-top: 10px;
`;
