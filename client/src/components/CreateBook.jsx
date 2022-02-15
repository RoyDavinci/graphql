import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getAuthor, getAllBooks } from "../queries/query";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
	const ADD_BOOK = gql`
		mutation ($name: String!, $genre: String!, $authorId: ID!) {
			addBook(name: $name, genre: $genre, authorId: $authorId) {
				name
				id
				genre
			}
		}
	`;

	const [author, setAuthor] = useState([]);
	const [values, setValues] = useState({ name: "", genre: "", authorId: "" });
	const navigate = useNavigate();
	const { data } = useQuery(getAuthor);
	const [addBook, { loading, error }] = useMutation(ADD_BOOK);
	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBook({
			variables: {
				name: values.name,
				genre: values.genre,
				authorId: values.authorId,
			},
			refetchQueries: [{ query: getAllBooks }],
		});

		if (error) {
			console.log(error.clientErrors);
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		setAuthor(data);
	}, [data]);

	return (
		<form id='add-book' onSubmit={handleSubmit}>
			<div className='field'>
				<label htmlFor='name'>Book Name: </label>
				<input
					type='text'
					id='name'
					name='name'
					value={values.name}
					placeholder='Book Name'
					onChange={handleChange}
				/>
			</div>
			<div className='field'>
				<label htmlFor='genre'>Genre: </label>
				<input
					type='text'
					id='genre'
					name='genre'
					value={values.genre}
					placeholder='Genre'
					onChange={handleChange}
				/>
			</div>
			<div className='field'>
				<label htmlFor='author'>Author: </label>
				<select
					name=''
					id=''
					onChange={(e) => setValues({ ...values, authorId: e.target.value })}
				>
					<option>Select Author</option>
					{loading ? (
						<option value='' disabled>
							{loading}
						</option>
					) : (
						author?.authors?.map((author) => {
							return (
								<option value={author.id} name='authorId' key={author.id}>
									{author.name}
								</option>
							);
						})
					)}
				</select>
			</div>
			<button>Add Book</button>
		</form>
	);
};

export default CreateBook;
