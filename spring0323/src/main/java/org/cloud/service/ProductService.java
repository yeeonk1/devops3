package org.cloud.service;

import java.util.List;

import org.cloud.dto.ProductDTO;
import org.springframework.stereotype.Service;

public interface ProductService {

	List<ProductDTO> productList() throws Exception;
	int insertProduct(ProductDTO product) throws Exception;
	ProductDTO productDetail(int num) throws Exception;
	int updateProduct(ProductDTO product) throws Exception;
	int deleteProduct(int num) throws Exception;
}
