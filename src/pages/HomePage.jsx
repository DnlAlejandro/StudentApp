import { Grid } from "@mui/material";
import { CardInfo } from "../components/CardInfo";

const imageRegister =
    "https://leadgenapp.io/wp-content/uploads/2023/01/Online-Registartion-Systems.jpg";
const imageSummary =
    "https://wholeperson.healthcare/wp-content/uploads/2016/07/WoodenBlockswiththetextSummary-15-1024x667.jpg";
const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a sem et enim lobortis feugiat nec ut tellus. Integer bibendum eu lacus quis viverra. Phasellus efficitur sodales sagittis. Mauris venenatis leo nec libero auctor, in egestas quam dictum. Donec aliquam magna in velit dapibus tristique.";

export const HomePage = () => {
    return (
    <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} md={4} sx={{ m: 5 }}>
                    <CardInfo
                        image={imageRegister}
                        title="Register"
                        description={description}
                        button="/register"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ m: 5 }}>
                    <CardInfo
                        image={imageSummary}
                        title="Summary"
                        description={description}
                        button="/summary"
                    />
                </Grid>
            </Grid>
  )
}
