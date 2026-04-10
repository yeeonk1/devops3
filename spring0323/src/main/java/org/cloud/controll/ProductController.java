package org.cloud.controll;

import java.io.File;
import java.util.List;

import org.cloud.dto.ProductDTO;
import org.cloud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/product")
public class ProductController {

	@Autowired	
	private ProductService productService;
	
	@GetMapping("/list")
	public String openProductList(Model model) throws Exception {
		List<ProductDTO> list = productService.productList();
		model.addAttribute("list", list);
		
		return "productList";
	}
	
	@GetMapping("/write")
	public String openProductWrite() throws Exception {
		return "productWriteUI";
	}
	
	@PostMapping("/insert")
	public String insertProduct(ProductDTO product) throws Exception {
		productService.insertProduct(product);
		return "redirect:/product/list";
	}
	
	@GetMapping("/detail")
	public String openProductDetail(@RequestParam("num") int num, Model model) throws Exception{
		
		ProductDTO product = productService.productDetail(num);
		model.addAttribute("product", product);
		
		return "productDetail";
	}
	
	@PostMapping("/update")
	public String updateProduct(ProductDTO product, @RequestParam(value = "file", required = false) MultipartFile file) throws Exception {
		
		if (file != null && !file.isEmpty()) {
			String projectPath = System.getProperty("user.dir"); //eclipse-workspace/spring0306, 실행위치를 의미한다.
			String savePath = projectPath + "/src/main/resources/static/uploads/";
			
			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			file.transferTo(new File(savePath + fileName));
			product.setStoredFilePath("/uploads/" + fileName);
		}
		
		productService.updateProduct(product);
		
		return "redirect:/product/list";
	}
	
	@PostMapping("/delete")
	public String deleteProduct(@RequestParam("num") int num) throws Exception {
		
		productService.deleteProduct(num);
		return "redirect:/product/list";
	}
}









