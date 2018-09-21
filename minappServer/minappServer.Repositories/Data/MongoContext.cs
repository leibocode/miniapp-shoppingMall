using MongoDB.Driver;
using System;

namespace minappServerD.Repositories.Data
{
	/// <summary>
    /// MongoDb上下文
    /// </summary>
    public class MongoContext
    {
        public IMongoClient _database;

        public MongoContext()
        {
            var client = new MongoClient()
        }

        private void CheckAndCreateCollection(string collectionName)
        {
           
        }

    }
}
