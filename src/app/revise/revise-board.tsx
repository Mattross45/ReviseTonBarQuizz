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
import AnkiCard from "@/components/anki-card";

export default function ReviseBoard() {
  const [factsToRemember] = useAtom(factsAtom);

  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {factsToRemember.map((fact, index) => (
            <CarouselItem key={index}>
              <AnkiCard front={fact.date} back={fact.factContent} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
