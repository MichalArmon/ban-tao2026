import { Box } from "@mui/material";

import { useEffect } from "react";
import { useTreatment } from "../../../providers/TreatmentProvider";
import TreatmentListSection from "./TreatmentListSection ";

function TreatmentList() {
  const { getTreatmentsFromServer, treatments } = useTreatment();
  useEffect(() => {
    getTreatmentsFromServer();
  }, []);

  return (
    <Box sx={{ pb: { xs: 6, md: 10 } }}>
      {treatments.map((treatment, idx) => (
        <TreatmentListSection
          imgSrc={treatment.hero.url}
          imgTitle={treatment.hero.alt}
          title={treatment.title}
          description={treatment.description}
          category={treatment.category}
          price={treatment.price}
          reverse={idx % 2 === 1}
          level={treatment.level}
          intensity={treatment.intensity}
          bullets={treatment.bullets}
        />
      ))}
    </Box>
  );
}

export default TreatmentList;
