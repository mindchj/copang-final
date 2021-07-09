import React from 'react';
import { withRouter } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import './Product.css';

const ProductListRowItem = (props) => {
    const numberFormat = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    let itemId = props.row.itemId
    return (
        <li
            onClick={
                () => {
                    props.history.push("/product/selectOne/" + itemId);
                }
            }>
            <dl>
                <dt>
                    <img alt={props.row.mainImg} src={props.row.mainImg} style={{ width: '230px', height: '230px' }} />
                </dt>
                <dd className="desc">
                    <div>
                        <div className="namedesc">
                            <div className="name">{props.row.itemName}</div>
                        </div>
                        <div className="price-area">
                            <em className="sale">
                                <strong className="price-value">{numberFormat(props.row.price)}</strong>원
                            </em>
                            {
                                Math.round(props.row.averageRating) === 1 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><span className="ReviewCount">({props.row.countReviews})</span></div>
                                    : Math.round(props.row.averageRating) === 2 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><span className="ReviewCount">({props.row.countReviews})</span></div>
                                        : Math.round(props.row.averageRating) === 3 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="emptyStar"/><StarIcon className="emptyStar"/><span className="ReviewCount">({props.row.countReviews})</span></div>
                                            : Math.round(props.row.averageRating) === 4 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="emptyStar"/><span className="ReviewCount">({props.row.countReviews})</span></div>
                                                : Math.round(props.row.averageRating) === 5 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><span className="ReviewCount">({props.row.countReviews})</span></div> : <div></div>
                            }
                        </div>
                    </div>
                </dd>
            </dl>
        </li>

    )
}

export default withRouter(ProductListRowItem);
