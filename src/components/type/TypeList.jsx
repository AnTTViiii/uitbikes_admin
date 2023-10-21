import React, { useRef, useState } from "react";
import { typeData } from "../configs/functions";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

function TypeList() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const options = typeData;
  const [selectedIndex, setSelectedIndex] = useState("Tất cả");
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <Box>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button
          fullWidth
          className="create-product-btn"
          sx={{ textTransform: "none" }}
        >
          {selectedIndex}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((child, index) => (
                    <MenuItem
                      sx={{ padding: 2 }}
                      key={child.id}
                      selected={child.name === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, child.name)
                      }
                    >
                      {child.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

export default TypeList;
