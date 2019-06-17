using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace minappServer.Repositories.IRepositories
{
    public interface BaseRepository<T> where T:class,new()
    {
        Task<List<T>> GetList();

        Task<bool> AddT(T t, CancellationToken cancellationToken);

        Task<bool> DelT(string objectId);

        Task<bool> UpdateT(T t, CancellationToken cancellationToken);

        Task<bool> ExistBanner(string objectId);

    }
}
