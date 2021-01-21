package com.przewodnik.release;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
public class UserBadgesTests {

    @Test
    void userExists() throws ClientProtocolException, IOException {
        //Given
        String name = RandomString.make(8);
        HttpUriRequest request = new HttpGet("http://localhost:8080/api/users/badges?email="+name);

        //When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);

        //Then
        assert(httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_NOT_FOUND);
    }

    @Test
    void userDataReturnType() throws ClientProtocolException, IOException {
        //Given
        String type = "application/json";
        HttpUriRequest request = new HttpGet("http://localhost:8080/api/users/badges?email=b.duda11@wp.pl");

        //When
        HttpResponse httpResponse =  HttpClientBuilder.create().build().execute(request);

        //Then
        String responseType = ContentType.getOrDefault(httpResponse.getEntity()).getMimeType();
        assert(type.equals(responseType));
    }
}
