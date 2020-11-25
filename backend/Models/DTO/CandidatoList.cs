using System;

namespace backend.Models.DTO
{
    public class CandidatoList
    {
        public int Id { get; set; }
        public string Digito { get; set; }
        public string NomeCompleto { get; set; }
        public string NomeVice { get; set; }
        public DateTime DataRegistro { get; set; }
        public string UrlFotoCandidato { get; set; }
        public string UrlFotoVice { get; set; }
        public string Legenda { get; set; }
        public short TipoCandidato { get; set; }
    }
}