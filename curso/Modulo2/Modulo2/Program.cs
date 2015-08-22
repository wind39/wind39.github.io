using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            DateTime d1, d2;
            TimeSpan t;

            d2 = DateTime.Now;
            Console.WriteLine("Data/Hora atual: {0}", d2);

            Console.Write("Qual a sua data de nascimento? ");
            d1 = DateTime.Parse(Console.ReadLine());

            t = d2 - d1;
            Console.WriteLine("Você tem {0} anos.", t.Days / 365);
            Console.WriteLine("Ou, mais especificamente, você tem {0} anos.", t.TotalDays / 365);

            Console.ReadKey();
        }
    }
}
