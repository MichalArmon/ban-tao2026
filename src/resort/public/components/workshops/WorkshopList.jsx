import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import WorkshopListSection from "./WorkshopListSection";

function WorkshopList() {
  const { getWorkshopsFromServer, workshops } = useWorkshop();

  useEffect(() => {
    getWorkshopsFromServer();

    // Fetch the workshops when the list mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minWidth: 0,
        overflowX: "clip",
        pb: { xs: 5, sm: 7, md: 10 },
      }}
    >
      {workshops.length === 0 ? (
        <Container maxWidth="lg">
          <Typography
            sx={{
              py: { xs: 6, md: 9 },
              textAlign: "center",
              color: "text.secondary",
              fontSize: 15,
            }}
          >
            No workshops available at the moment.
          </Typography>
        </Container>
      ) : (
        workshops.map((workshop, idx) => (
          <Box key={workshop._id}>
            <WorkshopListSection
              imgSrc={workshop.hero?.url}
              imgTitle={workshop.hero?.alt}
              title={workshop.title}
              description={workshop.description}
              category={workshop.category}
              price={workshop.price}
              reverse={idx % 2 === 1}
              level={workshop.level}
              intensity={workshop.intensity}
              bullets={workshop.bullets}
              workshopId={workshop._id}
              slug={workshop.slug}
            />

            {idx < workshops.length - 1 && (
              <Container maxWidth="lg">
                <Divider
                  sx={{
                    borderColor: "divider",
                    mx: { xs: 0, md: 2 },
                    opacity: 0.65,
                  }}
                />
              </Container>
            )}
          </Box>
        ))
      )}
    </Box>
  );
}

export default WorkshopList;
