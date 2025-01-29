import { getNextMondayMidnight } from "@/core/date-utils";
import { Fact } from "@/core/get-week-info";
import { atomWithStorage } from "jotai/utils";

const create_facts_atom = () => {
  const factsAtom = atomWithStorage<Array<Fact>>("facts", []);
  factsAtom.unstable_onInit = () => {
    if (typeof window == "undefined") return;
    const now = new Date().getTime();
    const reset_time = localStorage.getItem("facts_reset_timestamp");

    if (reset_time != null) {
      const momentWhenToReset = getNextMondayMidnight(new Date()).getTime();
      localStorage.setItem(
        "facts_reset_timestamp",
        JSON.stringify(momentWhenToReset)
      );
    }

    if (reset_time != null && now > JSON.parse(reset_time)) {
      localStorage.removeItem("facts");
      const momentWhenToReset = getNextMondayMidnight(new Date()).getTime();
      localStorage.setItem(
        "facts_reset_timestamp",
        JSON.stringify(momentWhenToReset)
      );
    }
  };
  return factsAtom;
};

export const factsAtom = create_facts_atom();
