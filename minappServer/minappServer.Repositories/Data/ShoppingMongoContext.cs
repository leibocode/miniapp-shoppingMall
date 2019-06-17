using Microsoft.Extensions.Options;
using minappServer.Repositories.Dtos;
using minappServer.Repositories.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace minappServerD.Repositories.Data
{
	/// <summary>
    /// MongoDb上下文
    /// </summary>
    public class ShoppingMongoContext
    {
        private IMongoDatabase _database;
        private AppSetting _appSetting;
        
        public ShoppingMongoContext(IOptionsSnapshot<AppSetting> setting)
        {
            _appSetting = setting.Value;
            var client = new MongoClient(_appSetting.MongoConnectionString);
            if (client != null)
            {
                //_database = client.
            }

        }

        //检查所有的表是否创建
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

        public IMongoCollection<Banner> Banner
        {
            get
            {
                CheckAndCreateCollection("banner");
                return _database.GetCollection<Banner>("banner");
            }
        }

        public IMongoCollection<Category> Category
        {
            get {
                CheckAndCreateCollection("category");
                return _database.GetCollection<Category>("category");
            }
        }

        
    }
}
