using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Candidato
    {
        public int Id { get; set; }
        public string Digito { get; set; }
        public string NomeCompleto { get; set; }
        public string NomeVice { get; set; } = "";
        public DateTime DataRegistro { get; set; }
        public string Legenda { get; set; }
        public short TipoCandidato { get; set; }
        public bool Deleted { get; set; } = false;
        public virtual ICollection<Voto> VotosRecebidos { get; set; }

        public Candidato()
        {
            DataRegistro = DateTime.Now;
        }
    }
}