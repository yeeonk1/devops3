package org.cloud.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.cloud.dto.ProductDTO;

@Mapper
public interface ProductMapper {

	List<ProductDTO> productList() throws Exception;
	int insertProduct(ProductDTO product) throws Exception;
	ProductDTO productDetail(int num) throws Exception;
	int updateProduct(ProductDTO product) throws Exception;
	int deleteProduct(int num) throws Exception;
}
