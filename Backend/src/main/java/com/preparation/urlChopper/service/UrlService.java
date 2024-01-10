package com.preparation.urlChopper.service;

import com.preparation.urlChopper.models.Url;
import com.preparation.urlChopper.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    public Url addUrl(Url urlObj){
        return urlRepository.save(urlObj);
    }

    public boolean deleteUrl(String tinyKey) {
        try{
            Url url = urlRepository.findByTinyKey(tinyKey);
            urlRepository.delete(url);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public Url updateUrl(Url urlObj, String tinyKey){
        Url url = null;
        try {
            url = urlRepository.findByTinyKey(tinyKey);
            url.setFullURL(urlObj.getFullURL());
            url.setTinyKey(urlObj.getTinyKey());
            urlRepository.save(url);
            return url;
        }catch (Exception e){
            return url;
        }
    }

    public List<Url> findAllUrlsByUser() {
//        user token will be fetched from the JWT token and based on user all his specific URLs will be returned
        return urlRepository.findAll();
    }
}

