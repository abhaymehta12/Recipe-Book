import React, { Component } from 'react';
import recipeList from '../../mock/recipes.json';
import './style.css';

export class Home extends Component {
  render() {
    const recipes = recipeList.recipes.map((item, key) =>
      <tr key={key}><td className='imageWrap'><img className='image' src={item.image} alt='Foodie' /></td><td><div className='details'>Recipe Name: {item.dish}</div>
        <div className='details'>Kitchen Wizard: {item.cook}</div></td><td><div className='actionWrap'><i className="fas fa-eye"></i><i className="fas fa-edit"></i><i className="fas fa-trash"></i></div></td></tr>
    );
    return (
      <div className='container'>
        <div className='tableWrap'>
          <table className='table' id='recipe-table' cellSpacing="0">
            <thead>
              <tr>
                <th>Image</th>
                <th>In brief</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{recipes}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Home;