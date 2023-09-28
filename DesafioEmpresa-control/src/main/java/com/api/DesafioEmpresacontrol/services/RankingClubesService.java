package com.api.DesafioEmpresacontrol.services;

import com.api.DesafioEmpresacontrol.models.RankingClubes;
import com.api.DesafioEmpresacontrol.models.UploadArquivos;
import com.api.DesafioEmpresacontrol.models.Usuario;
import com.api.DesafioEmpresacontrol.repositores.RankingClubesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RankingClubesService {

    @Autowired
    static RankingClubesRepository rankingRepository;


    public static List<RankingClubes> getAllTutorials() {
        System.out.println(("manoooooooooo 2222222"));
        return rankingRepository.findByOrderByPontosDesc();
    }

    public RankingClubes atualizarUsuario(Long id, Integer valor) {
        RankingClubes rankingClubes = (RankingClubes) rankingRepository.findById(id);
        rankingClubes.setPontos(valor);
        return rankingRepository.save(rankingClubes);
    }
}
