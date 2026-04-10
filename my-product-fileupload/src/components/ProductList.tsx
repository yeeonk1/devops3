import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { productApi } from "../api/productApi";
import type { ProductDTO } from "../types/Product";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const navigate = useNavigate();
  const SERVER_URL = "http://localhost:8080";

  useEffect(() => {
    productApi.getList().then((res) => setProducts(res));
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">상품 목록</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.num}>
              <td>{p.num}</td>
              <td>
                {p.storedFilePath ? (
                  <img
                    src={`${SERVER_URL}${p.storedFilePath}`}
                    alt={p.name}
                    style={{ width: "50px", objectFit: "cover" }}
                  />
                ) : (
                  <span>이미지 없음</span>
                )}
              </td>
              <td>
                <Link className="title-link" to={`/product/${p.num}`}>
                  {p.name}
                </Link>
              </td>
              <td>{p.price.toLocaleString()}원</td>
              <td>{p.amount}개</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="btn-area">
        <button className="btn-write" onClick={() => navigate("/write")}>
          상품 등록
        </button>
      </div>
    </div>
  );
};

export default ProductList;
