import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import NestedMenuItem from "material-ui-nested-menu-item";
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import "./drawer.css";
const useStyles = makeStyles(theme => ({
  menuButton: {
    backgroundColor: "inherit",
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
}));
export const Drawer = ({ position }) => {
  const classes = useStyles();
  const [menuPosition, setMenuPosition] = useState({
    top: 30,
    left: 10,
  })
  const [open, setOpen] = useState(false);

  const [list, setList] = useState();
  useEffect(() => {
    const axiosList = async () => {
      const result = await axios.get("https://alconn.co/api/category/list");
      console.log("카테고리 출력");
      console.log(result);
      setList(result.data.data.cildCategory);
    }
    axiosList();
  }, [])

  const handleClick = (event: React.MouseEvent) => {
    setOpen(null);
  }

  const menuClick = (e) => {
    console.log("좌표값");
    console.log(e.target.getBoundingClientRect().top);
    console.log(e.target.getBoundingClientRect().left);
  }

  const categoryList = (cild, num) => {
    if (num >= 3)
      return;

    if (cild.cildCategory.length > 0 && num < 2)
      return (
        
          <NestedMenuItem onMouseLeave={handleClick}
            label={cild.categoryName}
            parentMenuOpen={open}
            >

            {
              cild.cildCategory && cild.cildCategory.map((row, idx) =>
                categoryList(row, num + 1)
              )
            }

          </NestedMenuItem>
        
      )
    else
      return (
        <MenuItem onMouseLeave={handleClick}>
          {cild.categoryName}

        </MenuItem>
      )
  }

  return (
    <div>
      <div onMouseEnter={()=> {
        setOpen(true)
      }}
        className="dropdown"
      >
      <MenuIcon />
      </div>

      <Menu open={open}
        // onClose={()=>setOpen(false)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
        onMouseOut={()=>setOpen(false)}
        
        >
        {
          list && list.map((row, idx) =>
            categoryList(row, 0)
            )
          }

      </Menu>
    </div>
  );
};

export default Drawer;