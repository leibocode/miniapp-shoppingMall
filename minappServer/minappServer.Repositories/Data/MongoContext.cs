using Microsoft.Extensions.Options;
using minappServer.Repositories.Dtos;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace minappServerD.Repositories.Data
{
	/// <summary>
    /// MongoDb上下文
    /// </summary>
    public class MongoContext
    {
        private IMongoDatabase _database;
        private AppSetting _appSetting;
        
        public MongoContext(IOptionsSnapshot<AppSetting> setting)
        {
            _appSetting = setting.Value;
            var client = new MongoClient(_appSetting.MongoConnectionString);
            if (client != null)
            {
                //_database = client.
            }

        }

        private void CheckAndCreateCollection(string collectionName)
        {
            var collectionList = _database.ListCollections().ToList();
            var collectionNames = new List<String>();
            //获取所有表的名称
            collectionList.ForEach(b =>
            {
                collectionNames.Add(b["name"].AsString);
            });
            if (!collectionNames.Contains(collectionName))
            {
                _database.CreateCollection(collectionName);
            }
        }

        public IMongoCollection<>

    }
}
