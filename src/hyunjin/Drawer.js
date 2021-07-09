import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";

import NestedMenuItem from "material-ui-nested-menu-item";

export const Drawer = ({position}) => {
  const [menuPosition, setMenuPosition] = useState({
    top: 100,
    left: 50,
  })
  const [open, setOpen] = useState(true);

  const [list,setList] = useState();
  useEffect( () => {
    const axiosList = async () => {
        const result = await axios.get("https://alconn.co/api/category/list");
        console.log("카테고리 출력");
        console.log(result);
        setList(result.data.data.cildCategory);
    }
    axiosList();
  },[])

  const handleClick = (event: React.MouseEvent) => {
    setOpen(null);
  }

  const menuClick = (e) => {
    console.log("좌표값");
    console.log(e.target.getBoundingClientRect().top);
    console.log(e.target.getBoundingClientRect().left);
  }

  const categoryList = (cild, num) => {
    if(num>=3)
        return;
    
    if(cild.cildCategory.length>0 && num<2)
      return (
          <NestedMenuItem onClick={handleClick} label={cild.categoryName} parentMenuOpen={open}>
              
              {
                  cild.cildCategory && cild.cildCategory.map( (row, idx) =>
                     categoryList(row, num+1)
                  )
              }

          </NestedMenuItem>
      )
    else 
      return (
        <MenuItem onClick={handleClick}>
         {cild.categoryName}

        </MenuItem>
      )
  }

  return (
    <div onClick={menuClick}>
        <Menu
        open={open}
        onClose={()=>setOpen(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
          {
              list && list.map( (row,idx) => 
                categoryList(row, 0)
              )
          }
      </Menu>
    </div>
  );
};

export default Drawer;