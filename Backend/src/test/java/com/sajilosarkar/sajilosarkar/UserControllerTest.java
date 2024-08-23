package com.sajilosarkar.sajilosarkar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sajilosarkar.sajilosarkar.dto.UserDto;
import com.sajilosarkar.sajilosarkar.service.UserService;

public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void testRegisterUser() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setEmail("john.doe@example.com");

        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test image".getBytes());
        MockMultipartFile user = new MockMultipartFile("user", "", "application/json", new ObjectMapper().writeValueAsBytes(userDto));

        mockMvc.perform(multipart("/api/users/register")
                .file(user)
                .file(image)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }
    
}
