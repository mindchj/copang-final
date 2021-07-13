import React from "react";
import { withRouter } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import "./Product.css";

const ProductListRowItem = (props) => {
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let itemId = props.row.itemId;
  return (
    <>
    { itemId>1175 &&
    <div style={{ width: "23%", cursor: "pointer", marginRight: "2%" }}>
      <div
        className="RowItemList"
        onClick={() => {
          props.history.push("/product/selectOne/" + itemId);
        }}
        style={{
          minHeight: " 355px",
          marginTop: "10px",
          // transition: "ease-out",
        }}
      >
        <dl>
          <dt>
            <img
              alt={props.row.mainImg}
              src={props.row.mainImg}
              style={{ width: "100%", height: "200px" }}
            />
          </dt>
          <dd className="desc">
            <div>
              <div className="namedesc">
                <div className="name" style={{ fontSize: "12px" }}>
                  {props.row.itemName}
                </div>
              </div>
              <div className="price-area">
                <em className="sale">
                  <strong className="price-value">
                    {numberFormat(props.row.price)}
                  </strong>
                  원
                </em>
                {Math.round(props.row.averageRating) === 1 ? (
                  <div>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <span className="ReviewCount">
                      ({props.row.countReviews})
                    </span>
                  </div>
                ) : Math.round(props.row.averageRating) === 2 ? (
                  <div>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <span className="ReviewCount">
                      ({props.row.countReviews})
                    </span>
                  </div>
                ) : Math.round(props.row.averageRating) === 3 ? (
                  <div>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="emptyStar" />
                    <StarIcon className="emptyStar" />
                    <span className="ReviewCount">
                      ({props.row.countReviews})
                    </span>
                  </div>
                ) : Math.round(props.row.averageRating) === 4 ? (
                  <div>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="emptyStar" />
                    <span className="ReviewCount">
                      ({props.row.countReviews})
                    </span>
                  </div>
                ) : Math.round(props.row.averageRating) === 5 ? (
                  <div>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <StarIcon className="smstar"></StarIcon>
                    <span className="ReviewCount">
                      ({props.row.countReviews})
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </dd>
        </dl>
      </div>
      <hr />
    </div>
    }
    </>
  );
};

export default withRouter(ProductListRowItem);
