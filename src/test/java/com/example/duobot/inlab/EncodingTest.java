package com.example.duobot.inlab;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncodingTest {

    @Test
    public void testEncoding() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "inlab1";
        String hashedPassword = bCryptPasswordEncoder.encode(rawPassword);
        System.out.println(hashedPassword);
    }
    
}