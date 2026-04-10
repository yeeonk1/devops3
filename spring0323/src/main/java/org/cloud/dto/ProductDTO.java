package org.cloud.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductDTO {

	private int num;
	private String name;
	private int price;
	private int amount;
	private String storedFilePath;
	private MultipartFile file;
}
