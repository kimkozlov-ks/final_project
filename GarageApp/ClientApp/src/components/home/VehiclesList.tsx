import React, {useEffect, useState} from 'react'
import {VehiclePage} from "../../helpers/interface";
import VehicleFC from "../garage/Vehicle";
import {get} from "../../services/HttpClient";
import {Container, Pagination, PaginationItem, PaginationLink, Row} from "reactstrap";

const emptyPage: VehiclePage = {
    vehicles: [],
    pageViewModel:{
        pageNumber: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    }
}

const VehicleList: React.FC<{}> = () => {
    
    const [page, setPage] = useState<VehiclePage>(emptyPage)
    const [pageNumber, setPageNumber] = useState(1)

    async function fetchVehicles() {

        const result = await get(process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle?' + 'page=' + pageNumber + '&size=3');

        if(result.success){
            setPage(result.body)
        }
    }
    
    useEffect(() => {
        fetchVehicles().then(r => r).catch()
    }, [pageNumber])

    function render() {
        return page.vehicles.map(vehicle => <VehicleFC incrementRating={() => setPageNumber(pageNumber)} vehicle={vehicle}/>)
    }

    function renderPaginationItems() {
        let startPageNumber = page.pageViewModel.pageNumber - 2
        if(startPageNumber < 1) startPageNumber = 1
        let visiblePagesNumbers: number[] = []
        while (startPageNumber + visiblePagesNumbers.length <= page.pageViewModel.totalPages &&
        visiblePagesNumbers.length < 4) {
            visiblePagesNumbers.push(startPageNumber + visiblePagesNumbers.length)
        }

        return visiblePagesNumbers.map(pageNumber =>   
            <PaginationItem active={pageNumber === page.pageViewModel.pageNumber}>
                <PaginationLink href="#" value={pageNumber} onClick={handlePageClick}>
                    {pageNumber}
                 </PaginationLink>
            </PaginationItem>)
    }

    function handlePageClick(event: any) {
        setPageNumber(event.target.innerHTML)
    }
    
    return (
        <>
        <Container>
            <Row xs="3">
            {
                render()
            }        
            </Row>  
        </Container>
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={page.pageViewModel.pageNumber === 1} onClick={() => setPageNumber(1)}>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled={page.pageViewModel.pageNumber === 1} onClick={() => {
                if(pageNumber > 1)
                    setPageNumber(pageNumber - 1)
            }}>
                <PaginationLink previous href="#" />
            </PaginationItem>
                {
                    renderPaginationItems()
                }
            <PaginationItem 
                disabled={page.pageViewModel.pageNumber === page.pageViewModel.totalPages} 
                onClick={() => {
                    if(pageNumber < page.pageViewModel.totalPages)
                        setPageNumber(pageNumber + 1)}
                }>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem disabled={page.pageViewModel.pageNumber === page.pageViewModel.totalPages} onClick={() => setPageNumber(page.pageViewModel.totalPages)}>
                <PaginationLink last href="#" />
            </PaginationItem>
            </Pagination>
        </>
    )
}
            

export default VehicleList;