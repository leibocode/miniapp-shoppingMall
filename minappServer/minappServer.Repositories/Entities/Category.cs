using System;
using System.Collections.Generic;
using System.Text;

namespace minappServer.Repositories.Entities
{
    public class Category
    {
        public Category()
        {
            Children = new List<string>();
        }
        public string Name { get; set; }

        public List<string> Children { get; set; }
        public string image { get; set; }

    }
}
