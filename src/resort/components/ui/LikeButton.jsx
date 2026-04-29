import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Tooltip, Zoom } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useUser } from "../../providers/UserProvider";
import { useLoading } from "../../providers/LoadingProvider";

const LikeButton = ({ entityId, entityType }) => {
  const { favorites, handleLike } = useUser();
  const { loading } = useLoading();
  const isLiked = favorites?.[entityType]?.includes(entityId);

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    try {
      await handleLike(entityId, entityType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Tooltip מציג טקסט בריחופ עכבר
    <Tooltip
      title={isLiked ? "remove from favorites " : "save to favorites"}
      TransitionComponent={Zoom}
      arrow
    >
      <IconButton
        onClick={handleLikeClick}
        disabled={loading}
        sx={{
          color: isLiked ? "#f44336" : "inherit",
          // אנימציה עדינה למעבר הצבע
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },

          "&.Mui-disabled": {
            color: isLiked ? "#ffcdd2" : "inherit",
          },
        }}
      >
        {isLiked ? (
          // אם זה לייק - מציגים לב מלא
          <FavoriteIcon sx={{ fontSize: 32 }} />
        ) : (
          // אם לא - מציגים לב חלול
          <FavoriteBorderIcon
            sx={{ fontSize: 32, color: "text.secondary" }}
            color="text.secondary"
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
