import React from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { Product } from "../models/product";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const StyledCard = styled(Card)`
  width: 13rem;
  height: 20rem;
  color: #3c3d3d;
  border: none;
  margin: 0 auto;
  &:hover {
    background-color: #f2f4f7;
  };
`;

const styledCardTitle = styled(Card.Title)`
  &:hover {
    color: #138496;
  };
`;
const StyledImage = styled(Image)`
  height: 10rem;
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
        <Card.Body>
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
