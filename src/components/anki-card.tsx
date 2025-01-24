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
    <div>
      {isFront ? (
        <Card
          onClick={() => {
            setIsFront(!isFront);
          }}
        >
          <CardContent>{front}</CardContent>
        </Card>
      ) : (
        <Card
          onClick={() => {
            setIsFront(!isFront);
          }}
        >
          <CardContent>{back}</CardContent>
        </Card>
      )}
    </div>
  );
}
