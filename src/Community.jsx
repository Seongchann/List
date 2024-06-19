import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { FaEnvelope, FaTrash, FaThumbsUp } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Community = () => {
    const initialMessage = "오늘 당신의 TMI는 뭔가요?";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(initialMessage);
    const [messages, setMessages] = useState([]); // 추가된 메시지를 저장할 상태

    useEffect(() => {
        const interval = setInterval(() => {
            // 다음 인덱스 계산
            const nextIndex = currentIndex + 1 >= initialMessage.length ? 0 : currentIndex + 1;
            setCurrentIndex(nextIndex);
            // 현재 메시지 업데이트
            setCurrentMessage(initialMessage.substring(0, nextIndex + 1));
        }, 100); // 100ms마다 메시지 업데이트

        return () => clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌 클리어
    }, [currentIndex]); // currentIndex가 변경될 때마다 useEffect 호출

    // 메시지 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = e.target.elements.message.value;
        setMessages([...messages, { text: newMessage, likes: 0, comments: [] }]); // 새 메시지를 추가
        e.target.reset(); // 입력 필드 초기화
    };

    // 메시지 삭제 핸들러
    const handleDelete = (index) => {
        const updatedMessages = [...messages];
        updatedMessages.splice(index, 1); // 해당 인덱스의 메시지 삭제
        setMessages(updatedMessages);
    };

    // 좋아요 핸들러
    const handleLike = (index) => {
        const updatedMessages = [...messages];
        updatedMessages[index].likes += 1; // 해당 메시지의 좋아요 수 증가
        setMessages(updatedMessages);
    };

    // 댓글 제출 핸들러
    const handleCommentSubmit = (e, index) => {
        e.preventDefault();
        const newComment = e.target.elements.comment.value;
        const updatedMessages = [...messages];
        updatedMessages[index].comments.push(newComment); // 해당 메시지에 댓글 추가
        setMessages(updatedMessages);
        e.target.reset(); // 입력 필드 초기화
    };

    return (
        <>
            <Container className="mt-5">
                <div className="header">
                    <h8 style={{marginRight: "150px"}}>HK TMi
                        <img src="/대지%201%20사본%207.png" style={{width: "45px"}} alt="Login Logo" className="img-fluid"/>
                    </h8>
                    <span><FaEnvelope/></span>
                </div>
                <ListGroup>
                    {/* 저장된 메시지 표시 */}
                    {messages.map((message, index) => (
                        <ListGroup.Item key={index}>
                            {message.text}
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div>
                                    <Button variant="outline-primary" size="sm" onClick={() => handleLike(index)}
                                            style={{ padding: '0.25rem', fontSize: '0.8rem' }}>
                                        <FaThumbsUp style={{ fontSize: '1rem' }} /> {message.likes}
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}
                                            style={{backgroundColor: 'white', border: 'none', marginLeft: '10px', padding: '0.25rem'}}>
                                        <FaTrash style={{color: 'black', fontSize: '1rem'}}/>
                                    </Button>
                                </div>
                            </div>
                            <ListGroup className="mt-3">
                                {message.comments.map((comment, commentIndex) => (
                                    <ListGroup.Item key={commentIndex} className="ml-3">
                                        {comment}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Form onSubmit={(e) => handleCommentSubmit(e, index)} className="mt-2">
                                <Form.Group>
                                    <Form.Control type="text" name="comment" placeholder="댓글을 입력하세요..." required/>
                                </Form.Group>
                                <Button variant="secondary" type="submit" size="sm">댓글 달기</Button>
                            </Form>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>{currentMessage}</ListGroup.Item>
                </ListGroup>
                {/* 메시지 입력 양식 */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" name="message" placeholder="메시지를 입력하세요..." required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">TMI</Button>
                </Form>
            </Container>
            <div className="fixed-bottom bg-white p-5 d-flex justify-content-center">
                <Row>
                    <Col xs={3} className="text-center">
                        <FontAwesomeIcon icon={faSearch} size="lg"/>
                    </Col>
                    <Col xs={3} className="text-center">
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                    </Col>
                    <Col xs={3} className="text-center">
                        <FontAwesomeIcon icon={faHome} size="lg"/>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Community;
