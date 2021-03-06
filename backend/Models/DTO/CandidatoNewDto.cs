using Microsoft.AspNetCore.Http;

namespace backend.Models.DTO
{
    public class CandidatoNewDto
    {
        public string Digito { get; set; }
        public string NomeCompleto { get; set; }
        public string NomeVice { get; set; }
        public string Legenda { get; set; }
        public IFormFile FotoCandidato { get; set; }
        public IFormFile FotoVice { get; set; }
        public short TipoCandidato { get; set; }
    }
}