import { gql } from "@apollo/client";

const getAllBooks = gql`
	{
		books {
			id
			name
			genre
		}
	}
`;

const getAuthor = gql`
	{
		authors {
			id
			name
		}
	}
`;

const addBookMutation = gql`
	mutation ($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, author: $authorId) {
			name
			id
			genre
		}
	}
`;

const getBookQuery = gql`
	query ($id: String) {
		book(id: $id) {
			id
			name
			genre
			author {
				name
				id
				age
				books {
					name
					id
				}
			}
		}
	}
`;
export { getAuthor, getAllBooks, addBookMutation, getBookQuery };
