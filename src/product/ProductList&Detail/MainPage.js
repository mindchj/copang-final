import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import "./Product.css";
import MainToday from "./MainToday";
import MainDoYouNeed from "./MainDoYouNeed";
import MainHotBook from "./MainHotBook";
import MainBanner from "./MainBanner";
import MainTodayDiscovery from "./MainTodayDiscovery";
import "../../mainpagekue.css";
import { Box, Typography } from "@material-ui/core";

const MainPage = ({ history }) => {
  let COMPUTER_CATEGORY_ID = 1083;

  const [Computer, setComputer] = useState([]);
  useEffect(() => {
    const res = async () => {
      const result = await axios.get(
        "https://alconn.co/api/item/list/categoryid=" + COMPUTER_CATEGORY_ID
      );
      setComputer(result.data.data);
      console.log(result.data);
    };
    res();
  }, []);

  return (
    <div>
      <div className="mainbanner">
        <MainBanner />
      </div>
      <div className="layout">
        <div className="MainTodayDiscoverykue">
          <MainTodayDiscovery history={history} />
        </div>
        <div className="MainTodaykue">
          <MainToday history={history} />
        </div>
        <div className="MainDoYouNeedkue">
          <MainDoYouNeed history={history} />
        </div>
        <div className="MainHotBookkue">
          <MainHotBook history={history} />
          {/* </Box> */}
          {/* <Box> */}
          {/* <Typography variant="h4" display="block" gutterBottom> */}
          {/* <strong style={{ fontSize: "20pt" }}>오늘의 쇼핑제안</strong> */}
          {/* </Typography> */}
          {/* </Box> */}
          {/* <Box> */}
          {/* <Typography variant="h4" display="block" gutterBottom> */}
          {/* </Typography> */}
          {/* </Box> */}
          {/* <Box> */}
          {/* <Typography variant="h4">요즘 뜨는 도서</Typography> */}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
