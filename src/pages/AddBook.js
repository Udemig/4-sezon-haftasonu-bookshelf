import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    author: "",
    publisher: "",
    isbn: "",
    price: "",
    categoryId: categoriesState.categories[0].id,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* validation */
    if (form.name === "" || form.author === "" || form.categoryId === "") {
      alert("Kitap adı, Yazar alanı ve kategori alanı zorunludur");
      return;
    }
    if (form.name.length < 2) {
      alert("Kitap ismi 2 karakterden az olamaz");
      return;
    }

    /* request to api && dispatch store */
    api
      .post(urls.books, form)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.ADD_BOOK,
          payload: form,
        });
        navigate("/")
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
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Yalnızız"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Yazar
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Peyami Safa"
              value={form.author}
              onChange={(event) =>
                setForm({ ...form, author: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayın Evi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="Ötüken"
              value={form.publisher}
              onChange={(event) =>
                setForm({ ...form, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Fiyatı
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="69.70"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: Number(event.target.value) })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="number"
              className="form-control"
              id="isbn"
              placeholder="9789754370577"
              value={form.isbn}
              onChange={(event) =>
                setForm({ ...form, isbn: event.target.value })
              }
            />
          </div>
          <select
            className="form-select"
            defaultValue={categoriesState.categories[0].id}
            value={form.categoryId}
            onChange={(event) =>
              setForm({ ...form, categoryId: event.target.value })
            }>
            {categoriesState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
