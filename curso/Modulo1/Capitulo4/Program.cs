using System;

namespace Capitulo4
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            //int x;
            int n;

            Console.Write("Digite o valor de N: ");
            n = int.Parse(Console.ReadLine());

            /*x = 1; // inicialização
            do
            {
                Console.WriteLine("Dentro do laço, x = {0}", x); // código
                x = x + 1; // incremento
            }
            while (x <= n); // condição de parada*/

            /*x = 1; // inicialização
            while (x <= n) // condição de parada
            {
                Console.WriteLine("Dentro do laço, x = {0}", x); // código
                x = x + 1; // incremento
            }*/

            for (int x = 1; x <= n; x++)
                Console.WriteLine("Dentro do laço, x = {0}", x);

            //Console.WriteLine("Acabou o laço, x = {0}", x);

            Console.ReadKey();
        }
    }
}
