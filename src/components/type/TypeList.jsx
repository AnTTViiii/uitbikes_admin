import React, { useRef, useState } from "react";
import { typeData } from "../configs/functions";
import {
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

function TypeList({ handleChangeType }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const options = typeData;
  const [selectedIndex, setSelectedIndex] = useState(
    options[
      sessionStorage.getItem("type")
        ? JSON.parse(sessionStorage.getItem("type"))
        : 0
    ].name
  );
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
    <div>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button fullWidth sx={{ textTransform: "none" }}>
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
                      sx={{ padding: "10px 15px" }}
                      key={child.id}
                      selected={child.name === selectedIndex}
                      onClick={() => {
                        handleChangeType(child.id);
                        setSelectedIndex(child.name);
                        setOpen(false);
                      }}
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
    </div>
  );
}

export default TypeList;
