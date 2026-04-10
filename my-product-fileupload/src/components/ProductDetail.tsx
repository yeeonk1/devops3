import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../api/productApi";
import type { ProductDTO } from "../types/Product";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<ProductDTO | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) productApi.getDetail(+id).then((res) => setDetail(res));
  }, [id]);

  const handleUpdate = async () => {
    if (!detail) return;

    const formData = new FormData();
    formData.append("num", String(detail.num));
    formData.append("name", detail.name);
    formData.append("price", String(detail.price));
    formData.append("amount", String(detail.amount));

    if (newFile) {
      formData.append("file", newFile);
    }

    try {
      await productApi.update(formData);
      alert("수정 성공!!");
      navigate("/"); //localhost:8080/api/product/list
    } catch (e) {
      console.error;
      alert("수정 실패!!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?") && detail) {
      try {
        await productApi.delete(detail.num);
        navigate("/");
      } catch (e) {
        alert("삭제 실패!!");
      }
    }
  };

  if (!detail)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>로딩 중...</div>
    );

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>상품 정보 상세</h2>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          {detail.storedFilePath && (
            <img
              src={`http://localhost:8080${detail.storedFilePath}`}
              alt="이미지 파일"
              style={{ width: "200px", borderRadius: "8px" }}
            />
          )}
        </div>
        <div className="form-group">
          <label>상품명</label>
          <input
            className="write-input"
            value={detail.name}
            onChange={(e) => setDetail({ ...detail, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>가격</label>
          <input
            className="write-input"
            type="number"
            value={detail.price}
            onChange={(e) => setDetail({ ...detail, price: +e.target.value })} //"1000" => +1000
          />
        </div>
        <div className="form-group">
          <label>수량</label>
          <input
            className="write-input"
            type="number"
            value={detail.amount}
            onChange={(e) => setDetail({ ...detail, amount: +e.target.value })} //"10" => +10
          />
        </div>
        <div className="form-group">
          <label>이미지 변경</label>
          <input
            type="file"
            onChange={(e) =>
              setNewFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <div
          className="button-group"
          style={{ display: "flex", gap: "10px", marginTop: "20px" }}
        >
          <button
            className="btn btn-list"
            onClick={() => navigate("/")}
            style={{ flex: 1 }}
          >
            목록
          </button>
          <button
            className="btn btn-update"
            onClick={handleUpdate}
            style={{
              flex: 1,
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
            }}
          >
            수정
          </button>
          <button
            className="btn btn-delete"
            onClick={handleDelete}
            style={{
              flex: 1,
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
