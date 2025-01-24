"use client";

import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Toggle } from "./ui/toggle";
import { Fact } from "@/core/get-week-info";
import { Checkbox } from "./ui/checkbox";
import { useAtom } from "jotai";
import { factsAtom } from "@/app/facts-storage";

export default function FactList({ facts }: { facts: Array<Fact> }) {
  const [factsToRemember, setFactsToRemember] = useAtom(factsAtom);

  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const factsToShow = showOnlySelected ? factsToRemember : facts;

  return (
    <>
      <div className="flex gap-8">
        <ModeToggle />
        <Toggle
          size="lg"
          aria-label="Toggle selected"
          onPressedChange={(pressed) => {
            setShowOnlySelected(pressed);
          }}
        >
          Show only selected
        </Toggle>
      </div>
      <div className="flex flex-col items-start">
        {factsToShow.map((fact, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`${index}`}
              checked={factsToRemember.some(
                (factToRemember) =>
                  fact.date === factToRemember.date &&
                  fact.factContent === factToRemember.factContent
              )}
              className="self-start"
              onCheckedChange={(checked) => {
                let newChecked = checked.valueOf();
                if (typeof newChecked === "string") {
                  newChecked = false;
                }

                const checkChangedFact = factsToShow[index];

                if (!newChecked) {
                  setFactsToRemember(
                    factsToRemember.filter((fact) => {
                      return (
                        fact.date != checkChangedFact.date ||
                        fact.factContent != checkChangedFact.factContent
                      );
                    })
                  );
                  return;
                }

                setFactsToRemember([...factsToRemember, checkChangedFact]);
              }}
              disabled={showOnlySelected}
            />
            <label htmlFor={`${index}`}>
              {fact.date} : {fact.factContent}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
