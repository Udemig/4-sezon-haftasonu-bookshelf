import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [willDeleteCategory, setWillDeleteCategory] = useState("");
  const deleteCategory = (id) => {
    api
      .delete(`${urls.categories}/${id}`)
      .then((resCat) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CATEGORY,
          payload: id,
        });
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,
          payload: id,
        });
      })
      .catch((err) => {});
    setOpenDeleteModal(false);
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Link className="btn btn-primary" to={"/add-category"}>
            Kategori Ekle
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sıra No</th>
              <th scope="col">Kategori Adı</th>
              <th scope="col">Kayıtlı Kitap Sayısı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.length === 0 && (
              <tr>
                <td colSpan={4}>Kayıtlı kategori yok</td>
              </tr>
            )}
            {categoriesState.categories.length > 0 && (
              <>
                {categoriesState.categories.map((category, index) => {
                  const books = booksState.books.filter(
                    (item) => item.categoryId === category.id
                  );
                  return (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>{books.length}</td>
                      <td>
                        <button
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setWillDeleteCategory(category.id);
                          }}
                          className="btn btn-sm btn-danger">
                          Sil
                        </button>
                        <Link
                          className="btn btn-sm btn-secondary"
                          to={`/edit-category/${category.id}`}>
                          Güncelle
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      {openDeleteModal === true && (
        <CustomModal
          title="Kategori Silme"
          message="Kategori ile beraber ilgili bütün kitaplar da silinecektir. Bu işlemi yapmak istediğinize emin misiniz?"
          onCancel={() => setOpenDeleteModal(false)}
          onConfirm={() => deleteCategory(willDeleteCategory)}
        />
      )}
    </div>
  );
};

export default ListCategories;
