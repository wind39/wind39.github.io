using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            char c;
            int n;

            Console.Write("Digite um número: ");
            n = int.Parse(Console.ReadLine());

            c = (char) n;

            Console.WriteLine("O número {0} representa o caractere {1}.", n, c);

            Console.ReadKey();
        }
    }
}
