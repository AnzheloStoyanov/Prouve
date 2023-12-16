import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleIcon from '@mui/icons-material/People';

export default function AdminDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const listItems = [
    { name: "Products", icon: <ShoppingCartIcon />, route: "/admin/products" },
    { name: "Users", icon: <PeopleIcon />, route: "/admin/users" },
    { name: "Allergens", icon: <WarningIcon />, route: "/admin/allergens" },
    { name: "Ingredients", icon: <ListAltIcon />, route: "/admin/ingredients" },
    { name: "Blogs", icon: <ArticleIcon />, route: "/admin/blogs" },
    { name: "Categories", icon: <CategoryIcon />, route: "/admin/categories" },
    { name: "Locations", icon: <LocationOnIcon />, route: "/admin/locations" },
    { name: "Payments", icon: <PaymentIcon />, route: "/admin/payments" },
    { name: "Vouchers", icon: <CardGiftcardIcon />, route: "/admin/vouchers" },
  ];

  const list = (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {listItems.map((item) => (
          <Link to={item.route} key={item.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          backgroundColor: "primary.main",
          color: "white",
          width: "56px",
          height: "56px",
          padding: "12px",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        aria-label="Open Admin Options"
      >
        <ArrowUpwardIcon fontSize="large" />{" "}
      </IconButton>
      <Drawer
        anchor='bottom'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}
