import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { setStore } from '../../utils';
import './style.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, update } = useAuth();

  const [state, setState] = useState({
    search: '',
    list: user.recipeList || []
  });

  const { search, list } = state;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const inputChange = (event) => {
    const { value } = event.target;
    const searchValue = value.toLowerCase();

    let filtered = user.recipeList.filter((item) => {
      // Includes the search term (case-insensitive)
      const matchesDish = item.dish.toLowerCase().includes(searchValue);

      // Check if 'ingredients' is an array, handle if it's a string or array
      let matchesIngredients = false;

      if (Array.isArray(item.ingredients)) {
        // If it's an array, join the ingredients and check for the search term
        matchesIngredients = item.ingredients
          .join(' ')  // Join into a single string
          .toLowerCase()
          .includes(searchValue);
      } else if (typeof item.ingredients === 'string') {
        // If it's a string, directly check if it contains the search term
        matchesIngredients = item.ingredients.toLowerCase().includes(searchValue);
      }

      // Return true if either dish or ingredients matches the search term
      return matchesDish || matchesIngredients;
    });

    setState(prevState => ({
      ...prevState,
      search: value,
      list: filtered
    }));
  };

  const deleteRecipeform = (dish) => {
    let index = user.recipeList.findIndex((item) => item.dish === dish)
    user.recipeList.splice(index, 1)
    update(user)
    setState(prevState => ({
      ...prevState,
      list: user.recipeList
    }));
  }

  const editRecipeForm = (data) => {
    setStore('edit', data)
    navigate('/Recipe-Book/addrecipe')
  }

  const viewRecipeForm = (data) => {
    setStore('view', data)
    navigate('/Recipe-Book/addrecipe')
  }

  // Get current items to display based on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const recipes = currentItems.map((item, key) =>
    <tr key={key}><td className='imageWrap'>{item.image && <img className='image' src={item.image} alt='Foodie' />}{!item.image && <i className='fa fa-utensils'></i>}</td><td><div className='details'>Recipe Name: {item.dish}</div>
      <div className='details'>Kitchen Wizard: {item.cook}</div></td><td><div className='actionWrap'><i onClick={() => viewRecipeForm(item)} className="fas fa-eye"></i>{item.cook === user.name && <i onClick={() => editRecipeForm(item)} className="fas fa-edit"></i>}{item.cook === user.name && <i onClick={() => deleteRecipeform(item.dish)} className="fas fa-trash"></i>}</div></td></tr>
  );

  // Calculate total pages
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container-fluid mt-2'>
      <div className='main-page'>
        <div className='searchWrap'><input onChange={inputChange} placeholder='Search' value={search} className='search form-control' /></div>
        <table className='table mt-2' id='recipe-table' cellSpacing="0">
          <thead>
            <tr>
              <th>Image</th>
              <th>In brief</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{recipes}</tbody>
        </table>
        {/* Pagination Controls */}
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} mr-auto`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>
                First
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Home;