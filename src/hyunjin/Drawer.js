import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";

import NestedMenuItem from "material-ui-nested-menu-item";

export const Drawer = () => {
  const menuPosition = { top:100, left:100 };
  const handleItemClick = () => {
    //setMenuPosition(null);
  };

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

  //cild 배열을 받아서 map으로 돌림
  const categoryList1 = (cild) => {
    return (
        <div>
            { 
                cild.cildCategory && cild.cildCategory.map( (row, idx) => 
                    {
                        return (<div key={idx}>{row.categoryName}{categoryList1(row)}</div>);
                    }
                )
            }
        </div>
    )
  }

  const categoryList = (cild, num) => {
    if(num>=3)
        return;
    
    if(cild.cildCategory.length>0)
      return (
          <NestedMenuItem label={cild.categoryName} parentMenuOpen={true}>
              
              {
                  cild.cildCategory && cild.cildCategory.map( (row, idx) =>
                     categoryList(row, num+1)
                  )
              }

          </NestedMenuItem>
      )
    else 
      return (
        <MenuItem>
         {cild.categoryName}

        </MenuItem>
      )
  }

  return (
    <div>
        <Menu
        open={true}
        onClose={() => {}}
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