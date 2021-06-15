import React, {useState} from "react";
import {
    Card,
    CardBody,
    CardImg,
    Carousel,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
    CarouselItem
} from "reactstrap";
import {Vehicle} from "../../helpers/interface";

const BestVehicle: React.FC<{}> = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [items, setItems] = useState([])
    
    useState(() =>{
        
    })

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    
    const slides = items.map((vehicle: Vehicle) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={vehicle.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <CarouselCaption className="text-danger" captionText={vehicle.nickname} captionHeader={'test'} />
            </CarouselItem>
        );
    });
    
    return(
        <div>
            <style>
                {
                    `.custom-tag {
              max-width: 100%;
              height: 500px;
              background: black;
            }`
                }
            </style>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    )
}

export default BestVehicle