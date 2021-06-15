import {Vehicle} from "../components/garage/interface";

export interface VehiclePage {
    "vehicles": Vehicle[]
    "pageViewModel": {
        "pageNumber": number,
        "totalPages": number,
        "hasPreviousPage": boolean,
        "hasNextPage": boolean
    }
}

export interface Vote {
    power: number,
    vehicleId: string
}