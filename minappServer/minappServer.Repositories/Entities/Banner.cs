using System;
using System.Collections.Generic;
using System.Text;

namespace minappServer.Repositories.Entities
{
    public class Banner
    {
        public Banner()
        {
            products = new List<string>();
        }
        public string Title { get; set; }
        public string Img { get; set; }
        public List<String> products { get; set; }
    }
}
