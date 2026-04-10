import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api/productApi";
import "./ProductWrite.css";

const ProductWrite: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: 0, amount: 0 });
  const [file, setFile] = useState<File | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", String(form.price));
    formData.append("amount", String(form.amount));

    if (file) {
      formData.append("file", file);
    }

    try {
      await productApi.insert(formData);
      alert("상품 등록 성공!!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("등록 중 에러 발생");
    }
  };

  return (
    <div className="write-page">
      <div className="write-card">
        <h2 className="write-title">상품 등록</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>상품명</label>
            <input
              className="write-input"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>가격</label>
            <input
              className="write-input"
              type="number"
              min={0}
              name="price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>수량</label>
            <input
              className="write-input"
              type="number"
              min={0}
              name="amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>이미지</label>
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <div className="write-button-group">
            <button type="submit" className="btn-submit">
              등록하기
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/")}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductWrite;
