import * as React from 'react'
import TypesTab from './TypesTab'
import BrandsTab from './BrandsTab'
import {useState} from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AuthRedirectType} from "../../helpers/interface";
import {Nav, NavItem, NavLink, TabContent} from "reactstrap";

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
            <Nav tabs>
                <NavItem>
                    <NavLink
                        onClick={() => onTabClick(TabId.TYPES_TAB)}
                    >
                        Types
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => onTabClick(TabId.BRANDS_TAB)}
                    >
                        Brands
                    </NavLink>
                </NavItem>
            </Nav>

           
            <TabContent activeTab={activeTab}>
                {renderSwitch()}
            </TabContent>
        </div>
    )
}

export default compose(
    withAuthRedirect
)(AdminArea, '/403', AuthRedirectType.ADMIN_ROLE);