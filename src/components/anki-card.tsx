"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";

export default function AnkiCard({
  front,
  back,
}: {
  front: string;
  back: string;
}) {
  const [isFront, setIsFront] = useState(true);

  return (
    <div className="text-center">
      <Card
        onClick={() => {
          setIsFront(!isFront);
        }}
      >
        <CardContent className="text-center">
          {isFront ? front : back}
        </CardContent>
      </Card>
    </div>
  );
}
