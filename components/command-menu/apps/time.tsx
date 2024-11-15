import { HiClock } from "react-icons/hi2";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import cityTimezones from "city-timezones";
import { useMemo } from "react";
import { CommandGroup } from "../types";

interface TimeCommandProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTimeCommand = ({
  searchQuery,
  setSearchQuery,
}: TimeCommandProps): CommandGroup => {
  const getTimeInTimezone = (timezone: string) => {
    const now = new Date();
    const zonedTime = toZonedTime(now, timezone);
    return format(zonedTime, "h:mm a");
  };

  const parseTimeQuery = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery.includes("time")) {
      const cityQuery = normalizedQuery
        .replace("time in", "")
        .replace("time at", "")
        .trim();

      const cityResults = cityTimezones.lookupViaCity(cityQuery);

      if (cityResults && cityResults.length > 0) {
        return cityResults.slice(0, 5).map((city) => ({
          id: `time-${city.city}`,
          name: `${city.city}, ${city.country}: ${getTimeInTimezone(city.timezone)}`,
          description: `Current time in ${city.city}`,
          icon: HiClock,
          action: async () => {
            await navigator.clipboard.writeText(
              getTimeInTimezone(city.timezone)
            );
          },
        }));
      }
    }
    return [];
  };

  const commands = useMemo(() => {
    const baseCommand = {
      id: "time",
      name: "Check time anywhere",
      description: "Try: time in tokyo or time in berlin",
      icon: HiClock,
      action: () => setSearchQuery("time in tokyo"),
    };

    const timeResults = parseTimeQuery(searchQuery);
    return timeResults.length > 0 ? timeResults : [baseCommand];
  }, [searchQuery, setSearchQuery]);

  return {
    name: "Time",
    commands,
  };
};
