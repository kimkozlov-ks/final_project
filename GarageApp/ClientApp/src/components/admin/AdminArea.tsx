import * as React from 'react'
import TypesTab from './TypesTab'
import BrandsTab from './BrandsTab'
import {useState} from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AuthRedirectType} from "../../helpers/interface";
import {Button, Nav, NavItem, NavLink, TabContent} from "reactstrap";
import {head} from "../../services/HttpClient";

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

    async function hangleUpdateBestVehiclesButton() {
        const url = process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/updatebest/'
        
        const res = await head(url);

        console.log(res);
        if(res.success){
            alert("Best vehicles are updated successfully")
        } else {
            alert("Best vehicles are not updated")
        }
    }

    return (
        <div>
            <Button 
                style={{position: "absolute", left: '20px'}}
                onClick={hangleUpdateBestVehiclesButton}
            >
                Update Best Vehicles
            </Button>
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