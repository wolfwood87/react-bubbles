import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../axiosWithAuth'
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color)
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        updateColors([...colors, res.data])
      })
      .catch(err => {
        console.log(err.message);
      })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        console.log(res)
        colors.filter(name => (
          name != color,
          updateColors([name])
      ))
      })
      .catch(err => console.log(err.message))
  };


  //stretch functions
  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.name)
    if(e.target.name.includes('code')) {
      setNewColor({...newColor, [e.target.name] : { hex: e.target.value}})
    }
    else {
      setNewColor({...newColor, [e.target.name] : e.target.value})
    }
      
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth() 
      .post(`colors`, newColor)
      .then(res => {
        console.log(res)
        updateColors([...colors, newColor])
      })
      .catch(err => {
        console.log(err.message)
      })
  }
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
      <form onSubmit={handleSubmit}>
        <legend>Add Color</legend>
        <label>
          color name:
              <input 
                  type="text"
                  name="color"
                  value={newColor.color}
                  onChange={handleChange}
              />
        </label>
        <label>
          color hex:
              <input 
                type="text"
                name="code"
                value={newColor.code.hex}
                onChange={handleChange}
              />
        </label>
        <button type='submit' className="button-add">Add Color</button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
