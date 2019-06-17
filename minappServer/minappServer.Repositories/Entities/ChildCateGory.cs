using System;
using System.Collections.Generic;
using System.Text;

namespace minappServer.Repositories.Entities
{
    public class ChildCateGory
    {
        public ChildCateGory()
        {
            Products = new List<string>();
        }

        public string Name { get; set; }
        public List<string> Products { get; set; }
        public string Img { get; set; }

    }
}
