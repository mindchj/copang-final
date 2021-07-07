import React from 'react'

const Payment = () => {
    return (
        <div className = "row payment align-items-center">
            <div className = "col">
                <h5>Payment Option</h5>
                <div className="form-check-inline">
                    <label className="form-check-label">신용카드</label>
                        <input type="radio" className="form-check-input" name="optradio" />
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">계좌이체</label>
                        <input type="radio" className="form-check-input" name="optradio" />
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">카카오페이</label>
                        <input type="radio" className="form-check-input" name="optradio" />
                </div>
            </div>
        </div>
    )
}

export default Payment
