export interface ProductDTO {
  num: number;
  name: string;
  price: number;
  amount: number;
  storedFilePath?: string;
  file?: File;
}

export type ProductCreateRequest = Omit<ProductDTO, "num" | "storedFilePath">;
