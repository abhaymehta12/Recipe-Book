import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { getStore, removeItem } from '../../utils';
import './style.css';

const Addrecipe = () => {
  const navigate = useNavigate();

  const { user, update } = useAuth();

  const [recipe, setState] = useState({
    recipe: {
      dish: '',
      ingredients: [],
      preparationsteps: [],
      image: '',
      imgName: '',
      additional: ''
    },
    imageName: '',
    chef: '',
    viewData: false
  });

  useEffect(() => {
    let data
    if (getStore('view')) {
      setState(prevState => ({
        ...prevState,
        viewData: true
      }));
      data = getStore('view')
    } else if (getStore('edit')) {
      data = getStore('edit')
    }

    if (data) {
      setState(prevState => ({
        ...prevState,
        recipe: {
          dish: data.dish,
          ingredients: data.ingredients,
          preparationsteps: data.preparationsteps,
          image: data.image,
          imgName: data.imgName,
          additional: data.additional,
        },
        chef: data.cook,
        imageName: data.imgName
      }))
    }
  }, []);

  const inputChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      recipe: {
        ...prevState.recipe,
        [name]: value
      }
    }));
  };

  const goToHome = (event) => {
    event.preventDefault();
    clearForm();
    navigate('/Recipe-Book/home');
  }

  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        recipe.recipe.image = e.target.result;
        setState(prevState => ({
          ...prevState,
          recipe: {
            ...prevState.recipe,
            imgName: file.name
          },
          imageName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  const removeImg = () => {
    recipe.recipe.image = ''
    recipe.recipe.imgName = ''
    setState(prevState => ({
      ...prevState,
      imageName: ''
    }));
  }

  const addRecipe = (event) => {
    event.preventDefault();
    if (!dish.trim()) {
      alert('Atleast provide a Dish Name');
      return;
    }
    recipe.recipe['cook'] = user.name;
    if (!viewData && chef) {
      let data = getStore('edit')
      let index = user.recipeList.findIndex((item) => item.dish === data.dish)
      user.recipeList[index] = recipe.recipe;
    } else {
      user.recipeList.push(recipe.recipe);
    }
    update(user);
    alert('Added Successfully !');
    clearForm();
  }

  const clearForm = () => {
    setState({
      recipe: {
        dish: '',
        ingredients: [],
        preparationsteps: [],
        image: '',
        additional: ''
      },
      imageName: '',
      chef: '',
      viewData: false
    })
    removeItem('edit');
    removeItem('view');
  }

  const { dish, ingredients, preparationsteps, additional } = recipe.recipe;
  const { imageName, viewData, chef } = recipe;

  return (
    <div className='container-fluid mt-2'>
      <form className='main-page' id='recipePage'>
        <div className='row'>
          <div className="col-6">
            <input
              type="text"
              value={dish}
              name="dish"
              onChange={inputChange}
              className="form-control"
              placeholder="Dish Name"
              disabled={viewData}
            />
          </div>
          {!viewData && <div className="col-6 uploadImage align-items-baseline">
            <label htmlFor='imageUpload' className='uplBox'>Upload Image</label>
            <input
              type="file"
              onChange={uploadImage}
              className="form-control d-none"
              accept='image/*'
              id='imageUpload'
            />
            <span className='ml-3'>{imageName}</span>
            {imageName && <i onClick={removeImg} className='fas fa-times'></i>}
          </div>}
          {chef && viewData && <div className="col-6 uploadImage align-items-baseline">
            <label className='recipeOwner'>By: {chef}</label>
          </div>}
        </div>

        <div className='row'>
          <div className="col-6">
            <textarea
              type="text"
              value={ingredients}
              name="ingredients"
              onChange={inputChange}
              className="form-control h370"
              placeholder="Ingredients"
              disabled={viewData}
            ></textarea>
          </div>
          <div className="col-6">
            <textarea
              type="text"
              value={preparationsteps}
              name="preparationsteps"
              onChange={inputChange}
              className="form-control h370"
              placeholder="Preparations"
              disabled={viewData}
            ></textarea>
          </div>
        </div>

        <div className="additionalWrap">
          <textarea
            type="text"
            value={additional}
            name="additional"
            onChange={inputChange}
            className="form-control"
            placeholder="Additional"
            disabled={viewData}
          ></textarea>
        </div>

        <div className="display-flex mt-3 bottomBtnWrap">
          <button type="submit" className="button" onClick={goToHome}>Home</button> {!viewData && <button type="submit" className="button" onClick={addRecipe}>Add Recipe</button>}
        </div>
      </form>
    </div>
  )
}

export default Addrecipe;
