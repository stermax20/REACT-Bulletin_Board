import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import boardAPI from '../../../api/board';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [boards, setBoards] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [pagesIndex, setPagesIndex] = useState(0);

    const [page, setPage] = useState(1);

    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const response = await boardAPI.fetchAll(page - 1);

                const boards = response.data.content;
                setTotalPages(response.data.totalPages);

                setBoards(boards);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchBoards();
    }, [page]);

    useEffect(() => {
        let result = [];
        let temp = [];

        for (let i = 1; i <= totalPages; i++) {
            temp.push(i);

            if (temp.length % 5 === 0) {
                result.push(temp);

                temp = [];
            }
        }

        if (temp.length > 0) {
            result.push(temp);
        }

        setPages(result);
    }, [totalPages]);

    return (
        <div>
            <Wrapper>
                <Header>
                    <Title>게시글 목록</Title>
                    <WriteButton to="/posts/write">글 작성하기</WriteButton>
                </Header>
                <BoardWrapper>
                    {isLoading
                        ? '로딩중'
                        : isError
                        ? '오류 발생'
                        : boards.map((board) => (
                              <BoardBox to={`/posts/${board.id}`} key={board.id}>
                                  <ContentBox>
                                      <BoardTitle>{board.title}</BoardTitle>
                                      <BoardTime>
                                          작성일: {dayjs(board.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}
                                      </BoardTime>
                                      <BoardAuthor>
                                          작성자: {board.user === null ? '탈퇴된 사용자입니다.' : board.user.name}
                                      </BoardAuthor>
                                  </ContentBox>
                              </BoardBox>
                          ))}
                </BoardWrapper>
            </Wrapper>
            <div>
                {pagesIndex > 0 ? <button onClick={() => setPagesIndex((prev) => prev - 1)}>이전</button> : <></>}

                <div>
                    {pages[pagesIndex]?.map((page) => {
                        return (
                            <button
                                key={page}
                                onClick={() => setPage(page)}
                                style={{
                                    padding: '10px',
                                    background: page === page ? 'red' : 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {pagesIndex < pages.length - 1 ? (
                    <button onClick={() => setPagesIndex((prev) => prev + 1)}>다음</button>
                ) : (
                    <></>
                )}
            </div>
        </div>
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
