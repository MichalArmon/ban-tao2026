import { Box } from "@mui/material";

import { useEffect } from "react";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import WorkshopListSection from "./WorkshopListSection";
WorkshopListSection;

function WorkshopList() {
  const { getWorkshopsFromServer, workshops } = useWorkshop();
  useEffect(() => {
    getWorkshopsFromServer();
  }, []);

  return (
    <Box sx={{ pb: { xs: 6, md: 10 } }}>
      {workshops.map((workshop, idx) => (
        <WorkshopListSection
          imgSrc={workshop.hero.url}
          imgTitle={workshop.hero.alt}
          title={workshop.title}
          description={workshop.description}
          category={workshop.category}
          price={workshop.price}
          reverse={idx % 2 === 1}
          level={workshop.level}
          intensity={workshop.intensity}
          bullets={workshop.bullets}
          workshopId={workshop._id}
          key={workshop._id}
        />
      ))}
    </Box>
  );
}

export default WorkshopList;
