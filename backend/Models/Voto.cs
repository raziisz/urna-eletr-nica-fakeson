using System;

namespace backend.Models
{
    public class Voto
    {
        public int Id { get; set; }
        public DateTime DataVotacao { get; set; }
        public string CodigoVotacaoCidadao { get; set; }
        public int IdCandidato { get; set; }
        public Candidato Candidato { get; set; }
        public bool Deleted { get; set; } = false;
        public Voto()
        {
            DataVotacao = DateTime.Now;
        }
    }
}