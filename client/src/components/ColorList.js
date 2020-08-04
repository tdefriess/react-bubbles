import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "#" }
};

let buttonStyle = {
  border: 'none',
  backgroundColor: 'black',
  color: 'white',
  padding: '3px 8px',
  marginTop: '16px'
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);  
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const toggleAdd = () => {
    setAdding(true);
  }

  const addColor = e => {
    e.preventDefault();
    let newColor = {
      color: colorToAdd.color,
      code: colorToAdd.code,
      id: Date.now()
    }
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        console.log('Add color:', res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            console.log('Bubbles response:', res)
            updateColors(res.data)
          })
          .catch(err => console.log('Bubbles error:', err));
      })
      .catch(err => console.log('Add error:', err));
    setAdding(false);
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log('Color ID:', colorToEdit)
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('Edit color:', res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            console.log('Bubbles response:', res)
            updateColors(res.data)
          })
          .catch(err => console.log('Bubbles error:', err));
      })
      .catch(err => console.log('Edit error:', err))
    setEditing(false);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color);
    axiosWithAuth(color)
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log('Delete:', res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            console.log('Bubbles response:', res)
            updateColors(res.data)
          })
          .catch(err => console.log('Bubbles error:', err));
      })
      .catch(err => console.log('Delete error:', err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {adding ?
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({...colorToAdd, color: e.target.value})
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input 
              onChange={e =>
                setColorToAdd({...colorToAdd, code: {hex: e.target.value}
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>:
        <button 
          onClick={toggleAdd}
          style={buttonStyle}
          >add color</button>
      }
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
