import BookList from "./components/BookList";
import CreateBook from "./components/CreateBook";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails";

const client = new ApolloClient({
	uri: "http://localhost:2900/graphql/1",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className='App' id='main'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<BookList />} />
						<Route path='/addBook' element={<CreateBook />} />
						<Route path='/book/:id' element={<BookDetails />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	);
}

export default App;
