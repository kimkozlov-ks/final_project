import React, {useEffect, useState} from 'react'
import {VehiclePage} from "../../helpers/interface";
import VehicleCard from "../vehicle/VehicleCard";
import {get, post} from "../../services/HttpClient";
import {Container, Pagination, PaginationItem, PaginationLink, Row} from "reactstrap";

type Props = {
    baseUrl: string
    pageUrl?: string
    isVoteEnabled: boolean
}

const emptyPage: VehiclePage = {
    vehicles: [],
    pageViewModel:{
        pageNumber: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    },
    votedVehicles: []
}

const VehicleList: React.FC<Props> = ({
    baseUrl, 
    pageUrl,
    isVoteEnabled
}) => {
    
    const [page, setPage] = useState<VehiclePage>(emptyPage)
    const [pageNumber, setPageNumber] = useState(1)
    
    async function fetchVehicles(url: string) {
        const result = await get(url);

        if(result.success){
            setPage(result.body)
        }
    }
    
    
    useEffect(() => {
        const url = baseUrl + 'page=' + pageNumber + '&size=3'
        console.log(url);
        fetchVehicles(url).then().catch()
    }, [pageNumber, baseUrl])

    function render() {
        return page.vehicles.map(vehicle => (
            // @ts-ignore
            <VehicleCard 
                isVoteEnabled={isVoteEnabled} 
                isVoted={page.votedVehicles ? !page.votedVehicles.includes(vehicle.id) : false }
                incrementRating={() => setPageNumber(pageNumber)} 
                vehicle={vehicle}
            /> )
        )
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
                <PaginationLink href={pageUrl || "#"} value={pageNumber} onClick={handlePageClick}>
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
                <PaginationLink first href={pageUrl || "#"}/>
            </PaginationItem>
            <PaginationItem disabled={page.pageViewModel.pageNumber === 1} onClick={() => {
                if(pageNumber > 1)
                    setPageNumber(pageNumber - 1)
            }}>
                <PaginationLink previous href={pageUrl || "#"} />
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
                <PaginationLink next href={pageUrl || "#"} />
            </PaginationItem>
            <PaginationItem disabled={page.pageViewModel.pageNumber === page.pageViewModel.totalPages} onClick={() => setPageNumber(page.pageViewModel.totalPages)}>
                <PaginationLink last href={pageUrl || "#"} />
            </PaginationItem>
            </Pagination>
        </>
    )
}
            

export default VehicleList;