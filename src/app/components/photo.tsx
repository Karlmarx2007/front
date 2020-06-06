// import React from "react";
// import Image from "react-bootstrap/Image";
// 
// 
// import styled from "styled-components";

import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Product } from "../models/product";
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import green from '@material-ui/core/colors/green';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


// const StyledCard = styled(Card)`
//   display: flex; 
//   width: 13rem;
//   height: 20rem;
//   color: #3c3d3d;
//   border:  0.3px solid transparent;
//   margin: 0 auto;
//   transition: border-color 600ms;
//   &:hover {
//     border-color: #cfd7e6;
//   };
// `;

// const StyledImage = styled(Image)`
//   height: 10rem;
//   width: auto;
// `;
const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    maxHeight: 450,
    marginBottom: '1rem',
    flexGrow: 1
  },
  title: {
    fontSize: '1.2rem',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    marginTop: '0.5rem'
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
    maxHeight: 140
  },
  image: {
    width: '50%',
    height: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderLeft: '1px solid #dadce0',
    color: 'black'
  },
  radio: {
    color: '#bfc2c7',
    '&$checked': {
      color: green[600],
    },
  }
});

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const Photo: React.FC<Product> = (props) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [color, setColor] = useState('');

  const handleChange = (event: any) => {
    console.log('event.target.value > ', event.target.value);
    
    setSelectedValue(event.target.value);
  };
  const classes = useStyles();
  const imageSrc = props.source;
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);
  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }

  const handleSubmit = () => { };
  
  return (
    <Card className={classes.root}>
      <Link to={"/product/" + props._id}>
        <CardActionArea>
          <CardContent>
            <Typography className={classes.title} color="textPrimary">
              {props.title}
            </Typography>
            <Typography className={classes.subtitle} color="textPrimary">
              {props.dominant} Dominant
            </Typography>
            <div className={classes.imageSection} color="textPrimary">
              <CardMedia
                component="img"
                alt={props.title}
                image={String(imageSrc)}
                onError={(e: any) => handleImageError(e)}
                className={classes.image}
              ></CardMedia>
              <div className={classes.details}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>THC</p>
                  <p>{props.thcPercent.min} - {props.thcPercent.max}%</p>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>CBD</p>
                  <p>{props.cbdPercent.min} - {props.cbdPercent.max}%</p>
                </div>
              </div>
            </div>
            <Typography component="h2" style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '1rem', fontSize: '1rem' }}>
              ${props.price} /g
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <div style={{textAlign: 'center'}}>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" onChange={handleChange}>
              <FormControlLabel
                value={1}
                control={
                  <GreenRadio
                    onChange={handleChange}
                    checked={selectedValue === '1'}
                    inputProps={{ 'aria-label': '1' }}
                  />
                }
                label="1g"
              />
              <FormControlLabel
                value={3.5}
                control={
                  <GreenRadio
                    onChange={handleChange}
                    checked={selectedValue === '3.5'}
                    inputProps={{ 'aria-label': '3.5' }}
                  />
                }
                label="3.5g"
              />
              <FormControlLabel
                value={7}
                control={
                  <GreenRadio
                    onChange={handleChange}
                    checked={selectedValue === '7'}
                    inputProps={{ 'aria-label': '7' }}
                  />
                }
                label="7g"
              />
            </RadioGroup>
          </FormControl>
        </form>
      </div>
      {/* <CardActions>
        <Button variant="outlined" style={{width: '100%'}}>Choose Amount</Button>
      </CardActions> */}
    </Card>
  );
};

export default Photo;

{/* <StyledCard className="mb-4">
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
      </StyledCard> */}