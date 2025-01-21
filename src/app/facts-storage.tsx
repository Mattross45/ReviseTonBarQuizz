import { Fact } from "@/core/get_week_info";
import { atomWithStorage } from "jotai/utils";

export const factsAtom = atomWithStorage<Array<Fact>>("facts", []);
