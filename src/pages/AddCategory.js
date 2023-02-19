import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "") {
      alert("Kategori adı boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("Böyle bir kategori zaten mevcut");
      return;
    }
    api
      .post(urls.categories, form)
      .then((res) => {
        dispatch({type: actionTypes.categoryActions.ADD_CATEGORY,payload:form})
        navigate("/list-categories")
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategori Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Roman"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
