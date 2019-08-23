import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import axios from 'axios'


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log('THIS IS INSIDE COLOR LIST', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/:${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('Success!', res);
        let newColors = colors.map(e => {
          if (e.id === colorToEdit.id) {
            return e = res.data
          } else return e
        })
        updateColors(newColors)
      })
      .catch(err => {
        console.log('What is HAPPENING', err, err.response);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('This should be a color ID', color.id)
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/:${color.id}`)
      .then(res => {
        console.log('Deleted!', res);
        let newColors = colors.filter(e => e.id !== color.id)
        updateColors(newColors)
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                XXX
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
