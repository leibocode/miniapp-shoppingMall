using Microsoft.Extensions.Logging;
using minappServer.Repositories.Entities;
using minappServer.Repositories.IRepository;
using minappServerD.Repositories.Data;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace minappServer.Repositories.Repositories
{
    public class BannerRepository : IBannerRepository
    {
        private readonly ShoppingMongoContext _context;
        private readonly ILogger<ShoppingMongoContext> _logger;

        public BannerRepository(ShoppingMongoContext context,ILogger<ShoppingMongoContext> logger)
        {
            _context = context;
            _logger = logger;
        }

        public Task<bool> AddT(Banner t, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DelT(string objectId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistBanner(string objectId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Banner>> GetList()
        {
            var result = await _context.Banner.FindAsync(x=>x.Title.Contains(""));
            return result.ToList();
        }

        public Task<bool> UpdateT(Banner t, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
