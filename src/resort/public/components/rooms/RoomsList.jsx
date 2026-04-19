import { Box } from "@mui/material";
import { useRoom } from "../../../providers/RoomProvider";
import RoomListSection from "./RoomListSection";
import { useEffect } from "react";

function RoomsList() {
  const { rooms, getRoomsFromServer } = useRoom();
  useEffect(() => {
    getRoomsFromServer();
  }, []);

  return (
    <Box sx={{ pb: { xs: 6, md: 10 } }}>
      {rooms.map((room, idx) => (
        <RoomListSection
          maxGuests={room.maxGuests}
          sizeM2={room.sizeM2}
          bedType={room.bedType}
          imgSrc={room.hero.url}
          imgTitle={room.hero.alt}
          title={room.title}
          blurb={room.blurb}
          category={room.category}
          priceLabel={room.priceBase}
          reverse={idx % 2 === 1}
          slug={room.slug}
        />
      ))}
    </Box>
  );
}

export default RoomsList;
