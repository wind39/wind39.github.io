using System;

namespace Modulo1
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            //Identificação do exercício.
            Console.WriteLine ("Exercício 4.20v2");
            Console.WriteLine ("Dado um número natural na base binária, transformá-lo para a base decimal.");
            Console.WriteLine ("Pressione ENTER para começar.");
            Console.ReadKey ();

            /*Variáveis.
                        k - número binário dado pelo usuário;
                        a - número que sobra cada vez que o binário dado tem removido de si a casa das unidades;
                        b - é a o número da casa das unidades, a ser removido da equação por "a";
                        x - é o valor atribuído a "b" a cada remoção do binário;
                        n - é o "n" do 2 elevado a "n", respectivo à casa do binário que está sendo calculada;
                        i - é a contagem de casas dentro do binário.
                        soma -
                        */
            int k, a, b, x, n, i, soma;

            /*Variáveis para interromper o processo.
                        achou - momento em que sobra apenas a maior casa do binário;
                        prox - entra no início do próximo laço de repetição, para garantir que o laço será executada uma última vez para aquela maior casa do binário.
                        */
            bool achou, prox;

            //Solicita ao usuário o número binário.
            Console.WriteLine ();
            Console.WriteLine ("Digite um número binário (apenas 1 ou 0).");
            k = int.Parse (Console.ReadLine ());

            //Declarações iniciais.
            a = k;
            soma = 0;
            x = 1;
            achou = false;
            prox = false;

            a = k;
            soma = 0;
            x = 1;
            while (a > 0)
            {
                b = a % 10;
                soma += b * x;

                a /= 10;
                x *= 2;
            }

            //Processo que calcula o binário.
            /*for (i = 1; !prox; i++) {
                if (achou) {
                    prox = true;
                }
                b = a % 10;
                a = a / 10;
                soma += (b * x);
                x = 1;
                for (n = 1; (n <= i); n++) {
                    x *= 2;
                }
                if (a == 1) {
                    achou = true;
                }
            }*/

            //Resposta.
            Console.WriteLine("{0} = {1}", k, soma);

            //Finalização do exercício.
            Console.WriteLine ();
            Console.WriteLine ("Tecle ENTER para sair.");
            Console.ReadKey ();
        }
    }
}
