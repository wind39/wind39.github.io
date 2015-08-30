using System;

namespace Modulo2
{
    public class NumeroNegativoException : System.Exception
    {
        public DateTime DataHora;
        public string Mensagem;
        public string Texto;

        public NumeroNegativoException()
        {
            this.DataHora = DateTime.Now;
            this.Mensagem = "Mensagem padrão para exceção de número negativo.";

            this.Texto = string.Format("[{0}] {1}", this.DataHora, this.Mensagem);
        }
    }
}

