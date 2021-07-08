import React from 'react';
import './Product.css';

const MainPage = () => {
    return(
        <div style={{width:'100%',height:'100%'}}>
            <ul className="MainImage" style={{float:'left'}}>
                <li><img style={{width:'400px',height:'500px'}} alt="" src="https://static.alconn.co/image/984ade40-745d-4138-9997-c7fda3493f2e"/></li>
                <li><img style={{width:'600px',height:'250px'}} alt="" src="https://static.alconn.co/image/00130026-b9fe-45a9-a5eb-732f016c246d"/></li>
                <li><img style={{width:'250px',height:'250px'}} alt="" src="https://static.alconn.co/image/b43e2172-05d0-4bfe-a38c-6360325973de"/></li>
                <li><img style={{width:'250px',height:'250px'}} alt="" src="https://static.alconn.co/image/03ae243d-dff0-43c7-8f98-b2489e7c6a40"/></li>
                <li><img style={{width:'600px',height:'250px'}} alt="" src="https://static.alconn.co/image/d40b17f5-8dd5-4b56-b3f4-842f31338492"/></li>
                <li><img style={{width:'620px',height:'500px'}} alt="" src="https://static.alconn.co/image/11904a7c-b750-4fce-89e1-8ecf78e2cf58"/></li>
                <li><img style={{width:'620px',height:'500px'}}alt="" src="https://static.alconn.co/image/d24bcb83-01fc-445a-8139-4a0159b9ad6d"/></li>
            </ul>
        </div>
    )
}

export default MainPage;