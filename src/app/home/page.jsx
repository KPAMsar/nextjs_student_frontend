"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { fetchApi } from "@/utils/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  padding: 20px 10px;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Box = styled.div`
  border: 1px solid black;
  width: 30vw;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BoxTitle = styled.h2`
  margin-bottom: 10px;
`;

const StudentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ArrowButton = styled.div`
  font-size: 25px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function Home() {
  const [students1, setStudents1] = useState([]);
  const [students2, setStudents2] = useState([]);
  const [box1Clicks, setBox1Clicks] = useState([]);
  const [box2Clicks, setBox2Clicks] = useState([]);

  useEffect(() => {
    const fetchStudents1 = async () => {
      const response = await fetchApi("/students1", "GET");
      setStudents1(response);
    };

    const fetchStudents2 = async () => {
      const response = await fetchApi("/students2", "GET");
      setStudents2(response);
    };

    fetchStudents1();
    fetchStudents2();
  }, []);

  const handleLeftClicks = () => {
    if (box2Clicks.length > 0) {
      const selectedStudents = students2.filter((student) =>
        box2Clicks.includes(student.id)
      );
      setStudents1((prevStudents) => [...prevStudents, ...selectedStudents]);
      setStudents2((prevStudents) =>
        prevStudents.filter((student) => !box2Clicks.includes(student.id))
      );
      setBox2Clicks([]);
      toast.success("Students moved to the left box");
    } else if (box1Clicks.length > 0) {
      toast.error("User already exists in Box 1");
    } else {
      toast.error("No student was selected");
    }
  };

  const handleRightClicks = () => {
    if (box1Clicks.length > 0) {
      const selectedStudents = students1.filter((student) =>
        box1Clicks.includes(student.id)
      );
      setStudents2((prevStudents) => [...prevStudents, ...selectedStudents]);
      setStudents1((prevStudents) =>
        prevStudents.filter((student) => !box1Clicks.includes(student.id))
      );
      setBox1Clicks([]);
      toast.success("Students moved to the right box");
    } else if (box2Clicks.length > 0) {
      toast.error("User already exists in Box 2");
    } else {
      toast.error("No student was selected");
    }
  };

  return (
    <Container>
      <BoxContainer>
        <Box>
          <BoxTitle>Box 1</BoxTitle>
          {students1?.map((student) => (
            <StudentItem key={student.id}>
              <input
                type="checkbox"
                name={`student${student.id}`}
                id={`student${student.id}`}
                onChange={(event) => {
                  const studentId = student.id;
                  if (event.target.checked) {
                    setBox1Clicks([...box1Clicks, studentId]);
                  } else {
                    setBox1Clicks(box1Clicks.filter((id) => id !== studentId));
                  }
                }}
              />
              <label htmlFor={`student${student.id}`}>
                {student.name}--{student.marks}
              </label>
            </StudentItem>
          ))}
        </Box>

        <ArrowContainer>
          <ArrowButton onClick={handleRightClicks}>
            <FiArrowRight />
          </ArrowButton>
          <ArrowButton onClick={handleLeftClicks}>
            <FiArrowLeft />
          </ArrowButton>
        </ArrowContainer>

        <Box>
          <BoxTitle>Box 2</BoxTitle>
          {students2?.map((student) => (
            <StudentItem key={student.id}>
              <input
                type="checkbox"
                name={`student${student.id}`}
                id={`student${student.id}`}
                onChange={(event) => {
                  const studentId = student.id;
                  if (event.target.checked) {
                    setBox2Clicks([...box2Clicks, studentId]);
                  } else {
                    setBox2Clicks(box2Clicks.filter((id) => id !== studentId));
                  }
                }}
              />
              <label htmlFor={`student${student.id}`}>{student.name}</label>
            </StudentItem>
          ))}
        </Box>
      </BoxContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
}

export default Home;
