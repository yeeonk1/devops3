package org.cloud.service;

import java.io.File;
import java.util.List;

import org.cloud.dto.ProductDTO;
import org.cloud.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductMapper productMapper;
	
	@Override
	public List<ProductDTO> productList() throws Exception {
		// TODO Auto-generated method stub
		return productMapper.productList();
	}
	
	@Override
	public int insertProduct(ProductDTO product) throws Exception {
		// TODO Auto-generated method stub
		
		MultipartFile file = product.getFile();
		if (file != null && !file.isEmpty()) {
			String savePath = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";
			File folder = new File(savePath);
			if (!folder.exists()) {
				folder.mkdirs();
			}
			
			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			file.transferTo(new File(savePath + fileName));
			product.setStoredFilePath("/uploads/" + fileName);
		}
		
		productMapper.insertProduct(product);
		return 0;
	}
	
	@Override
	public ProductDTO productDetail(int num) throws Exception {
		// TODO Auto-generated method stub
		ProductDTO product = productMapper.productDetail(num);
		return product;
	}
	
	@Override
	public int updateProduct(ProductDTO product) throws Exception {
		// TODO Auto-generated method stub
		productMapper.updateProduct(product);
		return 0;
	}
	
	@Override
	public int deleteProduct(int num) throws Exception {
		// TODO Auto-generated method stub
		productMapper.deleteProduct(num);
		return 0;
	}
}





