import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAllBooks } from "../queries/query";
import { Link } from "react-router-dom";

const BookList = () => {
	const [books, setBooks] = useState([]);

	const { loading, data, error } = useQuery(getAllBooks);
	useEffect(() => {
		setBooks(data);
	}, [data]);

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : error ? (
				<h1>{error}</h1>
			) : (
				<>
					<h1>Reading List</h1>
					{books?.books?.map((book) => {
						return (
							<ul className='book' id='book-list' key={book.id}>
								<li>
									<Link to={`/book/${book.id}`}>{book.name}</Link>
								</li>
							</ul>
						);
					})}
				</>
			)}
			<Link to='/addBook'>Add New Book</Link>
		</div>
	);
};

export default BookList;
