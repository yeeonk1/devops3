import axios from "axios";
import { type ProductDTO } from "../types/Product";

const instance = axios.create({
  baseURL: "/api/product",
  headers: { "Content-Type": "application/json" },
});

export const productApi = {
  getList: () => instance.get<ProductDTO[]>("/list").then((res) => res.data),
  getDetail: (num: number) =>
    instance.get<ProductDTO>(`/detail/${num}`).then((res) => res.data),
  insert: (formdata: FormData) =>
    instance
      .post("/insert", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  update: (formdata: FormData) =>
    instance
      .put("/update", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  delete: (num: number) =>
    instance.delete(`/delete/${num}`).then((res) => res.data),
};

// Partial<>: 전체 속성을 옵션 프로퍼티로 취급
// <>타입의 모든 속성을 있어도 되고 없어도 되게끔 바꿔줌
// (모든 필드 뒤에 ?를 자동으로 붙여주는 느낌)

// FormData: 데이터와 파일을 한 바구니에 담아 보낼 때 사용하는 타입
