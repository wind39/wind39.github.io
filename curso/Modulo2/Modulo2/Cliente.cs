using System;

namespace Modulo2
{
    public class Cliente
    {
        public string nome;
        public int numeroconta;
        public double saldo;

        public Cliente()
        {
        }

        public Cliente(string p_nome, int p_numeroconta, double p_saldo)
        {
            this.nome = p_nome;
            this.numeroconta = p_numeroconta;
            this.saldo = p_saldo;
        }
    }
}

