using System;

namespace Modulo1
{
    class MainClass
    {
        public static void Main(string[] args)
        {
			/*int[] vetor;
			int n;
			int esq, dir, meio;
			bool achou = true;

			vetor = new int[10];

			vetor[0] = 50;
			vetor[1] = 150;
			vetor[2] = 250;
			vetor[3] = 350;
			vetor[4] = 450;
			vetor[5] = 550;
			vetor[6] = 650;
			vetor[7] = 750;
			vetor[8] = 850;
			vetor[9] = 950;

			Console.Write ("Qual valor você deseja buscar? ");
			n = int.Parse (Console.ReadLine());

			achou = false;
			meio = -1;

			if (n >= vetor [0] && n <= vetor [vetor.Length - 1])
			{
				esq = 0;
				dir = vetor.Length - 1;
				meio = esq + ((dir - esq) / 2);

				while (esq <= dir && !achou)
				{
					if (n == vetor [meio])
						achou = true;
					else
					{
						if (n > vetor [meio])
							esq = meio + 1;
						else
							dir = meio - 1;

						meio = esq + ((dir - esq) / 2);
					}
				}
			}

			if (achou)
				Console.WriteLine ("Valor {0} encontrado na posição {1}.", n, meio);
			else
				Console.WriteLine ("Valor {0} não foi encontrado.", n);
			*/

			int[] vetor;
			int[] tmp;
			int n;
			int i, k;

			vetor = new int[10];

			vetor[0] = 50;
			vetor[1] = 150;
			vetor[2] = 250;
			vetor[3] = 350;
			vetor[4] = 450;
			vetor[5] = 550;
			vetor[6] = 650;
			vetor[7] = 750;
			vetor[8] = 850;
			vetor[9] = 950;

			Console.Write ("Qual valor você deseja inserir? ");
			n = int.Parse (Console.ReadLine());

			// copie o vetor original para um vetor temporário
			tmp = new int[vetor.Length];
			for (i = 0; i < vetor.Length; i++)
				tmp [i] = vetor [i];

			// realoque o vetor original com uma posição a mais
			vetor = new int[vetor.Length + 1];

			// copiando até chegar numa posição >= ao valor que estamos querendo inserir
			k = 0;
			while (k < tmp.Length && tmp [k] < n)
			{
				vetor [k] = tmp [k];
				k++;
			}

			// inserindo o valor na posição correta
			vetor [k] = n;

			// copiando o restante do vetor
			for (i = k; i < tmp.Length; i++)
				vetor [i + 1] = tmp [i];

			// imprimindo vetor inteiro
			for (i = 0; i < vetor.Length; i++)
				Console.WriteLine (vetor[i]);

            Console.ReadKey();
        }
    }
}
