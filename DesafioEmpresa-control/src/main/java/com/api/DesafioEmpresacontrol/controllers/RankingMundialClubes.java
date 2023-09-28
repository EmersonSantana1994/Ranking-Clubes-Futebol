package com.api.DesafioEmpresacontrol.controllers;

import com.api.DesafioEmpresacontrol.models.RankingClubes;
import com.api.DesafioEmpresacontrol.repositores.RankingClubesRepository;
import com.api.DesafioEmpresacontrol.services.CSVService;
import com.api.DesafioEmpresacontrol.services.RankingClubesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequestMapping("/ranking")
public class RankingMundialClubes {

    @Autowired
    CSVService fileService;

    @Autowired
    RankingClubesRepository rankingRepository;

    @Autowired
    RankingClubesService rankingService;


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/encontrar/nome")
    public ResponseEntity<List<RankingClubes>> findAllByTitulo(@RequestBody RankingClubes ranking){
        System.out.println("eemmmmmmmmmm"+ranking.getNome());
        return ResponseEntity.ok(rankingRepository
                .findAllByNomeContainingIgnoreCase(ranking.getNome()));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<RankingClubes>> findAll(){
        return ResponseEntity.ok(rankingRepository
                .findByOrderByPontosDesc());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/inserir")
    public RankingClubes inserirPontos(@RequestBody RankingClubes ranking){
        return rankingRepository.save(ranking);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/atualiza")
    public RankingClubes atualizaPontos(@RequestBody RankingClubes ranking){
        return rankingRepository.save(ranking);

    }

}
