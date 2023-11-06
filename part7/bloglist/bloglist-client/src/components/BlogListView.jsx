import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";

const BlogListView = (props) => {
	const { entries } = props;

	return (
		<Box sx={{ mt: 1}}>
			{entries.map((blog) => {
				return (
					<List key={blog.id}>
						<ListItem>
							<ListItemIcon>
								<EditNoteIcon fontSize="large"/>
							</ListItemIcon>
							<ListItemText
								primary=
								{
									<Link
										to={`/blogs/${blog.id}`}
									>{<Typography>{`${blog.title}`}</Typography>}</Link>
								}
								secondary={`by ${blog.author}`}
								>
							</ListItemText>
						</ListItem>
					</List>
				);
			})}
		</Box>
	);
};

export default BlogListView;
