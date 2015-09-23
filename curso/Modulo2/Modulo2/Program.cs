using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            System.Collections.Generic.List<Cliente> clientes;
            System.Collections.Generic.List<Operacao> operacoes;
            System.IO.BinaryWriter w = null;

            clientes = new System.Collections.Generic.List<Cliente>();
            clientes.Add(new Cliente("Mickey", 1000, 53210.95));
            clientes.Add(new Cliente("Pateta", 1001, 14500.3));
            clientes.Add(new Cliente("Pato Donald", 1002, 16732.0));
            clientes.Add(new Cliente("Minnie", 1003, 12504.1));
            clientes.Add(new Cliente("Pluto", 1004, 7450.0));
            clientes.Add(new Cliente("Margarida", 1005, 5698.5));
            clientes.Add(new Cliente("Tio Patinhas", 1006, 2890835.01));
            clientes.Add(new Cliente("Professor Pardal", 1007, 49680.2));
            clientes.Add(new Cliente("Simba", 1008, 10990.7));
            clientes.Add(new Cliente("Alladin", 1009, 88340.8));

            try
            {
                w = new System.IO.BinaryWriter(new System.IO.FileStream("clientes.dat", System.IO.FileMode.Create));

                w.Write(clientes.Count);

                for (int i = 0; i < clientes.Count; i++)
                {
                    w.Write(clientes[i].nome);
                    w.Write(clientes[i].numeroconta);
                    w.Write(clientes[i].saldo);
                }
            }
            catch (System.Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            finally
            {
                if (w != null)
                    w.Close();
            }

            operacoes = new System.Collections.Generic.List<Operacao>();
            operacoes.Add(new Operacao('D', 1000, 5000));
            operacoes.Add(new Operacao('C', 1003, 5000));
            operacoes.Add(new Operacao('D', 1000, 3000));
            operacoes.Add(new Operacao('C', 1004, 3000));
            operacoes.Add(new Operacao('D', 1001, 350));
            operacoes.Add(new Operacao('D', 1001, 635));
            operacoes.Add(new Operacao('D', 1001, 100));
            operacoes.Add(new Operacao('D', 1002, 7500));
            operacoes.Add(new Operacao('C', 1005, 7500));
            operacoes.Add(new Operacao('D', 1005, 1200));
            operacoes.Add(new Operacao('D', 1006, 90000));
            operacoes.Add(new Operacao('C', 1000, 10000));
            operacoes.Add(new Operacao('C', 1001, 10000));
            operacoes.Add(new Operacao('C', 1002, 10000));
            operacoes.Add(new Operacao('C', 1003, 10000));
            operacoes.Add(new Operacao('C', 1004, 10000));
            operacoes.Add(new Operacao('C', 1005, 10000));
            operacoes.Add(new Operacao('C', 1007, 10000));
            operacoes.Add(new Operacao('C', 1008, 10000));
            operacoes.Add(new Operacao('C', 1009, 10000));
            operacoes.Add(new Operacao('D', 1007, 2350));

            try
            {
                w = new System.IO.BinaryWriter(new System.IO.FileStream("operacoes.dat", System.IO.FileMode.Create));

                w.Write(operacoes.Count);

                for (int i = 0; i < operacoes.Count; i++)
                {
                    w.Write(operacoes[i].tipo);
                    w.Write(operacoes[i].numeroconta);
                    w.Write(operacoes[i].valor);
                }
            }
            catch (System.Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            finally
            {
                if (w != null)
                    w.Close();
            }

            Console.ReadKey();
        }
    }
}
