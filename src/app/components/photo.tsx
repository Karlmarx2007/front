import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch } from 'react-redux';

import { Product } from "../models/product";
import { addToCart } from '../actions/cart-actions';
import { calculatePrice } from '../utils';
import { message } from 'antd';
import { CartItem } from '../models/cart-item';

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: 'var(--color-primary)',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

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
  amountNotSelected: {
    border: '2px solid var(--color-primary)',
    height: '3rem',
    textAlign: 'center',
    color: 'var(--color-primary)',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0.6rem 0'
  },
  isAmountSelected: {
    border: '2px solid var(--color-primary)',
    height: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-primary)',
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0.6rem 0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#034638',
    },
    '&:click': {
      backgroundColor: 'white',
    }
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '1rem',
    fontSize: '1.1rem'
  }
});



const Photo: React.FC<Product> = (props) => {
  const [state, setState] = useState({
    isAmountSelected: false,
    selectedGrams: 0,
    price: 0
  })

  const handleChange = (event: any) => {
    setState({...state, isAmountSelected: true, selectedGrams: parseFloat(event.target.value)})
  };
  const classes = useStyles();
  const imageSrc = props.source;
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);
  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }

  const dispatch = useDispatch();

  const handleCart = () => { 
    const cartItem: CartItem = {
      id: props._id,
      price: state.price,
      quantity: state.selectedGrams,
      source: props.source,
      title: props.title
    };
    dispatch(addToCart(cartItem));
    message.config({
      top: 100,
    });
    message.success('Item added to cart');
  };

  useEffect(() => {
    if (state.selectedGrams) {
      const totalPrice = calculatePrice(props.price, state.selectedGrams);
      setState({ ...state, price: totalPrice})
    }
  }, [props.price, state.selectedGrams]);
  
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
            { !state.price && <Typography component="h2" className={classes.price}>
              ${props.price} /g
            </Typography>}
            {!!state.price && <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Typography component="h2" className={classes.price}>
                ${state.price}
              </Typography>
              <Typography style={{ marginTop: '1rem', color: 'black'}}>${props.price} /g</Typography>
            </div> }
          </CardContent>
        </CardActionArea>
      </Link>
      <div style={{textAlign: 'center'}}>
        <form >
          <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" onChange={handleChange}>
              <FormControlLabel
                value={1}
                control={
                  <GreenRadio
                    onChange={handleChange}
                    checked={state.selectedGrams === 1}
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
                    checked={state.selectedGrams === 3.5}
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
                    checked={state.selectedGrams === 7}
                    inputProps={{ 'aria-label': '7' }}
                  />
                }
                label="7g"
              />
            </RadioGroup>
          </FormControl>
        </form>
      </div>
      {!state.isAmountSelected && <div className={classes.amountNotSelected}>Select Amount</div>}
      {state.isAmountSelected && <div className={classes.isAmountSelected} onClick={handleCart}>Add to Cart</div> }
    </Card>
  );
};

export default Photo;