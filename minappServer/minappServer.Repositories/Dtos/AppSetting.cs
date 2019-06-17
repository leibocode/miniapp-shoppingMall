using System;
using System.Collections.Generic;
using System.Text;

namespace minappServer.Repositories.Dtos
{
    public class AppSetting
    {
        public string MongoConnectionString { get; set; }

        public string MinappDatabaseName { get; set; }
    }
}
