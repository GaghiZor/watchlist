import react from "react";
import Link from "next/link";
import { Constant } from "../../Constant";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Image from "next/image";

const MovieCardMUI = react.forwardRef(({ media }, ref) => {
  return (
    <Link href={`/movies/${media.id}`}>
      <a>
        <div ref={ref} className="w-auto h-auto m-6 bg-gray-700">
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={media.title} subheader={media.release_date}/>
            <div className="flex items-center justify-center">
              <div className="relative h-96 w-80">
                <Image
                  src={`${Constant.IMG_500}${media.poster_path}`}
                  alt={media.title}
                  layout="fill"
                />
              </div>
            </div>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {media.overview || "No description available"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon/>
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </a>
    </Link>
  );
});

export default MovieCardMUI;
