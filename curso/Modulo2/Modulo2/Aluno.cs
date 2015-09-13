using System;

namespace Modulo2
{
    public class Aluno
    {
        public string nome;
        public int idade;
        public DateTime nasc;
        public double ultimanota;

        public Aluno()
        {
        }

        public Aluno(string p_nome, int p_idade, DateTime p_nasc, double p_ultimanota)
        {
            this.nome = p_nome;
            this.idade = p_idade;
            this.nasc = p_nasc;
            this.ultimanota = p_ultimanota;
        }

        public string EscreveCSV()
        {
            string ret;

            ret = this.nome + ";";
            ret += this.idade.ToString() + ";";
            ret += this.nasc.ToString("d") + ";";
            ret += this.ultimanota.ToString();

            return ret;
        }

        public void LeCSV(string linha)
        {
            string[] vetor;

            vetor = linha.Split(';');

            this.nome = vetor[0];
            this.idade = int.Parse(vetor[1]);
            this.nasc = DateTime.Parse(vetor[2]);
            this.ultimanota = double.Parse(vetor[3]);
        }
    }
}

