import { useQuery } from "@apollo/client";
import { USER_BOOKS } from "../queries";

import BookList from "./BookList";

const Recommendations = (props) => {

	const result = useQuery(USER_BOOKS);

	if (!props.show) {
		return null;
	}
	
	if (result.loading ) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>recommendations</h2>
			<BookList list={result.data.userBooks}/>
		</div>
	);
};

export default Recommendations;
