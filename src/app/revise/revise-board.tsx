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
import Link from "next/link";

export default function ReviseBoard() {
  const [factsToRemember] = useAtom(factsAtom);

  if (factsToRemember.length == 0)
    return (
      <div>
        No facts to remember go <Link href="/">here</Link> to choose some !
      </div>
    );

  return (
    <>
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
    </>
  );
}
