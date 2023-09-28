package com.api.DesafioEmpresacontrol.controllers;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;
import java.util.*;

import com.api.DesafioEmpresacontrol.models.UploadArquivos;
import com.api.DesafioEmpresacontrol.models.Usuario;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;


public class CSVHelper {

    public static String TYPE = "text/csv";
    static String[] HEADERs = { "Nome", "UltimoNome", "Email", "Sexo", "IpAcesso", "Idade", "Nascimento" };

    public static boolean hasCSVFormat(MultipartFile file) {
        System.out.println(file.getContentType());
        if (TYPE.equals(file.getContentType())
                || file.getContentType().equals("application/vnd.ms-excel")) {
            return true;
        }
        return false;
    }

    public static List<UploadArquivos> csvToTutorials(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));

             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
            List<UploadArquivos> uploadArquivoslList = new ArrayList<>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord csvRecord : csvRecords) {
                Map<String, String> csvMap = csvRecord.toMap();
                        UploadArquivos
                        uploadArquivos
                        = new UploadArquivos(
                                csvMap.get("Nome"),
                                csvMap.get("UltimoNome"),
                                csvMap.get("Email"),
                                csvMap.get("Sexo"),
                                csvMap.get("IpAcesso"),
                                csvMap.get("Idade"),
                                csvMap.get("Nascimento")
                );
                uploadArquivoslList.add(uploadArquivos);
            }
            return uploadArquivoslList;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static ByteArrayInputStream tutorialsToCSV(List<UploadArquivos> uploadArquivosList) {
        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            for (UploadArquivos uploadArquivos : uploadArquivosList) {
                List<String> data = Arrays.asList(
                        uploadArquivos.getNome(),
                        uploadArquivos.getUltimoNome(),
                        uploadArquivos.getEmail(),
                        uploadArquivos.getSexo(),
                        uploadArquivos.getIpAcesso(),
                        uploadArquivos.getIdade(),
                        uploadArquivos.getNascimento()
                );

                csvPrinter.printRecord(data);
            }

            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
        }
    }
}