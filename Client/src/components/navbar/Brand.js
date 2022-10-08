import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";


const Brand = () => {
  return (
    <Link to="/">
    <Image src="/logo.png" alt="Company Logo" />

    </Link>
  )
}

export default Brand

const Image = styled.img`
  height: 70%;
  margin: auto 0;
`;