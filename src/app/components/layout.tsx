import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, Switch, Route, BrowserRouter, NavLink, useHistory } from 'react-router-dom';
import routes from '../routes/routes';
import styled from 'styled-components';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import AppleIcon from '@material-ui/icons/Apple';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { IUserSignIn } from '../pages/signin';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { CartItem } from '../models/cart-item';
import { ICartState } from '../pages/cart';
import { searchProduct } from '../actions/search-actions';
import Cookie from 'js-cookie';
import { logout } from '../actions/user-actions';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'white',
    minHeight: '100vh'
  },
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
  inputRoot: {
    color: 'inherit',
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

const StyledListItem = styled(ListItem)`
  color: black;
`;

const StyledSpan = styled.span`
font-size: 1rem;
`;
const StyledIcon = styled(ListItemIcon)``;

const StyledLink = styled(NavLink)`
  &.active {
    ${StyledListItem} {
      background-color: #F5F5F5;
      color: var(--color-primary);
    }

    ${StyledIcon} {
      color: var(--color-primary);
    }

    ${StyledSpan} {
      font-weight: bold;
    }
  }
`;

function MainLayout(props: any) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cart: { cartItems: CartItem[] } = useSelector<ICartState, any>(state => state.cart);
  const menuId = 'primary-search-account-menu';
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();
    dispatch(logout());
    Cookie.remove('userInfo');
  };

  const renderSubMenu = (
    userInfo ?
    <div>
      <Link to='/inventory' className={classes.subMenu}><MenuItem onClick={handleMenuClose}>Inventory</MenuItem></Link>
      <Divider />
        <MenuItem style={{marginTop: '2rem'}} onClick={handleLogOut}>Logout</MenuItem>
    </div> :
    <div>
      <Link to='/signin' className={classes.subMenu}><MenuItem onClick={handleMenuClose}>Sign In</MenuItem></Link>
      <Link to='/signup' className={classes.subMenu}><MenuItem onClick={handleMenuClose}>Sign Up</MenuItem></Link>
    </div>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {renderSubMenu}
    </Menu>
  );

  

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ background: 'var(--color-primary)', textAlign: 'center', padding: '10px 0', height: '64px' }}>
        <Link to='/'><img src={require('../../assets/images/logo.png')} alt="logo" style={{ maxWidth: '9rem', maxHeight: '3rem' }} /></Link>
      </div>
      <Divider />
      <List>
        <StyledLink to='/' exact>
          <StyledListItem button key={1}>
            <StyledIcon><FilterVintageIcon /></StyledIcon>
            <StyledSpan>All</StyledSpan>
          </StyledListItem>
        </StyledLink>
        <StyledLink to='/sativa'>
          <StyledListItem button key={2} >
            <StyledIcon><OfflineBoltIcon /></StyledIcon>
            <StyledSpan>Sativa</StyledSpan>
          </StyledListItem>
        </StyledLink>
        <StyledLink to='/indica'>
          <StyledListItem button key={3}>
            <StyledIcon><SlowMotionVideoIcon /></StyledIcon>
            <StyledSpan>Indica</StyledSpan>
          </StyledListItem>
        </StyledLink>
        <StyledLink to='/edibles'>
          <StyledListItem button key={4}>
            <StyledIcon><AppleIcon /></StyledIcon>
            <StyledSpan>Edibles</StyledSpan>
          </StyledListItem>
        </StyledLink>
        <StyledLink to='/rolls'>
          <StyledListItem button key={5}>
            <StyledIcon><SmokingRoomsIcon /></StyledIcon>
            <StyledSpan>Rolls</StyledSpan>
          </StyledListItem>
        </StyledLink>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const handleSearch = (e: any) => dispatch(searchProduct(e.target.value));
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
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
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
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
        {renderMenu}
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

MainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainLayout;