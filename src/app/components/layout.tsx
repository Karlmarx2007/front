import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, Switch, Route, NavLink, withRouter, useHistory } from 'react-router-dom';
import routes from '../routes/routes';
import styled from 'styled-components';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import AppleIcon from '@material-ui/icons/Apple';
import { useSelector } from 'react-redux';
import { IUserSignIn } from '../pages/signin';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NavBar from './navbar';
import ProtectedRoute from './protected-route';
import { isAuthenticated, logoutAuth } from '../auth';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
  },
  logoImage: {
    fontWeight: 'bold',
    fontFamily: 'helvetica',
    fontSize: '1.5rem',
    border: '3px solid #FFFFFF',
    borderRadius: '50%',
    padding: '0.6rem'
  },
  logoName: {
    padding: '1.2rem 0',
    marginLeft: '0.2rem',
    fontFamily: 'cursive',
    fontSize: '0.5 rem',
    fontStyle: 'italic'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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

type Props = {
  history: any
}

const MainLayout: React.FC<Props> = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuId = 'primary-search-account-menu';
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    handleMenuClose();
    logoutAuth();
    
    if (!isAuthenticated()) {
      history.push('/signin');
    }
  };

  const renderSubMenu = (
    userInfo ?
      <div>
        <Link to='/inventory' className={classes.subMenu}><MenuItem onClick={handleMenuClose}>Inventory</MenuItem></Link>
        <Divider />
        <MenuItem style={{ marginTop: '2rem' }} onClick={handleLogOut}>Logout</MenuItem>
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
      <div className={classes.toolbar} style={{ background: 'var(--color-primary)', textAlign: 'center', padding: '0.2rem 0', height: '64px' }}>
        <Link to='/'>
          <div className={classes.logo}>
            <div className={classes.logoImage}>C G</div>
            <div className={classes.logoName}>
              <span>Cannabis GO</span>
            </div>
          </div>
        </Link>
      </div>
      <Divider />
      <List>
        <StyledLink to='/all' exact>
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

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar
        handleDrawerToggle={() => handleDrawerToggle()}
        handleProfileMenuOpen={(e: any) => handleProfileMenuOpen(e)}
        {...classes}
      />
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
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
          {routes.map((route, index) => route.protected ? (
            <ProtectedRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            /> 
          ) : (
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
  );
}

export default withRouter(MainLayout);