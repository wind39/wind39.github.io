using System;

namespace Modulo2
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            /*System.Collections.Generic.List<Aluno> cadastro;
            Aluno a;
            System.IO.BinaryReader r = null;
            int n;

            cadastro = new System.Collections.Generic.List<Aluno>();

            try
            {
                r = new System.IO.BinaryReader(new System.IO.FileStream("alunos.dat", System.IO.FileMode.Open));

                n = r.ReadInt32();
                for (int i = 0; i < n; i++)
                {
                    a = new Aluno();

                    a.nome = r.ReadString();
                    a.idade = r.ReadInt32();
                    a.nasc = DateTime.Parse(r.ReadString());
                    a.ultimanota = r.ReadDouble();

                    cadastro.Add(a);
                }

                for (int i = 0; i < cadastro.Count; i++)
                    Console.WriteLine("O aluno {0} tem {1} anos, nasceu no dia {2} e a nota da última prova foi {3}.", cadastro[i].nome, cadastro[i].idade, cadastro[i].nasc.ToString("d"), cadastro[i].ultimanota);
            }
            catch (System.Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            finally
            {
                if (r != null)
                    r.Close();
            }*/

            /*System.Collections.Generic.List<Aluno> cadastro;
            Aluno a;
            System.IO.BinaryWriter w = null;

            cadastro = new System.Collections.Generic.List<Aluno>();

            a = new Aluno(
                "William Ivanski",
                27,
                new DateTime(1988, 5, 8),
                9.2
            );
            cadastro.Add(a);

            a = new Aluno(
                "José Silva",
                34,
                new DateTime(1981, 7, 18),
                9.8
            );
            cadastro.Add(a);

            a = new Aluno(
                "Pedro Silva",
                21,
                new DateTime(1994, 9, 8),
                8.5
            );
            cadastro.Add(a);

            try
            {
                w = new System.IO.BinaryWriter(new System.IO.FileStream("alunos.dat", System.IO.FileMode.Create));

                w.Write(cadastro.Count);

                for (int i = 0; i < cadastro.Count; i++)
                {
                    w.Write(cadastro[i].nome);
                    w.Write(cadastro[i].idade);
                    w.Write(cadastro[i].nasc.ToString("d"));
                    w.Write(cadastro[i].ultimanota);
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
            }*/

            /*System.Collections.Generic.List<Aluno> cadastro;
            Aluno a;
            System.IO.StreamReader r = null;

            cadastro = new System.Collections.Generic.List<Aluno>();

            try
            {
                r = new System.IO.StreamReader("alunos.csv", System.Text.Encoding.GetEncoding("iso-8859-15"));

                r.ReadLine();
                while (! r.EndOfStream)
                {
                    a = new Aluno();
                    a.LeCSV(r.ReadLine());
                    cadastro.Add(a);
                }

                for (int i = 0; i < cadastro.Count; i++)
                    Console.WriteLine("O aluno {0} tem {1} anos, nasceu no dia {2} e a nota da última prova foi {3}.", cadastro[i].nome, cadastro[i].idade, cadastro[i].nasc.ToString("d"), cadastro[i].ultimanota);
            }
            catch (System.Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            finally
            {
                if (r != null)
                    r.Close();
            }*/

            /*System.Collections.Generic.List<Aluno> cadastro;
            Aluno a;
            System.IO.StreamWriter w = null;

            cadastro = new System.Collections.Generic.List<Aluno>();

            a = new Aluno(
                "William Ivanski",
                27,
                new DateTime(1988, 5, 8),
                9.2
            );
            cadastro.Add(a);

            a = new Aluno(
                "José Silva",
                34,
                new DateTime(1981, 7, 18),
                9.8
            );
            cadastro.Add(a);

            a = new Aluno(
                "Pedro Silva",
                21,
                new DateTime(1994, 9, 8),
                8.5
            );
            cadastro.Add(a);

            try
            {
                w = new System.IO.StreamWriter("alunos.csv", false, System.Text.Encoding.GetEncoding("iso-8859-15"));

                w.WriteLine("NOME;IDADE;DATA DE NASCIMENTO;ÚLTIMA NOTA");
                for (int i = 0; i < cadastro.Count; i++)
                    w.WriteLine(cadastro[i].EscreveCSV());
            }
            catch (System.Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            finally
            {
                if (w != null)
                    w.Close();
            }*/

            System.IO.FileInfo info;

            System.IO.Directory.GetLogicalDrives();

            foreach (string f in System.IO.Directory.GetFiles("/home/william/Projects/Repositories/wind39.github.io/curso/Modulo2/Modulo2/bin/Debug/"))
            {
                info = new System.IO.FileInfo(f);

                Console.WriteLine(info.Extension);
                Console.WriteLine(info.Name);
                Console.WriteLine(info.FullName);
                Console.WriteLine(info.Length);
                Console.WriteLine(info.CreationTime);
                Console.WriteLine(info.LastAccessTime);
                Console.WriteLine(info.LastWriteTime);
                Console.WriteLine(info.DirectoryName);
                Console.WriteLine();
            }

            Console.ReadKey();
        }
    }
}
