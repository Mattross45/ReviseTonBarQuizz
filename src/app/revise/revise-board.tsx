"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAtom } from "jotai";
import { factsAtom } from "../facts-storage";

export default function ReviseBoard() {
  const [factsToRemember] = useAtom(factsAtom);

  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {factsToRemember.map((fact, index) => (
            <CarouselItem key={index}>
              <p>{fact.date}</p>
              <p>{fact.factContent}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
