import * as React from 'react'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

function AdminArea({}) {
    return (<h1>AdminArea</h1>);
}

export default compose(
    withAuthRedirect
)(AdminArea);

