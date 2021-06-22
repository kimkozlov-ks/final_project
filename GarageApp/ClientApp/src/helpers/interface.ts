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

export interface Vehicle {
    id: string
    userId: string
    nickname: string
    typeId: number
    subTypeId: number
    brandId: number
    modelId: number
    description: string
    image: string
    createDate: string
    rating: number
}