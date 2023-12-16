import styles from './OrderMenu.module.css';
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const OrderMenu = ({ sortBy, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Подреди");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data) => {
    if (data) {
      onSelect(data);
      setSelectedOption(options.find(o => o.value === data)?.text);
    }

    setAnchorEl(null);
  };

  const options = [
    { value: "default", text: "По подразбиране" },
    { value: "popular", text: "Най-популарни" },
    { value: "new", text: "Най-нови" },
    { value: "price-asc", text: "Цена: ниска към висока" },
    { value: "price-desc", text: "Цена: висока към ниска" },
  ]

  return (
    <div className="customMenu">
      <Button variant="contained" onClick={handleClick}>
        {selectedOption}
      </Button>
      <Menu className="customMenu"
        key="OrderMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={() => handleClose(null)}
      >
        {options.map(option => (
          <MenuItem key={option.value} onClick={() => handleClose(option.value)}>{option.text}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OrderMenu;