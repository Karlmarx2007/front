import React from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { Product } from "../models/product";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex; 
  width: 13rem;
  height: 20rem;
  color: #3c3d3d;
  border:  0.3px solid transparent;
  margin: 0 auto;
  transition: border-color 600ms;
  &:hover {
    border-color: #cfd7e6;
  };
`;

const StyledImage = styled(Image)`
  height: 10rem;
  width: auto;
`;

const Photo: React.FC<Product> = (props) => {
  const imageSrc = props.source;
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);
  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }
  
  return (
    <Link to={"/product/" + props._id}>
      <StyledCard className="mb-4">
        <StyledImage src={String(imageSrc)} onError={(e) => handleImageError(e)} alt="ii" rounded fluid />
        <Card.Body style={{textAlign: 'center', top: '30px'}}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <b>from ${props.price}/g</b>
            <br />
            contains more {props.dominant}
            <br />
            <b>THC</b> {props.thcPercent.min} - {props.thcPercent.max}%
            <br />
            <b>CBD</b> {props.cbdPercent.min} - {props.cbdPercent.max}%
          </Card.Text>
        </Card.Body>
      </StyledCard>
    </Link>
  );
};

export default Photo;
