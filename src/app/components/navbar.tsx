import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles, fade } from '@material-ui/core/styles';
import { searchProduct } from '../actions/search-actions';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../models/cart-item';
import { ICartState } from '../pages/cart';
import useDebounce from '../custom-hooks/use-debounce';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: 'var(--color-primary)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: '#FFFF'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'flex',
  },
  subMenu: {
    color: 'black'
  }
}));

const NavBar: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const cart: { cartItems: CartItem[] } = useSelector<ICartState, any>(state => state.cart);
  const [searchWord, setSearchWord] = useState('');
  const dispatch = useDispatch();
  const menuId = 'primary-search-account-menu';

  const debouncedSearchTerm = useDebounce(searchWord, 500);
  useEffect(() => {
    dispatch(searchProduct(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: props.inputRoot,
              input: props.inputInput,
            }}
            value={searchWord}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchWord(e.target.value)}
            onBlur={() => setSearchWord('')}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={props.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Link to='/cart' style={{ color: 'white' }}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cart.cartItems.length} color="primary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;