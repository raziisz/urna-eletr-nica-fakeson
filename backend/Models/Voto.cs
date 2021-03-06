using System;

namespace backend.Models
{
    public class Voto
    {
        public int Id { get; set; }
        public DateTime DataVotacao { get; set; }
        public string CodigoVotacaoCidadao { get; set; }
        public short Type { get; set; }
        public bool IsNulo { get; set; } = false;
        public int? CandidatoId { get; set; }
        public virtual Candidato Candidato { get; set; }
        public bool Deleted { get; set; } = false;
        public Voto()
        {
            DataVotacao = DateTime.Now;
        }
    }
}