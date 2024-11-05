import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function ActionButton({ options = [], onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    handleClose();
    if (onSelect) {
      onSelect(option); 
    }
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "#ffb800",
          borderRadius: "5px",
          boxShadow: "none",
          pl: 3,
          color: "white",
          "&:hover": {
            backgroundColor: "#e3a609",
          },
          "&:active": {
            backgroundColor: "#ffcc00",
          },
          "&:disabled": {
            backgroundColor: "#cccccc",
          },
        }}
      >
        Action {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: 1,
          borderRadius: "5px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleSelect(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

ActionButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any, 
    })
  ),
  onSelect: PropTypes.func,
};

export default ActionButton;