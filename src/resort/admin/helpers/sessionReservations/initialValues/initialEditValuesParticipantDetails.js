export default function initialEditParticipantDetailsValues(
  participantDetails,
) {
  const initialEditParticipantDetailsValuesOBJ = {
    level: participantDetails?.level || "",
    goals: participantDetails?.goals || [],
    injuriesNotes: participantDetails?.injuriesNotes || "",
    extras: participantDetails?.extras || [],
    instructorNotes: participantDetails?.instructorNotes || "",
  };

  return initialEditParticipantDetailsValuesOBJ;
}
