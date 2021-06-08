import * as React from 'react'
import TypesTab from './TypesTab'
import BrandsTab from './BrandsTab'
import {useState} from "react";

type AdminAreaProps = {};

enum TabId {
    TYPES_TAB = 0,
    BRANDS_TAB = 1,
}

function AdminArea(adminAreaProps: AdminAreaProps) {

    const [activeTab, setActiveTab] = useState(TabId.TYPES_TAB);

    function renderSwitch() {
        switch(activeTab) {
            case TabId.TYPES_TAB:
                return <TypesTab/>;
            case TabId.BRANDS_TAB:
                return <BrandsTab/>;
            default:
                return <TypesTab/>;
        }
    }

    function onTabClick(tabId: TabId)
    {
        setActiveTab(tabId);
    }
    
    return (
    <div>
        <span onClick={() => onTabClick(TabId.TYPES_TAB)}> TYPES </span>
        <span onClick={() => onTabClick(TabId.BRANDS_TAB)}> BRANDS </span>
        {renderSwitch()}
    </div>);
   
}

export default AdminArea;

// export default compose(
//     withAuthRedirect
// )(withConnect);