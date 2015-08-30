using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            bool deu_problema;

            do
            {
                try
                {
                    Funcao();
                    deu_problema = false;
                }
                catch (System.FormatException)
                {
                    Console.WriteLine("Erro! Problema no Parse...");
                    deu_problema = true;
                }
                catch (System.DivideByZeroException)
                {
                    Console.WriteLine("Erro! Divisão por zero...");
                    deu_problema = true;
                }
                catch (NumeroNegativoException e)
                {
                    Console.WriteLine(e.Texto);
                    deu_problema = true;
                }
                catch (System.Exception e)
                {
                    Console.WriteLine("Erro! Aconteceu algum problema que eu não sei qual é...");
                    Console.WriteLine(e.GetType().ToString() + " - " + e.Message);
                    deu_problema = true;
                }
                finally
                {
                    Console.WriteLine("Entrei no finally!!");
                }
            }
            while (deu_problema);

            Console.WriteLine("O programa continuou.");

            Console.ReadKey();
        }

        public static void Funcao()
        {
            int a, b;

            Console.Write("Digite o valor de A: ");
            a = int.Parse(Console.ReadLine());

            Console.Write("Digite o valor de B: ");
            b = int.Parse(Console.ReadLine());

            if (b < 0)
                throw new NumeroNegativoException();

            Console.WriteLine("{0} / {1} = {2}", a, b, a / b);
        }

        public static int LeA()
        {
            int x = 0;
            bool digitou_errado;

            do
            {
                try
                {
                    Console.Write("Digite o valor de A: ");
                    x = int.Parse(Console.ReadLine());
                    digitou_errado = false;
                }
                catch (System.FormatException)
                {
                    Console.WriteLine("Erro! Número inteiro digitado incorretamente.");
                    digitou_errado = true;
                }
                catch (System.Exception)
                {
                    Console.WriteLine("Erro desconhecido!");
                    digitou_errado = true;
                }
            }
            while (digitou_errado);

            return x;
        }

        public static int LeB()
        {
            int y;

            Console.Write("Digite o valor de B: ");
            y = int.Parse(Console.ReadLine());

            if (y < 0)
                throw new NumeroNegativoException();

            return y;
        }
    }
}
