package com.api.DesafioEmpresacontrol.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.api.DesafioEmpresacontrol.controllers.CSVHelper;
import com.api.DesafioEmpresacontrol.models.UploadArquivos;
import com.api.DesafioEmpresacontrol.repositores.UploadArquivosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CSVService {
    @Autowired
    UploadArquivosRepository repository;

    public void save(MultipartFile file) {
        try {
            List<UploadArquivos> tutorials = CSVHelper.csvToTutorials(file.getInputStream());
            repository.saveAll(tutorials);
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public ByteArrayInputStream load() {
        List<UploadArquivos> tutorials = repository.findAll();

        ByteArrayInputStream in = CSVHelper.tutorialsToCSV(tutorials);
        return in;
    }

    public List<UploadArquivos> getAllTutorials() {
        return repository.findByOrderByNome();
    }
}