import { useEffect } from "react";
import { useRecRule } from "../../../providers/RecRuleProvider";
import RecRuleCard from "./RecRuleCard";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import { Box, Typography, Stack } from "@mui/material";

function RecRuleDayCards({ day }) {
  const { getRecRulesFromServer, recRules } = useRecRule();
  const { getWorkshopsFromServer, workshops } = useWorkshop();

  useEffect(() => {
    if (!recRules) {
      getRecRulesFromServer();
    }

    if (!workshops || workshops.length === 0) {
      getWorkshopsFromServer();
    }
  }, []);

  const filterRulesByDay = (rulesArray) => {
    if (!rulesArray || !Array.isArray(rulesArray)) return [];

    return rulesArray.filter((rule) => {
      if (!rule.daysOfWeek || !Array.isArray(rule.daysOfWeek)) return false;

      return rule.daysOfWeek.includes(day);
    });
  };
  const rulesSunday = filterRulesByDay(recRules, 1);
  const getWorkshopTitle = (workshopId) => {
    const foundWorkshop = workshops?.find(
      (workshop) => workshop._id === workshopId,
    );

    return foundWorkshop ? foundWorkshop.title : "Loading title...";
  };
  const getWorkshopDuration = (workshopId) => {
    const foundWorkshop = workshops?.find(
      (workshop) => workshop._id === workshopId,
    );

    return foundWorkshop ? foundWorkshop.duration : "Loading title...";
  };

  if (!workshops) {
    return <Typography>is loading...</Typography>;
  }

  return (
    <Stack spacing={5}>
      {rulesSunday.map((rule) => (
        <RecRuleCard
          key={rule._id}
          workshopTitle={getWorkshopTitle(rule.workshopId)}
          ruleTime={rule.hour}
          location={rule.location}
          duration={getWorkshopDuration(rule.workshopId)}
        />
      ))}
    </Stack>
  );
}

export default RecRuleDayCards;
