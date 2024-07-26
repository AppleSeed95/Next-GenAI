'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Image from "next/image"
import DownloadImageIcon from "./image-download"
import RegenerateImageIcon from "./image-regnerate"


type Props = {
   initialImageUrl: string,
   imageURL: string[],
}


export function CarouselImage(props: Props) {

   return (
      <Carousel showArrows={true} showThumbs={false}>
         {props.imageURL.map((url, index) => (
            <div className="relative w-auto h-auto" key={index}>
               <Image
                  src={url}
                  layout="intrinsic"
                  width={1024}
                  height={1024}
                  alt="Picture of the author"
                  className="z-0 rounded-lg"
               />
               <div className={''}>
                  <div className={"flex flex-row gap-16 justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 p-0"}>
                     <DownloadImageIcon imageUrl={url} fileName="downloadfile" />
                     <RegenerateImageIcon initialImageUrl={props.initialImageUrl} />
                  </div>
               </div>
            </div>
         ))}
      </Carousel>
   )
}