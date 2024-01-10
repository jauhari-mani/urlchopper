package com.preparation.urlChopper.controller;

import com.preparation.urlChopper.models.Url;
import com.preparation.urlChopper.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/url")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @GetMapping
    private ResponseEntity<List<Url>> getAllUrl(){
        return new ResponseEntity<>(urlService.findAllUrlsByUser(), HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<Url> saveUrl(@RequestBody Url url) {
        return new ResponseEntity<>(urlService.addUrl(url), HttpStatus.CREATED);
    }

    @PutMapping("/{tinyKey}")
    private ResponseEntity<Url> updateUrl(@PathVariable String tinyKey, @RequestBody Url url){
        return new ResponseEntity<>(urlService.updateUrl(url, tinyKey), HttpStatus.OK);
    }

    @DeleteMapping("/{tinyKey}")
    private ResponseEntity<Boolean> deleteUrl(@PathVariable String tinyKey) {
        return new ResponseEntity<>(urlService.deleteUrl(tinyKey), HttpStatus.NO_CONTENT);
    }
}
