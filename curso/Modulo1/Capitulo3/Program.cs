using System;

namespace Capitulo3
{
    public enum Genero
    {
        MASCULINO,
        FEMININO,
        NAO_INFORMADO,
        INDEFINIDO,
        HERMAFRODITA
    }

    class MainClass
    {
        public static void Main(string[] args)
        {
            Genero g;

            g = Genero.INDEFINIDO;

            if (g == Genero.MASCULINO)
                Console.WriteLine("Boa tarde, como vai o senhor?"); // tratamento para masculino
            else
                if (g == Genero.FEMININO)
                    Console.WriteLine("Boa tarde, como vai a senhora?"); // tratamento para feminino
                else
                    Console.WriteLine("Boa tarde, como vai você?"); // tratamento para gênero não informado

            switch (g)
            {
                case Genero.MASCULINO:
                    Console.WriteLine("Boa tarde, como vai o senhor?");
                    break;
                case Genero.FEMININO:
                    Console.WriteLine("Boa tarde, como vai a senhora?");
                    Console.WriteLine("A senhora precisa de alguma coisa?");
                    break;
                default:
                    Console.WriteLine("Boa tarde, como vai você?");
                    break;
            }

            Console.ReadKey();
        }
    }
}
