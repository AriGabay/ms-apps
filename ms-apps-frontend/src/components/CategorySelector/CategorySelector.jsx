import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../actions/photoActions';

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  setShowModal,
}) => {
  const dispatch = useDispatch();

  const categories = {
    '': 'Select a category',
    animals: 'Animals',
    sports: 'Sports',
    work: 'Work',
    backgrounds: 'Backgrounds',
    fashion: 'Fashion',
    nature: 'Nature',
    science: 'Science',
    education: 'Education',
    feelings: 'Feelings',
    health: 'Health',
    people: 'People',
    religion: 'Religion',
    places: 'Places',
    industry: 'Industry',
    computer: 'Computer',
    food: 'Food',
    transportation: 'Transportation',
    travel: 'Travel',
    buildings: 'Buildings',
    business: 'Business',
    music: 'Music',
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
    dispatch(setCategory(e.target.value));
    setShowModal(false);
  };

  return (
    <>
      <h3>Select a category</h3>
      <div className="controllers">
        <select onChange={handleCategorySelect} value={selectedCategory}>
          {Object.entries(categories).map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategorySelector;
