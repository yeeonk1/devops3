package org.cloud.dto;

import lombok.Data;

@Data
public class MemberDto {

	private String userId;
	private String password;
	private String userName;
	private String role;
}
