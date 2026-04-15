import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUser } from "../../../providers/UserProvider";

function RecRuleCard({ workshopTitle, ruleTime, location, duration }) {
  const { user } = useUser();
  return (
    <>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {ruleTime}
          </Typography>

          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {duration} min
          </Typography>
          <Typography variant="h5" component="div">
            {workshopTitle}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {location}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          {user.role !== "admin" ? (
            <Button size="small">Learn More</Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
}

export default RecRuleCard;
