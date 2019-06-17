using System;
using System.Collections.Generic;
using System.Text;

namespace minappServer.Repositories.Dtos
{
    public class BannerDto
    {
        public String Title { get; set; }
        public String Img { get; set; }
        public List<ProductDto> ProductDtos { get; set; }
    }
}
