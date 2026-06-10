package com.portfolio.urlshortener.util;

import java.security.SecureRandom;

public class Base62 {
    private static final String CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = CHARSET.length();
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String encode(long num) {
        if (num == 0) return String.valueOf(CHARSET.charAt(0));
        StringBuilder s = new StringBuilder();
        while (num > 0) {
            s.insert(0, CHARSET.charAt((int) (num % BASE)));
            num /= BASE;
        }
        return s.toString();
    }

    public static long decode(String str) {
        long num = 0;
        for (char ch : str.toCharArray()) {
            num = num * BASE + CHARSET.indexOf(ch);
        }
        return num;
    }

    public static String generateRandomCode(int length) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < length; i++) {
            result.append(CHARSET.charAt(RANDOM.nextInt(BASE)));
        }
        return result.toString();
    }
}
