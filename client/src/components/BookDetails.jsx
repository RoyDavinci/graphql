import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/query";
import { Link, useParams } from "react-router-dom";

const BookDetails = () => {
	const [book, setBook] = useState([]);
	const { id } = useParams();

	const { loading, data, error } = useQuery(getBookQuery, {
		variables: { id },
	});

	useEffect(() => {
		setBook(data);
	}, [data]);

	return (
		<div id='book-details'>
			<div id='book'>
				<h1>Book name:{book?.book?.name}</h1>
				<h3>Book Genre:{book?.book?.genre}</h3>
				<h1>Author Name:{book?.book?.author.name}</h1>
				<p>Author Age:{book?.book?.author.age}</p>
				<ul className='other-books'>
					Other Books By Author
					{book?.book?.author?.books.length > 0 ? (
						book?.book?.author?.books?.map((book) => {
							return <li key={book.id}>{book?.book?.book.name}</li>;
						})
					) : (
						<p>No other books written by Author</p>
					)}
				</ul>
			</div>
			<Link to='/'>All Books</Link>
		</div>
	);
};

export default BookDetails;
