import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";
import axios from "axios";

const MainToday = ({ history }) => {
  let FURNITURE_CATEGORY_ID = 1039;
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [Furniture, setFuniture] = useState([]);
  useEffect(() => {
    const res = async () => {
      const result = await axios.get(
        "https://alconn.co/api/item/list/categoryid=" + FURNITURE_CATEGORY_ID
      );
      setFuniture(result.data.data);
      console.log(result.data);
    };
    res();
  }, []);

  return (
    <React.Fragment>
      <strong style={{ fontSize: "20pt" }}>오늘의 쇼핑제안</strong>
      {Furniture &&
        Furniture.map((row, idx) => {
          if (idx >= 5) return;
          else
            return (
              <div>
                <ul
                  className="searchproduct"
                  style={{
                    listStyle: "none",
                    margin: "0",
                    padding: "0",
                    float: "left",
                  }}
                >
                  <li className="todayShoping"
                    row={row}
                    key={idx}
                    style={{
                      marginRight: "25px",
                      width: "230px",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push(
                        "/product/selectOne/" +
                          row.itemId
                      );
                    }}
                  >
                    <dl style={{ marginTop: "0", marginBottom: "16px;" }}>
                      <dt>
                        <img
                          alt={row.mainImg}
                          src={row.mainImg}
                          style={{ width: "230px", height: "230px" }}
                        />
                      </dt>
                      <dd className="desc">
                        <div>
                          <div className="namedesc">
                            <div className="name" style={{ width: "230px" }}>
                              {row.itemName}
                            </div>
                          </div>
                          <div className="price-area">
                            <em className="sale">
                              <strong className="price-value">
                                {numberFormat(row.price)}
                              </strong>
                              원
                            </em>
                            {Math.round(row.averageRating) === 1 ? (
                              <div>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <span className="ReviewCount">
                                  ({row.countReviews})
                                </span>
                              </div>
                            ) : Math.round(row.averageRating) === 2 ? (
                              <div>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <span className="ReviewCount">
                                  ({row.countReviews})
                                </span>
                              </div>
                            ) : Math.round(row.averageRating) === 3 ? (
                              <div>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="emptyStar" />
                                <StarIcon className="emptyStar" />
                                <span className="ReviewCount">
                                  ({row.countReviews})
                                </span>
                              </div>
                            ) : Math.round(row.averageRating) === 4 ? (
                              <div>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="emptyStar" />
                                <span className="ReviewCount">
                                  ({row.countReviews})
                                </span>
                              </div>
                            ) : Math.round(row.averageRating) === 5 ? (
                              <div>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <StarIcon className="smstar"></StarIcon>
                                <span className="ReviewCount">
                                  ({row.countReviews})
                                </span>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            );
        })}
    </React.Fragment>
  );
};

export default MainToday;
