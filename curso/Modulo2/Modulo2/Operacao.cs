using System;

namespace Modulo2
{
    public class Operacao
    {
        public char tipo;
        public int numeroconta;
        public double valor;

        public Operacao()
        {
        }

        public Operacao(char p_tipo, int p_numeroconta, double p_valor)
        {
            this.tipo = p_tipo;
            this.numeroconta = p_numeroconta;
            this.valor = p_valor;
        }
    }
}

