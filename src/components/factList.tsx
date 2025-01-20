"use client";

import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Toggle } from "./ui/toggle";
import { Fact } from "@/core/get_week_info";
import { Checkbox } from "./ui/checkbox";

export default function FactList({ facts }: { facts: Array<Fact> }) {
  const [factsWithChecked, setFactsWithChecked] = useState(
    facts.map((fact) => ({ ...fact, checked: false }))
  );

  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const factsToShow = showOnlySelected
    ? factsWithChecked.filter((fact) => fact.checked)
    : factsWithChecked;

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
              className="self-start"
              onCheckedChange={() => {
                factsWithChecked[index].checked =
                  !factsWithChecked[index].checked;
                setFactsWithChecked(factsWithChecked);
              }}
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
