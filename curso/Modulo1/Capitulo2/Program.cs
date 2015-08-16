using System;

namespace Capitulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            string usuario;

            Console.WriteLine("Qual é o seu nome?");
            usuario = Console.ReadLine();

            Console.Write("Seu nome é ");
            Console.WriteLine(usuario);

            Console.ReadKey();
        }
    }
}
