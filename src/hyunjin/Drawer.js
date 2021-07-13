import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon, Menu, MenuItem, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { withRouter } from "react-router";
import { borderRadius, fontSize } from "@material-ui/system";

export const Drawer = ({ position, history }) => {
  const [refresh, setRefresh] = useState(0);
  const [menuPosition, setMenuPosition] = useState({
    top: 100,
    left: 50,
  });
  const [open, setOpen] = useState(true);

  const [list, setList] = useState();
  useEffect(() => {
    const axiosList = async () => {
      const result = await axios.get("https://alconn.co/api/category/list");
      console.log("카테고리 출력");
      console.log(result);
      setList(result.data.data.cildCategory);
    };
    axiosList();
  }, []);

  // const handleClick = async (event: React.MouseEvent) => {
  const handleClick = async (categoryId) => {
    // setOpen(null);
    console.log(categoryId);
    // const result = await axios.get("https://alconn.co/api/item/list/categoryid="+categoryId);
    console.log(history);
    setRefresh((prev) => prev + 1);
    history.push("/product/category/" + categoryId, refresh);
  };

  const menuClick = (e) => {
    console.log("좌표값");
    setOpen(true);
    console.log(e.target.getBoundingClientRect().top);
    console.log(e.target.getBoundingClientRect().left);
  };

  const categoryList = (cild, num) => {
    if (num >= 3) return;

    if (cild.cildCategory.length > 0 && num < 2)
      return (
        <NestedMenuItem
          label={cild.categoryName}
          parentMenuOpen={open}
          onClick={() => {
            handleClick(cild.categoryId);
          }}
        >
          {cild.cildCategory &&
            cild.cildCategory.map((row, idx) => categoryList(row, num + 1))}
        </NestedMenuItem>
      );
    else
      return (
        <MenuItem
          onClick={() => {
            handleClick(cild.categoryId);
          }}
          // onMouseLeave={()=>setOpen}
        >
          {cild.categoryName}
        </MenuItem>
      );
  };

  return (
    <div onMouseEnter={menuClick}>
      <NestedMenuItem
        parentMenuOpen={true}
        // onMouseEnter={()=>{setOpen(true)}}
        className="9999999"
        rightIcon="≡"
        style={{
          backgroundColor: "white",
          borderRadius: "25%",
          fontSize: "55px",
          color: "black",
        }}
      >
        {list && list.map((row, idx) => categoryList(row, 0))}
      </NestedMenuItem>
    </div>
  );
};

export default withRouter(Drawer);
