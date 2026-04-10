package org.cloud.controll;

import java.io.File;
import java.util.List;

import org.cloud.dto.ProductDTO;
import org.cloud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/product")
public class ProductApiController {

   @Autowired   
   private ProductService productService;
   
   @GetMapping("/list")
   public List<ProductDTO> openProductList() throws Exception {
      return productService.productList();
   }
   
   @PostMapping("/insert")
   public ResponseEntity<String> insertProduct(@ModelAttribute ProductDTO product) throws Exception {
      try {
         MultipartFile file = product.getFile();
         
         if (file != null && !file.isEmpty()) {
            String projectPath = System.getProperty("user.dir"); //eclipse-workspace/spring0306, 실행위치를 의미한다.
            String savePath = projectPath + File.separator + "src" + File.separator + "main" + 
                        File.separator + "resources" + File.separator + "static" + 
                        File.separator + "uploads" + File.separator;
            
            File saveDir = new File(savePath);
            if (!saveDir.exists()) {
               saveDir.mkdirs();
            }
            
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path path = java.nio.file.Paths.get(savePath + fileName).toAbsolutePath();
            
            file.transferTo(path);
            product.setStoredFilePath("/uploads/" + fileName);
         }
         
         productService.insertProduct(product);
         return ResponseEntity.ok("insert success");
      } catch (Exception e) {
         // TODO: handle exception
         e.printStackTrace();
         return ResponseEntity.status(500).body("Error: " + e.getMessage());
      }
   }
   
   @GetMapping("/detail/{num}")
   public ProductDTO openProductDetail(@PathVariable("num") int num) throws Exception{
      return productService.productDetail(num);
   }
   
   @PutMapping("/update")
   public ResponseEntity<String> updateProduct(@ModelAttribute ProductDTO product) throws Exception {
      MultipartFile file = product.getFile();
      
      if (file != null && !file.isEmpty()) {
         String projectPath = System.getProperty("user.dir"); //eclipse-workspace/spring0306, 실행위치를 의미한다.
         String savePath = projectPath + "/src/main/resources/static/uploads/";
         
         File saveDir = new File(savePath);
         if (!saveDir.exists()) {
            saveDir.mkdirs();
         }
         
         String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
         file.transferTo(new File(savePath + fileName));
         product.setStoredFilePath("/uploads/" + fileName);
      }
      
      productService.updateProduct(product);
      
      return ResponseEntity.ok("update success");
   }
   
   @DeleteMapping("/delete/{num}")
   public ResponseEntity<String> deleteProduct(@PathVariable("num") int num) throws Exception {
      productService.deleteProduct(num);
      return ResponseEntity.ok("delete success");
   }
}
