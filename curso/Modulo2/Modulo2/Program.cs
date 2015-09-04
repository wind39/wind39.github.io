using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            System.IO.StreamWriter v_writer;

            v_writer = new System.IO.StreamWriter("teste.txt");

            v_writer.WriteLine("isso é um teste.");
            v_writer.WriteLine("hehe");

            v_writer.Close();
        }
    }
}
